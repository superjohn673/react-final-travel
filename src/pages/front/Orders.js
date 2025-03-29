import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import { formatDateTime, formatNumberWithCommas } from "../../utils/helpers";
import {
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaUsers,
  FaCreditCard,
  FaShoppingBag,
  FaEye,
  FaClipboardList,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsloading] = useState(false);

  const getOrders = async (page = 1) => {
    setIsloading(true);
    const orderRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/orders?page=${page}`
    );
    setOrders(orderRes.data.orders);
    setPagination(orderRes.data.pagination);
    setIsloading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="card mb-4">
        <div className="card-header d-flex align-items-center">
          <FaClipboardList
            className="me-2"
            style={{ color: "rgb(151, 125, 6)" }}
          />
          <h5 className="mb-0 fw-bold">我的旅遊訂單</h5>
        </div>
        <div className="card-body p-4">
          <Loading isLoading={isLoading} />

          {orders.length === 0 && !isLoading && (
            <div className="text-center py-5">
              <FaShoppingBag
                size={50}
                style={{ color: "rgba(151, 125, 6, 0.2)" }}
                className="mb-3"
              />
              <p className="mb-0">您目前沒有任何訂單記錄</p>
              <Link to="/" className="btn btn-primary mt-3">
                開始探索旅遊行程
              </Link>
            </div>
          )}

          <div className="order-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-header">
                  <div className="d-flex align-items-center">
                    <FaShoppingBag
                      className="me-2"
                      style={{ color: "rgb(151, 125, 6)" }}
                    />
                    <h5 className="fw-bold">訂單編號：{order.id}</h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaCalendarAlt
                      className="me-2"
                      style={{ color: "rgb(151, 125, 6)" }}
                    />
                    <span className="me-3 order-date">
                      下單日期：{formatDateTime(order.create_at)}
                    </span>
                    <span
                      className={`order-status ${
                        order.is_paid ? "paid" : "unpaid"
                      }`}
                    >
                      {order.is_paid ? "已付款" : "未付款"}
                    </span>
                  </div>
                </div>
                <div className="order-body">
                  {Object.keys(order.products).map((productKey) => (
                    <div key={productKey} className="product-item">
                      <div className="product-image">
                        <img
                          src={order.products[productKey].product.imageUrl}
                          alt={order.products[productKey].product.title}
                          className="object-cover"
                        />
                      </div>
                      <div className="product-info">
                        <h6 className="product-title">
                          {order.products[productKey].product.title}
                        </h6>
                        <div className="product-details">
                          <div className="detail-item">
                            <FaUsers />
                            <span>{order.products[productKey].qty} 人</span>
                          </div>
                          <div className="detail-item">
                            <FaMapMarkerAlt />
                            <span>東京</span>
                          </div>
                          <div className="detail-item">
                            <FaClock />
                            <span>5天4夜</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="customer-info">
                    <h6 className="info-title">訂購人資訊</h6>
                    <div className="info-grid">
                      <div className="info-item">
                        <FaUser />
                        <span>{order.user.name}</span>
                      </div>
                      <div className="info-item">
                        <FaPhone />
                        <span>{order.user.tel}</span>
                      </div>
                      <div className="info-item">
                        <FaEnvelope />
                        <span>{order.user.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-footer">
                  <div className="order-total">
                    總金額：
                    <span>NT$ {formatNumberWithCommas(order.total)}</span>
                  </div>
                  <div className="order-actions">
                    {!order.is_paid ? (
                      <Link
                        to={`/member/orders/${order.id}`}
                        className="btn btn-primary"
                      >
                        <FaCreditCard className="me-1" />
                        前往付款
                      </Link>
                    ) : (
                      <Link
                        to={`/member/orders/${order.id}`}
                        className="btn btn-outline-primary"
                      >
                        <FaEye className="me-1" />
                        查看詳情
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {orders.length > 0 && (
            <div className="pagination-container mt-4">
              <Pagination pagination={pagination} changePage={getOrders} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
