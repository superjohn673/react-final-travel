import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import ButtonWithLoading from "../../components/ButtonWithLoading";
import { formatNumberWithCommas } from "../../utils/helpers";
import {
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaCreditCard,
  FaClipboardCheck,
  FaCommentDots,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
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
    setIsPaymentLoading(true);

    try {
      await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/pay/${order.id}`
      );
      setOrder({ ...order, is_paid: true });
      navigate("/member/orders");
    } catch (error) {
      console.error("Error paying order:", error);
      alert("付款失敗，請稍後再試");
      setIsPaymentLoading(false);
    }
  };

  // 格式化日期函數
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <div className="container my-5">
      <Loading isLoading={isLoading} />

      {order && (
        <div className="order-detail-container">
          <div className="order-detail-header">
            <Link to="/member/orders" className="back-link">
              <FaArrowLeft /> 返回訂單列表
            </Link>
            <h2 className="order-detail-title">訂單詳情</h2>
            <div className="order-meta d-flex flex-md-row flex-column text-nowrap">
              <div className="order-id">
                <span className="label ">訂單編號:</span>
                <span className="value ">{order.id}</span>
              </div>
              <div
                className={`order-status ${order.is_paid ? "paid" : "unpaid"}`}
              >
                {order.is_paid ? "已付款" : "未付款"}
              </div>
            </div>
          </div>

          <div className="order-detail-content">
            <div className="order-products">
              <h3 className="section-title">
                <FaClipboardCheck className="section-icon" />
                訂購商品
              </h3>

              {Object.keys(order.products).map((productKey) => (
                <div className="product-card" key={productKey}>
                  <div className="product-image">
                    <img
                      src={order.products[productKey].product.imageUrl}
                      alt={order.products[productKey].product.title}
                    />
                  </div>
                  <div className="product-details">
                    <h4 className="product-title">
                      {order.products[productKey].product.title}
                    </h4>
                    <div className="product-info-grid">
                      <div className="info-item">
                        <FaUsers className="info-icon" />
                        <span className="info-label">人數:</span>
                        <span className="info-value">
                          {order.products[productKey].qty} 人
                        </span>
                      </div>
                      <div className="info-item">
                        <FaMapMarkerAlt className="info-icon" />
                        <span className="info-label">目的地:</span>
                        <span className="info-value">日本東京</span>
                      </div>
                      <div className="info-item">
                        <FaClock className="info-icon" />
                        <span className="info-label">行程:</span>
                        <span className="info-value">5天4夜</span>
                      </div>
                      <div className="info-item">
                        <FaMoneyBillWave className="info-icon" />
                        <span className="info-label">金額:</span>
                        <span className="info-value price">
                          NT${" "}
                          {formatNumberWithCommas(
                            order.products[productKey].final_total
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-customer-info">
              <h3 className="section-title">
                <FaUser className="section-icon" />
                訂購人資訊
              </h3>
              <div className="customer-info-grid">
                <div className="info-item">
                  <FaUser className="info-icon" />
                  <span className="info-label">姓名:</span>
                  <span className="info-value">{order.user.name}</span>
                </div>
                <div className="info-item">
                  <FaPhone className="info-icon" />
                  <span className="info-label">電話:</span>
                  <span className="info-value">{order.user.tel}</span>
                </div>
                <div className="info-item">
                  <FaEnvelope className="info-icon" />
                  <span className="info-label">Email:</span>
                  <span className="info-value">{order.user.email}</span>
                </div>
                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <span className="info-label">地址:</span>
                  <span className="info-value">{order.user.address}</span>
                </div>
              </div>
            </div>

            <div className="order-additional-info">
              <div className="info-item">
                <FaCalendarAlt className="info-icon" />
                <span className="info-label">建立時間:</span>
                <span className="info-value">
                  {formatDate(order.create_at)}
                </span>
              </div>
              {order.message && (
                <div className="info-item">
                  <FaCommentDots className="info-icon" />
                  <span className="info-label">訂單備註:</span>
                  <span className="info-value">{order.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="order-detail-footer">
            <div className="order-total">
              <span className="label">訂單總金額:</span>
              <span className="value">
                NT$ {formatNumberWithCommas(order.total)}
              </span>
            </div>
            {!order.is_paid && (
              <ButtonWithLoading
                className="btn-pay"
                onClick={handlePay}
                isLoading={isPaymentLoading}
                loadingText="付款中..."
              >
                <FaCreditCard className="btn-icon" />
                立即付款
              </ButtonWithLoading>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
