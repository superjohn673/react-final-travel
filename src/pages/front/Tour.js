import React, { useEffect, useState, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// import axios from "axios";
// import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import { AppContext } from "../../store/AppContext";

const Tour = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1505440484611-23c171ad6e96?q=80&w=1754&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const { isLoading } = useContext(AppContext);
  const location = useLocation();

  //點擊更換照片
  const handleImageChange = (newImageUrl) => {
    setImageUrl(newImageUrl);
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "product-head-list__title active"
      : "product-head-list__title";
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="bg-light">
        <div className="container">
          <img
            className="img-fluid d-none d-md-block "
            src={imageUrl}
            alt=""
            style={{
              minHeight: "500px",
              maxHeight: "650px",
              objectFit: "cover",
              width: "100%",
            }}
          />
        </div>
      </div>
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="mb-3">
          <h4 className="text-center">日本主題之旅</h4>
        </div>
        <div className="row justify-content-center mb-7">
          <div className="col-md-6 col-lg-3 text-center">
            <Link
              to="/tour/classic-japan"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?q=80&w=1684&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/tour/classic-japan")}>經典之旅</h6>
            </Link>
          </div>
          <div className="col-md-6 col-lg-3 text-center">
            <Link
              to="/tour/shop-japan"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/tour/shop-japan")}>美學之旅</h6>
            </Link>
          </div>
          <div className="col-md-6 col-lg-3 text-center">
            <Link
              to="/tour/rail-japan"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1618153231956-df23dcb21c07?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/tour/rail-japan")}>鐵道之旅</h6>
            </Link>
          </div>
          <div className="col-md-6 col-lg-3 text-center">
            <Link
              to="/tour/vibe-japan"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1541840518972-700a0bde0c6b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/tour/vibe-japan")}>深度之旅</h6>
            </Link>
          </div>
        </div>
        <Outlet></Outlet>
        {/* <nav className="d-flex justify-content-center">
          <Pagination
            changePage={getProducts}
            pagination={pagination}
          ></Pagination>
        </nav> */}
      </div>
    </>
  );
};

export default Tour;
