import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../../components/NavBar";
import axios from "axios";
import Loading from "../../components/Loading";

const FrontLayout = () => {
  const [cartData, setCartData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getCart = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      setCartData(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("獲取購物車資料失敗:", error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <Loading isLoading={isLoading} />
      <Navbar cartData={cartData} />
      <Outlet context={{ getCart, cartData }}></Outlet>
      <footer className="footer-section">
        <div className="footer-top py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div className="footer-logo mb-4">
                  <h3 className="text-white">柴犬旅遊</h3>
                </div>
                <p className="footer-description">
                  提供最優質的旅遊體驗，讓您的每一次旅行都充滿美好回憶。
                </p>
                <div className="footer-social mt-4">
                  <Link to="https://www.facebook.com/" className="social-icon">
                    <i className="fa-brands fa-facebook-f"></i>
                  </Link>
                  <Link to="https://www.instagram.com/" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </Link>
                  <Link to="#" className="social-icon">
                    <i className="fab fa-line"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                <h4 className="footer-title">快速連結</h4>
                <ul className="footer-links">
                  <li>
                    <Link to="/location" className="footer-link">
                      <i className="fas fa-map-marker-alt me-2"></i>服務據點
                    </Link>
                  </li>
                  <li>
                    <Link to="/information" className="footer-link">
                      <i className="fas fa-question-circle me-2"></i>常見問題
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="footer-link">
                      <i className="fas fa-envelope me-2"></i>聯絡我們
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="footer-link">
                      <i className="fas fa-user-lock me-2"></i>後台登入
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                <h4 className="footer-title">熱門目的地</h4>
                <ul className="footer-links">
                  <li>
                    <Link to="/area-japan/kanto" className="footer-link">
                      <i className="fas fa-plane-departure me-2"></i>東京
                    </Link>
                  </li>
                  <li>
                    <Link to="/area-japan/kansai" className="footer-link">
                      <i className="fas fa-plane-departure me-2"></i>大阪
                    </Link>
                  </li>
                  <li>
                    <Link to="/area-japan/hokkaido" className="footer-link">
                      <i className="fas fa-plane-departure me-2"></i>北海道
                    </Link>
                  </li>
                  <li>
                    <Link to="/area-japan/tohoku" className="footer-link">
                      <i className="fas fa-plane-departure me-2"></i>東北
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="footer-title">聯絡資訊</h4>
                <ul className="footer-contact">
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>台北市中山區南京東路三段219號5樓</span>
                  </li>
                  <li>
                    <i className="fas fa-phone"></i>
                    <span>02-2712-0589</span>
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <span>service@shibatravel.com</span>
                  </li>
                  <li>
                    <i className="fas fa-clock"></i>
                    <span>週一至週五 9:00-18:00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom py-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="copyright mb-0">
                  Copyright © 2020 Shiba Travel Co.,Ltd All Rights Reserved.
                </p>
              </div>
              <div className="col-md-6">
                <div className="footer-payment text-md-end">
                  <span className="me-3">支付方式:</span>
                  <i className="fab fa-cc-visa mx-1"></i>
                  <i className="fab fa-cc-mastercard mx-1"></i>
                  <i className="fab fa-cc-jcb mx-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrontLayout;
