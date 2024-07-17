import { Link, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../store/AppContext";
import CartNavigator from "../../components/CartNavigator";
function Success() {
  const {
    selectedDate,
    adultQuantity,
    childrenQuantity,
    finalTotal,
    finalCouponTotal,
  } = useContext(AppContext);
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});

  const getCart = async (orderId) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
    );
    setOrderData(res.data.order);
  };

  useEffect(() => {
    getCart(orderId);
  }, [orderId]);

  return (
    <div className="container full-height mb-6 mt-5">
      <CartNavigator currentStep={3} />
      <div
        style={{
          minHeight: "400px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center center",
        }}
      ></div>
      <div className="mt-5 mb-7">
        <div className="row ">
          <div className="col-md-6 ">
            <h2 className="mb-3">報名成功</h2>
            <p className="text-muted">
              親愛的顧客，感謝您在本平台訂購行程。我們非常感激您對我們的信任和支持，讓我們有機會為您提供優質的服務。
            </p>
            <p className="text-muted">感謝您選擇本平台，祝您旅途愉快！</p>
            <Link
              to={`/member/orders/${orderId}`}
              className="btn btn-outline-dark me-2 rounded-0 mb-4"
            >
              前往付款
            </Link>
          </div>
          <div className="col-md-6">
            <div className="card rounded-0 py-4">
              <div className="card-header border-bottom-0 bg-white px-4 py-0 mb-2">
                <h2 className="text-center">行程細節</h2>
              </div>
              <div className="card-body px-4 py-0">
                <ul className="list-group list-group-flush">
                  {Object.values(orderData?.products || {}).map((item) => {
                    return (
                      <div className="border-top p-4 mb-4">
                        <div className="" key={item.id}>
                          <h4 className="mb-4 fw-bold">{item.product.title}</h4>
                          <div className="row mb-4">
                            <div className="col-4 text-danger fw-bold">
                              出發日期
                            </div>
                            <div className="col-8 text-end">{selectedDate}</div>
                          </div>
                          <div className="row mb-4">
                            <div className="col-4 text-danger fw-bold">
                              出發地
                            </div>
                            <div className="col-8 text-end">桃園國際機場</div>
                          </div>
                          <div className="row mb-4">
                            <div className="col-12 mb-1 text-danger fw-bold">
                              旅客人數
                            </div>
                            <div className="col-4">大人 x {adultQuantity}</div>
                            <div className="col-8 text-end">
                              NT$
                              {(item.total /
                                (adultQuantity + childrenQuantity)) *
                                adultQuantity}
                            </div>
                            <div className="col-4">
                              小孩 x {childrenQuantity}
                            </div>
                            <div className="col-8 text-end">
                              NT$
                              {(item.total /
                                (adultQuantity + childrenQuantity)) *
                                childrenQuantity *
                                0.8}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4"></div>
                            <div className="col-8"></div>
                          </div>
                        </div>

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
                          <div className="col-7 fw-bold text-end mt-3">
                            NT$ 15000
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
