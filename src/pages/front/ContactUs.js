import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faComments,
  faPaperPlane,
  faMapMarkerAlt,
  faBuilding,
  faClock,
  faCheck,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { faLine } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    lineId: "",
    message: "",
    subject: "一般諮詢",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "請輸入您的姓名";
    }

    if (!formData.email.trim()) {
      errors.email = "請輸入您的電子信箱";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "請輸入有效的電子信箱格式";
    }

    if (!formData.phone.trim()) {
      errors.phone = "請輸入您的聯絡電話";
    } else if (!/^[0-9+-\s]+$/.test(formData.phone)) {
      errors.phone = "電話號碼格式不正確";
    }

    if (!formData.message.trim()) {
      errors.message = "請輸入您的訊息內容";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormStatus({
        submitted: false,
        error: true,
        message: "請檢查表單中的錯誤",
      });
      return;
    }

    setFormStatus({
      submitted: true,
      error: false,
      message: "感謝您的訊息！我們將盡快與您聯繫。",
    });

    console.log("表單數據:", formData);
  };

  const subjectOptions = [
    "一般諮詢",
    "行程規劃",
    "訂單查詢",
    "合作提案",
    "投訴建議",
    "其他",
  ];

  return (
    <>
      <div className="contact-us-page">
        <div className={`contact-us-hero ${isAnimated ? "animated" : ""}`}>
          <div className="container">
            <h1>聯絡我們</h1>
            <p>我們期待聆聽您的聲音，為您提供最好的旅遊體驗</p>
          </div>
        </div>

        <div className="container">
          <div className={`contact-us-wrapper ${isAnimated ? "animated" : ""}`}>
            <div className="contact-info-section">
              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <FontAwesomeIcon icon={faHeadset} />
                  </div>
                  <h3>客戶服務</h3>
                  <p>週一至週五 9:00-18:00</p>
                  <p>02-1234-5678</p>
                </div>

                <div className="contact-card">
                  <div className="contact-card-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <h3>電子郵件</h3>
                  <p>我們會在24小時內回覆</p>
                  <p>service@travel.com</p>
                </div>

                <div className="contact-card">
                  <div className="contact-card-icon">
                    <FontAwesomeIcon icon={faBuilding} />
                  </div>
                  <h3>公司地址</h3>
                  <p>台北市中山區南京東路三段219號</p>
                  <p>10樓</p>
                </div>
              </div>

              <div className="contact-us-map-section">
                <h3>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> 我們的位置
                </h3>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.4679376805367!2d121.54171491500815!3d25.052133983965536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abe6b0c69f95%3A0x5966a0e9be9ac481!2zMTA15Y-w5YyX5biC5p2-5bGx5Y2A5Y2X5Lqs5p2x6Lev5LiJ5q61MjE56Jmf!5e0!3m2!1szh-TW!2stw!4v1621234567890!5m2!1szh-TW!2stw"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="公司地圖位置"
                  ></iframe>
                </div>
                <div className="map-info">
                  <div className="map-info-item">
                    <FontAwesomeIcon icon={faBuilding} className="map-icon" />
                    <div>
                      <h4>公司地址</h4>
                      <p>台北市中山區南京東路三段219號5樓</p>
                    </div>
                  </div>
                  <div className="map-info-item">
                    <FontAwesomeIcon icon={faClock} className="map-icon" />
                    <div>
                      <h4>營業時間</h4>
                      <p>週一至週五 9:00-18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <div className="contact-form-header">
                <h2>發送訊息</h2>
                <p>填寫以下表單，我們將盡快回覆您的需求</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-us-form">
                {formStatus.submitted ? (
                  <div className="form-success-message">
                    <div className="success-icon-wrapper">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="success-icon"
                      />
                    </div>
                    <h3>訊息已送出！</h3>
                    <p>{formStatus.message}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormStatus({
                          submitted: false,
                          error: false,
                          message: "",
                        });
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          lineId: "",
                          message: "",
                          subject: "一般諮詢",
                        });
                      }}
                      className="reset-form-btn"
                    >
                      填寫新表單
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name" className="required">
                          <FontAwesomeIcon icon={faUser} /> 聯絡人姓名
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="請輸入姓名"
                          className={formErrors.name ? "error" : ""}
                          required
                        />
                        {formErrors.name && (
                          <div className="error-message">{formErrors.name}</div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="required">
                          <FontAwesomeIcon icon={faEnvelope} /> 電子信箱
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="請輸入電子信箱"
                          className={formErrors.email ? "error" : ""}
                          required
                        />
                        {formErrors.email && (
                          <div className="error-message">
                            {formErrors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone" className="required">
                          <FontAwesomeIcon icon={faPhone} /> 聯絡電話
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="請輸入聯絡電話"
                          className={formErrors.phone ? "error" : ""}
                          required
                        />
                        {formErrors.phone && (
                          <div className="error-message">
                            {formErrors.phone}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="lineId">
                          <FontAwesomeIcon icon={faLine} /> LINE ID
                        </label>
                        <input
                          type="text"
                          id="lineId"
                          name="lineId"
                          value={formData.lineId}
                          onChange={handleChange}
                          placeholder="請輸入LINE ID (選填)"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject" className="required">
                        <FontAwesomeIcon icon={faComments} /> 諮詢主題
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        {subjectOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="required">
                        <FontAwesomeIcon icon={faComments} /> 需求說明
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="請詳細描述您的需求或問題，我們將盡快回覆"
                        className={formErrors.message ? "error" : ""}
                        required
                      ></textarea>
                      {formErrors.message && (
                        <div className="error-message">
                          {formErrors.message}
                        </div>
                      )}
                    </div>

                    <button type="submit" className="submit-btn">
                      <FontAwesomeIcon icon={faPaperPlane} /> 送出表單
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>

          <div className="contact-faq-section">
            <h3>常見問題</h3>
            <p>您可能想知道的問題，我們已經為您準備好了答案</p>
            <div className="faq-links">
              <Link to="/information" className="faq-link">
                如何取消或修改訂單？
              </Link>
              <Link to="/information" className="faq-link">
                付款方式有哪些選擇？
              </Link>
              <Link to="/information" className="faq-link">
                如何查詢我的訂單狀態？
              </Link>
              <Link to="/information" className="faq-link">
                查看更多常見問題 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
