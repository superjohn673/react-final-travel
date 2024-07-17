import React, { useEffect, useState, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { AppContext } from "../../store/AppContext";

const AreaJapan = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
      <div className="container mt-md-5 mt-3 mb-7 ">
        <div className="mb-3">
          <h4 className="text-center">日本地區之旅</h4>
        </div>
        <div className="row justify-content-center mb-7">
          <div className=" col-lg-4 text-center">
            <Link
              to="/area-japan/kanto"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/area-japan/kanto")}>關東</h6>
            </Link>
          </div>
          <div className=" col-lg-4 text-center">
            <Link
              to="/area-japan/kansai"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://plus.unsplash.com/premium_photo-1664474450942-fcdaf3930b55?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/area-japan/kansai")}>關西</h6>
            </Link>
          </div>
          <div className=" col-lg-4 text-center">
            <Link
              to="/area-japan/hokkaido"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1650377080454-141d3fd5a43d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/area-japan/hokkaido")}>北海道</h6>
            </Link>
          </div>
          <div className=" col-lg-4 text-center">
            <Link
              to="/area-japan/tohoku"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1598761494170-7d5fe80511e6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/area-japan/tohoku")}>東北</h6>
            </Link>
          </div>
          <div className=" col-lg-4 text-center">
            <Link
              to="/area-japan/hokuriku"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1559439080-b6037bc5f8fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/area-japan/hokuriku")}>
                北陸 中部
              </h6>
            </Link>
          </div>
          <div className=" col-lg-4 text-center">
            <Link
              to="/area-japan/kyushu"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1624517607344-edd8277b1ba3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/area-japan/kyushu")}>九州</h6>
            </Link>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default AreaJapan;
