import React, { useEffect, useState, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// import axios from "axios";
// import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import { AppContext } from "../../store/AppContext";

const AreaJapan = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
  //   setPagination(productRes.data.pagination);
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
      <div className="container mt-md-5 mt-3 mb-7 ">
        <div className="mb-3">
          <h4 className="text-center">日本地區之旅</h4>
        </div>
        <div className="row justify-content-center mb-7">
          <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
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
          <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
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
          <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
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
          <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
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
          <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
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
          <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
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
        {/* <div className="row">
          {products.map((product) => {
            return (
              // <div className="col-md-3" key={product.id}>
              //   <div className="card border-0 mb-4 position-relative position-relative">
              //     <img
              //       src={product.imageUrl}
              //       className="card-img-top rounded-0 object-cover"
              //       height={300}
              //       alt="..."
              //     />
              //     <div className="card-body p-0">
              //       <h4 className="mb-0 mt-2">
              //         <Link to={`/product/${product.id}`}>{product.title}</Link>
              //       </h4>
              //       <p className="card-text text-muted mb-0">
              //         {product.content}
              //       </p>
              //       <p className="text-muted mt-1">NT$ {product.price}</p>
              //     </div>
              //   </div>
              // </div>
              <div className="col-md-6" key={product.id}>
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.imageUrl}
                          className="img-fluid rounded-start"
                          alt="..."
                        />
                      </Link>
                    </div>
                    <div className="col-md-8">
                      <Link to={`/product/${product.id}`}>
                        <div className="card-body h-100">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text">{product.content}</p>
                          <p className="text-muted mt-1">NT$ {product.price}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}
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

export default AreaJapan;
