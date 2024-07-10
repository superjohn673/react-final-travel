import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  FaUser,
  FaListAlt,
  FaMoneyBillAlt,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";

const MemberLayout = () => {
  return (
    <div className="container my-5">
      <div className="row ">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">會員中心</h5>
            </div>
            <div className="list-group list-group-flush">
              <Link
                to="/member/profile"
                className="list-group-item list-group-item-action d-flex align-items-center"
              >
                <FaUser className="me-2" />
                個人資料
              </Link>
              <Link
                to="/member/orders"
                className="list-group-item list-group-item-action d-flex align-items-center"
              >
                <FaListAlt className="me-2" />
                我的訂單
              </Link>
              <Link
                to="/member/favorite"
                className="list-group-item list-group-item-action d-flex align-items-center"
              >
                <FaHeart className="me-2" />
                我的最愛
              </Link>
              {/* <Link
                to="/logout"
                className="list-group-item list-group-item-action d-flex align-items-center"
              >
                <FaSignOutAlt className="me-2" />
                登出
              </Link> */}
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MemberLayout;
