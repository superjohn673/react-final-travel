import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import defaultImg from "../../assets/images/area/area-default.jpg";
import hokkaidoImg from "../../assets/images/area/area-hokkaido.jpg";
import kantoImg from "../../assets/images/area/area-kanto.jpg";
import kansaiImg from "../../assets/images/area/area-kansai.jpg";
import kyushuImg from "../../assets/images/area/area-kyushu.jpg";
import tohokuImg from "../../assets/images/area/area-tohoku.jpg";
import hokurikuImg from "../../assets/images/area/area-hokuriku.jpg";

const AreaJapan = () => {
  const [imageUrl, setImageUrl] = useState(defaultImg);
  const location = useLocation();

  const areaData = [
    {
      path: "/area-japan/kanto",
      image: kantoImg,
      title: "關東",
    },
    {
      path: "/area-japan/kansai",
      image: kansaiImg,
      title: "關西",
    },
    {
      path: "/area-japan/hokkaido",
      image: hokkaidoImg,
      title: "北海道",
    },
    {
      path: "/area-japan/tohoku",
      image: tohokuImg,
      title: "東北",
    },
    {
      path: "/area-japan/hokuriku",
      image: hokurikuImg,
      title: "北陸 中部",
    },
    {
      path: "/area-japan/kyushu",
      image: kyushuImg,
      title: "九州",
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
            alt="日本地區之旅"
            style={{
              minHeight: "500px",
              maxHeight: "650px",
              objectFit: "cover",
              width: "100%",
            }}
          />
        </div>
      </div>
      <div className="container mt-md-5 mt-3 mb-7 ">
        <div className="mb-3">
          <h4 className="text-center">日本地區之旅</h4>
        </div>
        <div className="row justify-content-center mb-7">
          {areaData.map((area) => (
            <div key={area.path} className="col-lg-4 text-center">
              <Link
                to={area.path}
                className="link"
                onMouseDown={() => handleImageChange(area.image)}
              >
                <h6 className={getLinkClass(area.path)}>{area.title}</h6>
              </Link>
            </div>
          ))}
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default AreaJapan;
