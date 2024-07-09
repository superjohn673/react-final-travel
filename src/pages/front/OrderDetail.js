import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const res = await axios.get(
          `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
        );
        setOrder(res.data.order);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setIsLoading(false);
      }
    };
    getOrderDetail();
  }, [orderId]);

  const handlePay = async () => {
    try {
      await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/pay/${order.id}`
      );
      // 更新訂單狀態
      setOrder({ ...order, is_paid: true });
      navigate("/member/orders");
    } catch (error) {
      console.error("Error paying order:", error);
    }
  };

  return (
    <div className="container my-5">
      <Loading isLoading={isLoading} />
      <p className="fs-4 text-center fw-bold mb-4">訂單細節</p>
      {order && (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center py-4">
            <h4 className="mb-0">訂單編號: {order.id}</h4>
            <p
              className={`mb-0 ${
                order.is_paid ? "text-success" : "text-danger"
              }`}
            >
              {order.is_paid ? "已付款" : "未付款"}
            </p>
          </div>
          <div className="card-body py-3">
            <div className="row">
              <div className="col-12 border-bottom mb-3 ">
                {/* <h5 className="mb-3">訂購的商品:</h5> */}
                {Object.keys(order.products).map((productKey) => (
                  <div className="row mb-3" key={productKey}>
                    <div className="col-lg-6">
                      {" "}
                      <p className="fw-bold fs-5">
                        {order.products[productKey].product.title}
                      </p>
                      <img
                        src={order.products[productKey].product.imageUrl}
                        alt={order.products[productKey].product.title}
                        className="img-fluid mb-2"
                        style={{ maxHeight: "300px" }}
                      />
                    </div>
                    <div className="col-lg-6 d-flex flex-column justify-content-end align-items-end">
                      <div className="">
                        <p>
                          <span className="fw-bold fs-5">總人數:</span>{" "}
                          {order.products[productKey].qty}
                        </p>
                        <p className="fw-bold text-danger fs-5">
                          <span>訂單總金額:</span>{" "}
                          {order.products[productKey].final_total}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-12 border-bottom py-3">
                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <h5 className=" fw-bold mb-2">顧客資訊:</h5>
                    <ul className="list-unstyled mb-3">
                      <li>
                        <span className="fw-bold">姓名 :</span>{" "}
                        {order.user.name}
                      </li>
                      <li>
                        <span className="fw-bold">電話 :</span> {order.user.tel}
                      </li>
                      <li>
                        <span className="fw-bold">Email :</span>{" "}
                        {order.user.email}
                      </li>
                      <li>
                        <span className="fw-bold">地址 :</span>{" "}
                        {order.user.address}
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6"> </div>
                </div>
              </div>

              <div className="col-12 py-3">
                {" "}
                <div className="">
                  {" "}
                  <p>
                    <span className="fw-bold">建立時間 :</span>{" "}
                    {new Date(order.create_at * 1000).toLocaleString()}
                  </p>
                  {/* <p>
                  <span className="fw-bold">訂單總金額:</span> {order.total}
                </p> */}
                  <p>
                    <span className="fw-bold">訂單備註 :</span> {order.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-end py-3">
            {!order.is_paid && (
              <button className="btn btn-primary" onClick={handlePay}>
                付款
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
