import { Link, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import { formatDate, formatNumberWithCommas } from "../../utils/helpers";
import CartNavigator from "../../components/CartNavigator";
import { AppContext } from "../../store/AppContext";

function Success() {
  const [orderData, setOrderData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedTours, setRecommendedTours] = useState([]);
  const { orderId } = useParams();

  const {
    selectedDate,
    adultQuantity,
    childrenQuantity,
    finalTotal,
    finalCouponTotal,
  } = useContext(AppContext);

  const getOrder = async (orderId) => {
    if (!orderId) {
      setError("訂單 ID 不存在");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
      );
      if (res.data.order) {
        setOrderData(res.data.order);
      } else {
        setError("找不到訂單資料");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError("載入訂單時發生錯誤");
      setIsLoading(false);
    }
  };

  // 獲取推薦行程
  const getRecommendedTours = useCallback(async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      const allTours = res.data.products;
      // 過濾掉當前行程，並隨機選擇3個推薦行程
      const filteredTours = allTours.filter(
        (tour) => tour.id !== orderData?.products?.[0]?.product?.id
      );
      const randomTours = filteredTours
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setRecommendedTours(randomTours);
    } catch (error) {
      console.log(error);
    }
  }, [orderData]);

  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);

  useEffect(() => {
    if (orderData?.products) {
      getRecommendedTours();
    }
  }, [orderData, getRecommendedTours]);

  return (
    <div className="container py-5 success-page">
      <CartNavigator currentStep={3} />

      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center py-5 my-5">
          <i className="bi bi-exclamation-triangle-fill fs-1 d-block mb-3"></i>
          <h3>{error}</h3>
          <p className="mt-3">請返回首頁重新嘗試</p>
          <Link to="/" className="btn btn-primary mt-2">
            <i className="bi bi-house me-2"></i>回到首頁
          </Link>
        </div>
      ) : (
        <>
          <div className="success-hero-section">
            <div className="success-hero-overlay">
              <div className="success-hero-content">
                <div className="success-icon">
                  <i className="bi bi-check-lg"></i>
                </div>
                <h1 className="success-title">報名成功！</h1>
                <p className="success-subtitle">您的旅程已成功預訂</p>
              </div>
            </div>
          </div>

          <div className="row success-content-section">
            <div className="col-md-5 mb-4 mb-md-0">
              <div className="success-message-container">
                <h2 className="section-title">訂單確認</h2>
                <p>
                  親愛的顧客，感謝您的報名！您的訂單已成功建立，我們已將訂單詳情發送至您的電子郵件。
                </p>
                <p>
                  請注意，您需要在 <strong>3 天內</strong>{" "}
                  完成付款，否則訂單將自動取消。如未收到確認郵件，請檢查您的垃圾郵件資料夾。
                </p>
                <p>
                  如有任何問題，請隨時聯繫我們的客服團隊，我們將竭誠為您服務。
                </p>

                <div className="success-buttons">
                  <Link to="/" className="home-btn">
                    <i className="bi bi-house"></i> 回到首頁
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <div className="success-order-container">
                <div className="order-header">
                  <h2 className="section-title">訂單詳情</h2>
                  <div className="order-id">
                    訂單編號:{" "}
                    <span className="id-value">
                      {orderData?.id || "處理中"}
                    </span>
                  </div>
                </div>

                <div className="order-details">
                  {Object.values(orderData?.products || {}).map((item) => (
                    <div className="order-product" key={item.id}>
                      <div className="product-header">
                        <div className="product-tag">旅遊行程</div>
                        <h3 className="product-title">{item.product.title}</h3>
                      </div>

                      <div className="info-row">
                        <div className="info-label">
                          <i className="bi bi-calendar-event"></i> 出發日期
                        </div>
                        <div className="info-value">
                          {formatDate(selectedDate)}
                        </div>
                      </div>

                      <div className="info-row">
                        <div className="info-label">
                          <i className="bi bi-geo-alt"></i> 出發地
                        </div>
                        <div className="info-value">桃園國際機場</div>
                      </div>

                      <div className="passenger-section">
                        <div className="section-label">
                          <i className="bi bi-people"></i> 旅客資訊
                        </div>

                        <div className="passenger-row">
                          <div className="passenger-type adult-type">
                            <i className="bi bi-person-fill"></i> 成人 x{" "}
                            {adultQuantity}
                          </div>
                          <div className="passenger-price">
                            NT${" "}
                            {formatNumberWithCommas(
                              (item.total /
                                (adultQuantity + childrenQuantity)) *
                                adultQuantity
                            )}
                          </div>
                        </div>

                        <div className="passenger-row">
                          <div className="passenger-type child-type">
                            <i className="bi bi-person-badge"></i> 兒童 x{" "}
                            {childrenQuantity}
                          </div>
                          <div className="passenger-price">
                            NT${" "}
                            {formatNumberWithCommas(
                              (item.total /
                                (adultQuantity + childrenQuantity)) *
                                childrenQuantity *
                                0.8
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="total-section">
                        <div className="total-row">
                          <div className="total-label">總金額</div>
                          <div className="total-value">
                            NT${" "}
                            {formatNumberWithCommas(
                              Math.round(finalCouponTotal)
                            )}
                          </div>
                        </div>

                        {finalTotal !== finalCouponTotal && (
                          <>
                            <div className="total-row strikethrough">
                              <div className="total-label">原價</div>
                              <div className="total-value">
                                NT$ {formatNumberWithCommas(finalTotal)}
                              </div>
                            </div>
                            <div className="total-row discount">
                              <div className="total-label">優惠折扣 %</div>
                              <div className="total-value">
                                - NT${" "}
                                {formatNumberWithCommas(
                                  Math.round(finalTotal - finalCouponTotal)
                                )}
                              </div>
                            </div>
                            <div className="total-row">
                              <div className="total-label">折扣後總金額</div>
                              <div className="total-value">
                                NT${" "}
                                {formatNumberWithCommas(
                                  Math.round(finalCouponTotal)
                                )}
                              </div>
                            </div>
                          </>
                        )}

                        <div className="total-row deposit">
                          <div className="total-label">應付訂金</div>
                          <div className="total-value">NT$ 15,000</div>
                        </div>

                        <div className="payment-button-container mt-4">
                          <Link
                            to={
                              orderData?.id
                                ? `/member/orders/${orderData.id}`
                                : "/"
                            }
                            className="payment-btn"
                          >
                            <i className="bi bi-credit-card"></i> 前往付款
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 新增推薦行程區塊 */}
          <div className="recommended-tours-section">
            <div className="section-header">
              <h2 className="section-title">您可能也喜歡</h2>
              <p className="section-subtitle">探索更多精彩行程</p>
            </div>

            <div className="row">
              {recommendedTours.map((tour) => (
                <div className="col-md-4 mb-4" key={tour.id}>
                  <div className="tour-card">
                    <div
                      className="tour-image"
                      style={{
                        backgroundImage: `url(${tour.imageUrl})`,
                      }}
                    >
                      <div className="tour-overlay">
                        <Link
                          to={`/product/${tour.id}`}
                          className="view-tour-btn"
                        >
                          查看行程
                        </Link>
                      </div>
                    </div>
                    <div className="tour-content">
                      <h3 className="tour-title">{tour.title}</h3>
                      <div className="tour-info">
                        <span className="tour-price">
                          NT$ {formatNumberWithCommas(tour.price)}
                        </span>
                        <span className="tour-duration">
                          <i className="bi bi-clock"></i>熱門行程
                        </span>
                      </div>
                      <p className="tour-description">{tour.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <Link to="/tour/classic-japan" className="explore-more-btn">
                <i className="bi bi-compass"></i> 探索更多行程
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Success;
