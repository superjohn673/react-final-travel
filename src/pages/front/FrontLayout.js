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
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      <Navbar cartData={cartData} />
      <Outlet context={{ getCart, cartData }}></Outlet>
      <div className="bg-dark py-3">
        <div className="container p-2">
          <div className="footer row justify-content-between align-items-center text-white py-5">
            <div className="col-lg-3 mb-2 ">
              <ul className=" list-unstyled mb-0  ms-5">
                <li className="mb-3">
                  <Link className="text-white mx-3 link" to="/location">
                    <span className="footer__about">服務據點</span>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="text-white mx-3 link " to="/information">
                    <span className="footer__about">常見問題</span>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="text-white mx-3 link" to="/contact">
                    <span className="footer__about">聯絡我們</span>
                  </Link>
                </li>
                <li>
                  <Link className="text-white mx-3 link" to="/login">
                    <span className="footer__about">後台登入</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 mb-2 ">
              {" "}
              <ul className="d-flex justify-content-end list-unstyled mb-0 h4 ">
                <li>
                  <Link
                    to="https://www.facebook.com/"
                    className="text-white mx-3"
                  >
                    <i class="fa-brands fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.instagram.com/"
                    className="text-white mx-3"
                  >
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link className="text-white ms-3">
                    <i className="fab fa-line"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 mb-2 ">
              {" "}
              <p className="mb-0 text-end">
                Copyright © 2020 Shiba Travel Co.,Ltd All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontLayout;
