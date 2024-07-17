import React, { useContext } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext } from "../../store/AppContext";
import { Input } from "../../components/FormElements";
import axios from "axios";
import CartNavigator from "../../components/CartNavigator";

const Checkout = () => {
  const { cartData, getCart } = useOutletContext();
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
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
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
  };
  return (
    <div className="bg-light py-6 my-6 full-height">
      <CartNavigator currentStep={2} />
      <div className="container">
        <div className="row justify-content-center flex-lg-row flex-column-reverse">
          <form className=" col-lg-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white p-4">
              <h4 className="fw-bold mb-5">聯絡人資料</h4>
              <div className="mb-2">
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
              <div className="mb-2">
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
              <div className="mb-2">
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
              <div className="mb-2">
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
            <div className="row justify-content-between mt-5">
              <div className="col-3 align-items-center">
                {" "}
                <Link className="text-dark mt-md-0 mt-3" to="/cart">
                  <i className="bi bi-chevron-left me-2"></i> 修改人數
                </Link>
              </div>
              <div className="col-4 text-end">
                {" "}
                <button
                  type="submit"
                  className="btn btn-dark py-3 px-4 rounded-2"
                >
                  確認報名
                </button>
              </div>
            </div>
          </form>
          <div className=" col-lg-5">
            <div className="border p-4 mb-4">
              {cartData?.carts?.map((item) => {
                return (
                  <div className="" key={item.id}>
                    <h4 className="mb-4 fw-bold">{item.product.title}</h4>
                    <div className="row mb-4">
                      <div className="col-4 text-danger fw-bold">出發日期</div>
                      <div className="col-8 text-end">{selectedDate}</div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-4 text-danger fw-bold">出發地</div>
                      <div className="col-8 text-end">桃園國際機場</div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-12 mb-1 text-danger fw-bold">
                        旅客人數
                      </div>
                      <div className="col-4">大人 x {adultQuantity}</div>
                      <div className="col-8 text-end">
                        NT$
                        {(cartData.total / (adultQuantity + childrenQuantity)) *
                          adultQuantity}
                      </div>
                      <div className="col-4">小孩 x {childrenQuantity}</div>
                      <div className="col-8 text-end">
                        NT$
                        {(cartData.total / (adultQuantity + childrenQuantity)) *
                          childrenQuantity *
                          0.8}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4"></div>
                      <div className="col-8"></div>
                    </div>
                  </div>
                );
              })}
              <div className="row mt-4">
                <div
                  className={
                    finalTotal === finalCouponTotal
                      ? "col-5 h5"
                      : "col-5 h5  text-decoration-line-through"
                  }
                >
                  總金額
                </div>
                <div
                  className={
                    finalTotal === finalCouponTotal
                      ? "col-7 h5  text-end "
                      : "col-7 h5  text-decoration-line-through text-end "
                  }
                >
                  NT$ {finalTotal}
                </div>
                <div
                  className={
                    finalTotal === finalCouponTotal
                      ? "col-5 h5 fw-bold text-danger d-none"
                      : "col-5 h5 fw-bold text-danger"
                  }
                >
                  優惠總金額
                </div>
                <div
                  className={
                    finalTotal === finalCouponTotal
                      ? "col-7 h5 fw-bold text-danger text-end d-none"
                      : "col-7 h5 fw-bold text-danger text-end"
                  }
                >
                  NT$ {finalCouponTotal}
                </div>
                <div className="col-5 fw-bold mt-3">訂金</div>
                <div className="col-7 fw-bold text-end mt-3">NT$ 15000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
