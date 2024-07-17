import axios from "axios";
import React, { useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { AppContext } from "../../store/AppContext";
import CartNavigator from "../../components/CartNavigator";
import RecommendedProducts from "../../components/RecommendedProducts";

const Cart = () => {
  const { cartData, getCart } = useOutletContext();
  const [couponCode, setCouponCode] = useState("");
  const [couponInf, setCouponInf] = useState({});
  const [loadingItems, setLoadingItem] = useState([]);

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
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      getCart();
    } catch (error) {
      console.log(error);
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
      const res = await axios.put(
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
      console.log(error);
    }
  };

  //計算價格
  const countPrice = (item) => {
    console.log("countPrice called 2");
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
  };

  const { total, couponTotal } = useMemo(() => {
    console.log("useMemo calculated 1");
    if (cartData?.carts?.length > 0) {
      return countPrice(cartData.carts[0]);
    }
    return { total: 0, couponTotal: 0 };
  }, [cartData, adultQuantity, childrenQuantity]);

  //套用優惠券
  const addCoupon = async (code) => {
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
      console.log(res.data.message);
      localStorage.setItem("couponInfStorage", JSON.stringify(res.data));
      setCouponInf(res.data);
      getCart();
    } catch (error) {
      console.log(error);

      setCouponInf(error.response.data);
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
                    <i class="fa-solid fa-plane cart__section__icon mb-3"></i>
                  </p>
                  <p className=" fs-2">還沒有選擇行程呦</p>
                </div>
                <div>
                  <Link
                    to="/area-japan/kanto"
                    className="btn btn-dark w-100 mt-4 rounded-0 py-3"
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
                          alt=""
                          className="object-cover img-fluid"
                        />
                      </div>
                      <div className="w-100 p-3 position-relative">
                        <button
                          type="button"
                          className="position-absolute btn"
                          style={{ top: "10px", right: "10px" }}
                          onClick={() => {
                            removeCartItem(item.id);
                          }}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                        <h4 className="mb-3 fw-bold ">{item.product.title}</h4>
                        <div className="mt-2 mb-3">
                          <p>
                            <span className="fw-bold">出發日期 : </span>
                            {selectedDate}
                          </p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center w-100 mb-3 ">
                          {/* 大人select */}
                          <div className="input-group w-25 align-items-center me-3">
                            <span className="fw-bold">大人</span> :
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
                            <span className="fw-bold">小孩</span> :
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
                          <div className="col-12 col-md-5 mb-3">
                            <div className="row">
                              <div className="col-12">
                                {" "}
                                <div className="input-group  w-75">
                                  <button
                                    class="btn btn-secondary"
                                    type="button"
                                    id="button-addon1"
                                    onClick={() => addCoupon(couponCode)}
                                  >
                                    使用優惠碼
                                  </button>
                                  <input
                                    type="text"
                                    className="form-control "
                                    placeholder=""
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    value={couponCode}
                                    onChange={(e) =>
                                      setCouponCode(e.target.value)
                                    }
                                    // onBlur={() => addCoupon(couponCode)}
                                  />
                                </div>
                                <div className="">
                                  {" "}
                                  {localStorage.getItem("couponInfStorage") ? (
                                    <p className="text-secondary mt-1">
                                      {
                                        JSON.parse(
                                          localStorage.getItem(
                                            "couponInfStorage"
                                          )
                                        ).message
                                      }
                                    </p>
                                  ) : (
                                    <p className="text-secondary mt-1">
                                      {couponInf.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-5 mt-5">
                            <div className=" text-end">
                              <p
                                className={`mb-0 h5 fw-bold ${
                                  localStorage.getItem("couponInfStorage")
                                    ? "text-decoration-line-through"
                                    : ""
                                }`}
                              >
                                總金額 :
                                {adultQuantity + childrenQuantity > 0
                                  ? ` NT$${total}`
                                  : ""}
                              </p>
                              {localStorage.getItem("couponInfStorage") && (
                                <p className="mb-0 h5 fw-bold text-danger mt-2">
                                  優惠總金額:
                                  {adultQuantity + childrenQuantity > 0
                                    ? `NT$${couponTotal}`
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
                    className="btn btn-dark w-100 mt-4 rounded-0 py-3"
                    disabled
                  >
                    請選擇人數
                  </button>
                ) : (
                  <Link
                    to="/checkout"
                    className="btn btn-dark w-100 mt-4 rounded-0 py-3"
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
