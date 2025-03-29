import axios from "axios";
import React, { useContext, useMemo, useCallback } from "react";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { AppContext } from "../../store/AppContext";
import CartNavigator from "../../components/CartNavigator";
import RecommendedProducts from "../../components/RecommendedProducts";
import { formatNumberWithCommas } from "../../utils/helpers";
import ButtonWithLoading from "../../components/ButtonWithLoading";

const Cart = () => {
  const { cartData, getCart } = useOutletContext();
  const [couponCode, setCouponCode] = useState("");
  const [couponInf, setCouponInf] = useState({});
  const [loadingItems, setLoadingItem] = useState([]);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [isRemovingItem, setIsRemovingItem] = useState(null);

  const {
    selectedDate,
    adultQuantity,
    childrenQuantity,
    setSelectedDate,
    setAdultQuantity,
    setChildrenQuantity,
    setFinalTotal,
    setFinalCouponTotal,
  } = useContext(AppContext);

  const removeCartItem = async (id) => {
    // 設置正在移除的項目 ID
    setIsRemovingItem(id);

    localStorage.removeItem("selectedDateStorage");
    localStorage.removeItem("adultQuantityStorage");
    localStorage.removeItem("childrenQuantityStorage");
    localStorage.removeItem("finalTotalStorage");
    localStorage.removeItem("finalCouponTotalStorage");
    localStorage.removeItem("couponInfStorage");
    setAdultQuantity(0);
    setChildrenQuantity(0);
    setSelectedDate(null);
    try {
      const _res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      getCart();
    } catch (error) {
      console.error("刪除購物車產品失敗:", error);
    } finally {
      // 無論成功或失敗，都清除正在移除的項目 ID
      setIsRemovingItem(null);
    }
  };

  // 更新人數
  const updateCartItem = async (item, adult, child) => {
    localStorage.setItem("adultQuantityStorage", adult);
    localStorage.setItem("childrenQuantityStorage", child);
    setAdultQuantity(adult);
    setChildrenQuantity(child);
    const data = {
      data: {
        product_id: item.product_id,
        qty: adult + child,
      },
    };
    setLoadingItem([...loadingItems, item.id]);
    try {
      const _res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
        data
      );

      setLoadingItem(
        loadingItems.filter((loadingObject) => {
          return loadingObject !== item.id;
        })
      );
      getCart();
    } catch (error) {
      console.error("更新購物車產品失敗:", error);
    }
  };

  //計算價格
  const countPrice = useCallback(
    (item) => {
      const total =
        item.total -
        (item.total -
          ((item.total / item.qty) * adultQuantity +
            (item.total / item.qty) * childrenQuantity * 0.8));

      const couponTotal =
        (item.total -
          (item.total -
            ((item.total / item.qty) * adultQuantity +
              (item.total / item.qty) * childrenQuantity * 0.8))) *
        (item.final_total / item.total);

      return { total, couponTotal };
    },
    [adultQuantity, childrenQuantity]
  );

  const { total, couponTotal } = useMemo(() => {
    if (cartData?.carts?.length > 0) {
      return countPrice(cartData.carts[0]);
    }
    return { total: 0, couponTotal: 0 };
  }, [cartData, countPrice]);

  //套用優惠券
  const addCoupon = async (code) => {
    // 設置 loading 狀態為 true
    setIsCouponLoading(true);

    const coupon = {
      data: {
        code,
      },
    };

    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
        coupon
      );
      localStorage.setItem("couponInfStorage", JSON.stringify(res.data));
      setCouponInf(res.data);
      getCart();
    } catch (error) {
      console.log(error);
      localStorage.removeItem("couponInfStorage");
      setCouponInf(error.response.data);
    } finally {
      // 無論成功或失敗，都將 loading 狀態設為 false
      setIsCouponLoading(false);
    }
  };

  const submit = () => {
    localStorage.setItem("finalTotalStorage", total.toString());
    localStorage.setItem("finalCouponTotalStorage", couponTotal.toString());
    setFinalTotal(total);
    setFinalCouponTotal(couponTotal);
  };

  return (
    <>
      <div className="container py-5 mt-5">
        <CartNavigator currentStep={1} nextStep={2} />
        <div className="row justify-content-center pb-6">
          <div className="col-md-8 bg-white full-height cart">
            {cartData?.carts?.length === 0 ? (
              <>
                <div className="alert alert-secondary text-center py-6 cart__section">
                  <p>
                    <i className="fa-solid fa-plane cart__section__icon mb-3"></i>
                  </p>
                  <p className=" fs-2">還沒有選擇行程呦</p>
                </div>
                <div>
                  <Link
                    to="/area-japan/kanto"
                    className="booking-btn w-100 mt-4 rounded-0 py-3 d-block text-center"
                  >
                    選擇行程
                  </Link>
                </div>
              </>
            ) : (
              <>
                {cartData?.carts?.map((item) => {
                  return (
                    <div className="  bg-light" key={item.id}>
                      <div className="mb-4">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="object-cover img-fluid"
                        />
                      </div>
                      <div className="w-100 p-3 position-relative">
                        <ButtonWithLoading
                          type="button"
                          className="position-absolute cart-remove-btn"
                          onClick={() => removeCartItem(item.id)}
                          isLoading={isRemovingItem === item.id}
                          loadingText=""
                          isIconButton={true}
                        >
                          <i className="bi bi-x-lg"></i>
                        </ButtonWithLoading>
                        <div className="product-header mb-4">
                          <span className="product-tag">日本行程</span>
                          <h4 className="mb-3 fw-bold ">
                            {item.product.title}
                          </h4>
                        </div>
                        <div className="mt-2 mb-3">
                          <p>
                            <span className="fw-bold">出發日期 : </span>
                            <span className="date-value">{selectedDate}</span>
                          </p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center w-100 mb-3 ">
                          {/* 大人select */}
                          <div className="input-group w-25 align-items-center me-3">
                            <span className="fw-bold">大人</span>
                            <select
                              name=""
                              className="form-select ms-2"
                              id=""
                              value={adultQuantity}
                              disabled={loadingItems.includes(item.id)}
                              onChange={(e) => {
                                updateCartItem(
                                  item,
                                  e.target.value * 1,
                                  childrenQuantity
                                );
                              }}
                            >
                              {[...new Array(16)].map((i, num) => {
                                return (
                                  <option value={num} key={num}>
                                    {num}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          {/* 小孩select */}
                          <div className="input-group w-25 align-items-center">
                            <span className="fw-bold">小孩</span>
                            <select
                              name=""
                              className="form-select ms-2"
                              id=""
                              value={childrenQuantity}
                              disabled={loadingItems.includes(item.id)}
                              onChange={(e) => {
                                updateCartItem(
                                  item,
                                  adultQuantity,
                                  e.target.value * 1
                                );
                              }}
                            >
                              {[...new Array(16)].map((i, num) => {
                                return (
                                  <option value={num} key={num}>
                                    {num}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="row justify-content-between mt-5">
                          <div className="col-12 col-lg-6 col-md-12 mb-3">
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="請輸入優惠碼"
                                aria-label="優惠碼輸入"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                disabled={
                                  adultQuantity === 0 && childrenQuantity === 0
                                }
                              />
                              <ButtonWithLoading
                                className="btn btn-secondary"
                                type="button"
                                onClick={() => addCoupon(couponCode)}
                                isLoading={isCouponLoading}
                                disabled={
                                  (adultQuantity === 0 &&
                                    childrenQuantity === 0) ||
                                  !couponCode.trim()
                                }
                                loadingText="處理中..."
                              >
                                使用優惠碼
                              </ButtonWithLoading>
                            </div>
                            <div className="mt-2">
                              {localStorage.getItem("couponInfStorage") ? (
                                <p className="coupon-success">
                                  <i className="bi bi-check-circle-fill me-2"></i>
                                  {
                                    JSON.parse(
                                      localStorage.getItem("couponInfStorage")
                                    ).message
                                  }
                                </p>
                              ) : (
                                (couponInf.message ||
                                  (!couponCode.trim() &&
                                    couponCode !== "")) && (
                                  <p className="coupon-error">
                                    <i className="bi bi-exclamation-circle-fill me-2"></i>
                                    {couponInf.message || "請輸入優惠碼"}
                                  </p>
                                )
                              )}
                            </div>
                          </div>
                          <div className="col-12 col-lg-5 col-md-12 mt-3 mt-lg-5">
                            <div className="text-end">
                              <p
                                className={`mb-0 h5 fw-bold ${
                                  localStorage.getItem("couponInfStorage")
                                    ? "text-decoration-line-through"
                                    : ""
                                }`}
                              >
                                總金額 :
                                {adultQuantity + childrenQuantity > 0
                                  ? ` NT$${formatNumberWithCommas(total)}`
                                  : ""}
                              </p>
                              {localStorage.getItem("couponInfStorage") && (
                                <p className="mb-0 h5 fw-bold text-danger mt-2">
                                  優惠總金額:
                                  {adultQuantity + childrenQuantity > 0
                                    ? `NT$${formatNumberWithCommas(
                                        Math.round(couponTotal)
                                      )}`
                                    : ""}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {(adultQuantity === 0 && childrenQuantity === 0) ||
                selectedDate === null ? (
                  <button
                    className="booking-btn w-100 mt-4 rounded-0 py-3"
                    disabled
                  >
                    請選擇人數
                  </button>
                ) : (
                  <Link
                    to="/checkout"
                    className="booking-btn w-100 mt-4 rounded-0 py-3 d-block text-center"
                    onClick={submit}
                  >
                    填寫資料
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {cartData?.carts?.length !== 0 ? (
        ""
      ) : (
        <div className="bg-light py-5">
          <div className="container-fluid  index-list-section">
            <div className="mb-5 ">
              <p className="text-center fs-3">推薦行程</p>
            </div>
            <RecommendedProducts></RecommendedProducts>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
