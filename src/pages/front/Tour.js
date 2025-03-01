import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import tourDefaultImg from "../../assets/images/tour/tour-default.jpg";
import tourClassicImg from "../../assets/images/tour/tour-classic.jpg";
import tourShopImg from "../../assets/images/tour/tour-shop.jpg";
import tourRailImg from "../../assets/images/tour/tour-rail.jpg";
import tourVibeImg from "../../assets/images/tour/tour-vibe.jpg";

const Tour = () => {
  const [imageUrl, setImageUrl] = useState(tourDefaultImg);
  const location = useLocation();

  const tourData = [
    {
      path: "/tour/classic-japan",
      image: tourClassicImg,
      title: "經典之旅",
    },
    {
      path: "/tour/shop-japan",
      image: tourShopImg,
      title: "美學之旅",
    },
    {
      path: "/tour/rail-japan",
      image: tourRailImg,
      title: "鐵道之旅",
    },
    {
      path: "/tour/vibe-japan",
      image: tourVibeImg,
      title: "深度之旅",
    },
  ];

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
      <div className="bg-light">
        <div className="container">
          <img
            className="img-fluid d-none d-md-block "
            src={imageUrl}
            alt="日本主題之旅"
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
          {tourData.map((tour) => (
            <div key={tour.path} className="col-md-6 col-lg-3 text-center">
              <Link
                to={tour.path}
                className="link"
                onMouseDown={() => handleImageChange(tour.image)}
              >
                <h6 className={getLinkClass(tour.path)}>{tour.title}</h6>
              </Link>
            </div>
          ))}
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
