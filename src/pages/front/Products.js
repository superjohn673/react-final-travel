import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setLoading] = useState(false);

  const getProducts = async (page = 1) => {
    setLoading(true);
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );
    console.log(productRes);
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="container mt-md-5 mt-3 mb-7">
        <Loading isLoading={isLoading} />
        <div>
          <p className="text-center">焦點行程</p>
        </div>
        <div className="row justify-content-around mb-7">
          <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
            <Link className="link">
              <div
                className="product-head-section__img d-flex justify-content-center align-items-center"
                style={{
                  backgroundImage:
                    "URL('https://images.unsplash.com/photo-1573806439793-82aa612294b2?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <p className=" product-head-section__title">關東</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
            <Link className="link">
              <div
                className="product-head-section__img d-flex justify-content-center align-items-center"
                style={{
                  backgroundImage:
                    "URL('https://images.unsplash.com/photo-1667560615919-837fe9001e58?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <p className=" product-head-section__title">關西</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
            <Link className="link">
              <div
                className="product-head-section__img d-flex justify-content-center align-items-center"
                style={{
                  backgroundImage:
                    "URL('https://images.unsplash.com/photo-1601823984263-b87b59798b70?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <p className=" product-head-section__title">北海道</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
            <Link className="link">
              <div
                className="product-head-section__img d-flex justify-content-center align-items-center"
                style={{
                  backgroundImage:
                    "URL('https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <p className=" product-head-section__title">東北</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
            <Link className="link">
              <div
                className="product-head-section__img d-flex justify-content-center align-items-center"
                style={{
                  backgroundImage:
                    "URL('https://images.unsplash.com/photo-1610971250019-f677bc1300be?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <p className=" product-head-section__title">北陸 中部</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
            <Link className="link">
              <div
                className="product-head-section__img d-flex justify-content-center align-items-center"
                style={{
                  backgroundImage:
                    "URL('https://images.unsplash.com/photo-1543473111-ac6e23fcd158?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <p className=" product-head-section__title">九州</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="row">
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
        </div>
        <nav className="d-flex justify-content-center">
          <Pagination
            changePage={getProducts}
            pagination={pagination}
          ></Pagination>
        </nav>
      </div>
    </>
  );
};

export default Products;
