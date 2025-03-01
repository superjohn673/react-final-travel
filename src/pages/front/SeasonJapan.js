import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import seasonDefaultImg from "../../assets/images/season/season-default.jpg";
import seasonSpringImg from "../../assets/images/season/season-spring.jpg";
import seasonSummerImg from "../../assets/images/season/season-summer.jpg";
import seasonFallImg from "../../assets/images/season/season-fall.jpg";
import seasonWinterImg from "../../assets/images/season/season-winter.jpg";

const SeasonJapan = () => {
  const [imageUrl, setImageUrl] = useState(seasonDefaultImg);
  const location = useLocation();

  const seasonData = [
    {
      path: "/season-japan/spring",
      image: seasonSpringImg,
      title: "春季旅遊",
    },
    {
      path: "/season-japan/summer",
      image: seasonSummerImg,
      title: "夏季旅遊",
    },
    {
      path: "/season-japan/fall",
      image: seasonFallImg,
      title: "秋季旅遊",
    },
    {
      path: "/season-japan/winter",
      image: seasonWinterImg,
      title: "冬季旅遊",
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
            alt="日本季節之旅"
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
          <h4 className="text-center">日本季節之旅</h4>
        </div>
        <div className="row justify-content-center mb-7">
          {seasonData.map((season) => (
            <div key={season.path} className="col-md-6 col-lg-3 text-center">
              <Link
                to={season.path}
                className="link"
                onMouseDown={() => handleImageChange(season.image)}
              >
                <h6 className={getLinkClass(season.path)}>{season.title}</h6>
              </Link>
            </div>
          ))}
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default SeasonJapan;
