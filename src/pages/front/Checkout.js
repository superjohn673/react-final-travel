import React, { useContext, useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext } from "../../store/AppContext";
import { Input } from "../../components/FormElements";
import axios from "axios";
import CartNavigator from "../../components/CartNavigator";
import { formatNumberWithCommas } from "../../utils/helpers";
import ButtonWithLoading from "../../components/ButtonWithLoading";

const Checkout = () => {
  const { cartData, getCart } = useOutletContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    selectedDate,
    adultQuantity,
    childrenQuantity,
    finalTotal,
    finalCouponTotal,
  } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const removeCartItem = async (id) => {
    try {
      const _res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      getCart();
    } catch (error) {
      console.error("刪除購物車產品失敗:", error);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const { name, email, tel, address } = data;
      const form = {
        data: {
          user: {
            name,
            email,
            tel,
            address,
          },
        },
      };
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        form
      );
      removeCartItem();
      navigate(`/success/${res.data.orderId}`);
    } catch (error) {
      console.error("報名失敗:", error);
      alert("報名失敗，請稍後再試");
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-light py-6 my-6 full-height checkout-page">
      <CartNavigator currentStep={2} />
      <div className="container">
        <div className="row justify-content-center flex-lg-row flex-column-reverse">
          <form className="col-lg-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white p-4 checkout-form-container">
              <h4 className="fw-bold mb-5 checkout-title">聯絡人資料</h4>
              <div className="mb-3">
                <Input
                  id="name"
                  type="text"
                  errors={errors}
                  labelText="姓名"
                  register={register}
                  rules={{
                    required: "使用者名稱為必填",
                    maxLength: {
                      value: 10,
                      message: "使用者名稱長度不超過 10",
                    },
                  }}
                ></Input>
              </div>
              <div className="mb-3">
                <Input
                  id="tel"
                  labelText="電話"
                  type="tel"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "電話為必填",
                    minLength: {
                      value: 6,
                      message: "電話不少於 6 碼",
                    },
                    maxLength: {
                      value: 12,
                      message: "電話不超過 12 碼",
                    },
                  }}
                ></Input>
              </div>
              <div className="mb-3">
                <Input
                  id="email"
                  labelText="Email"
                  type="email"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "Email 為必填",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email 格式不正確",
                    },
                  }}
                ></Input>
              </div>
              <div className="mb-3">
                <Input
                  id="address"
                  labelText="地址"
                  type="address"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "地址為必填",
                  }}
                ></Input>
              </div>
            </div>
            <div className="row justify-content-between mt-4">
              <div className="col-5 col-md-4 align-items-center">
                {" "}
                <Link className="back-link mt-md-0 mt-3" to="/cart">
                  <i className="bi bi-chevron-left me-2"></i> 修改人數
                </Link>
              </div>
              <div className="col-7 col-md-5 text-end">
                {" "}
                <ButtonWithLoading
                  type="submit"
                  className="booking-btn py-3 px-4 rounded-0"
                  isLoading={isSubmitting}
                  loadingText="報名中..."
                >
                  確認報名
                </ButtonWithLoading>
              </div>
            </div>
          </form>
          <div className="col-lg-5 mb-4 mb-lg-0">
            <div className="checkout-summary-container">
              {cartData?.carts?.map((item) => {
                return (
                  <div className="checkout-product" key={item.id}>
                    <div className="checkout-product-header">
                      <span className="product-tag">日本行程</span>
                      <h4 className="mb-3 fw-bold">{item.product.title}</h4>
                    </div>
                    <div className="checkout-info-row">
                      <div className="checkout-info-label">
                        <i className="bi bi-calendar-event me-2"></i>出發日期
                      </div>
                      <div className="checkout-info-value">{selectedDate}</div>
                    </div>
                    <div className="checkout-info-row">
                      <div className="checkout-info-label">
                        <i className="bi bi-geo-alt-fill me-2"></i>出發地
                      </div>
                      <div className="checkout-info-value">桃園國際機場</div>
                    </div>
                    <div className="checkout-passenger-section">
                      <div className="checkout-info-label mb-3">
                        <i className="bi bi-people-fill me-2"></i>旅客人數
                      </div>
                      <div className="checkout-passenger-row">
                        <div className="passenger-type">
                          <i className="bi bi-person-fill me-2 cart-icon"></i>
                          大人 x {adultQuantity}
                        </div>
                        <div className="passenger-price">
                          NT${" "}
                          {formatNumberWithCommas(
                            (cartData.total /
                              (adultQuantity + childrenQuantity)) *
                              adultQuantity
                          )}
                        </div>
                      </div>
                      <div className="checkout-passenger-row">
                        <div className="passenger-type">
                          <i className="bi bi-person-fill me-2 cart-icon"></i>
                          小孩 x {childrenQuantity}
                        </div>
                        <div className="passenger-price">
                          NT${" "}
                          {formatNumberWithCommas(
                            (cartData.total /
                              (adultQuantity + childrenQuantity)) *
                              childrenQuantity *
                              0.8
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4"></div>
                      <div className="col-8"></div>
                    </div>
                  </div>
                );
              })}
              <div className="checkout-total-section">
                <div
                  className={
                    finalTotal === finalCouponTotal
                      ? "checkout-total-row"
                      : "checkout-total-row strikethrough"
                  }
                >
                  <div className="total-label">總金額</div>
                  <div className="total-value">
                    NT$ {formatNumberWithCommas(finalTotal)}
                  </div>
                </div>
                <div
                  className={
                    finalTotal === finalCouponTotal
                      ? "checkout-total-row discount d-none"
                      : "checkout-total-row discount"
                  }
                >
                  <div className="total-label">優惠總金額</div>
                  <div className="total-value">
                    NT$ {formatNumberWithCommas(Math.round(finalCouponTotal))}
                  </div>
                </div>
                <div className="checkout-total-row deposit">
                  <div className="total-label">訂金</div>
                  <div className="total-value">
                    NT$ {formatNumberWithCommas(15000)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
