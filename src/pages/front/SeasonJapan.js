import React, { useEffect, useState, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// import axios from "axios";
// import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import { AppContext } from "../../store/AppContext";

const SeasonJapan = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1652477654607-6399bf4cd0b1?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const { isLoading } = useContext(AppContext);
  const location = useLocation();

  // const [products, setProducts] = useState([]);
  // const [pagination, setPagination] = useState({});
  // const [isLoading, setLoading] = useState(false);

  // const getProducts = async (page = 1) => {
  //   setLoading(true);
  //   const productRes = await axios.get(
  //     `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
  //   );
  //   console.log(productRes);
  //   setProducts(productRes.data.products);
  //   // setPagination(productRes.data.pagination);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);

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
          <h4 className="text-center">日本季節之旅</h4>
        </div>
        <div className="row justify-content-center mb-7">
          <div className="col-md-6 col-lg-3 text-center">
            <Link
              to="/season-japan/spring"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1702822244908-e97f1fc58cae?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/season-japan/spring")}>春季旅遊</h6>
            </Link>
          </div>
          <div className="col-md-6 col-lg-3 text-center">
            <Link
              to="/season-japan/summer"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/season-japan/summer")}>夏季旅遊</h6>
            </Link>
          </div>
          <div className="col-md-6 col-lg-3 text-center">
            <Link
              to="/season-japan/fall"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/season-japan/fall")}>秋季旅遊</h6>
            </Link>
          </div>
          <div className="col-md-6 col-lg-3 text-center">
            <Link
              to="/season-japan/winter"
              className="link"
              onMouseDown={() =>
                handleImageChange(
                  "https://images.unsplash.com/photo-1694155009855-c13043ec2a9c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            >
              <h6 className={getLinkClass("/season-japan/winter")}>冬季旅遊</h6>
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

export default SeasonJapan;
