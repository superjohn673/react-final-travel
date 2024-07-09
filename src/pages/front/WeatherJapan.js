import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
// import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AppContext } from "../../store/AppContext";

const WeatherJapan = () => {
  const { season } = useParams();
  const [seasonProducts, setSeasonProducts] = useState([]);
  const {
    products,
    getAllProducts,
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useContext(AppContext);
  // const [products, setProducts] = useState([]);
  // const [pagination, setPagination] = useState({});
  // const [isLoading, setLoading] = useState(false);

  // const getProducts = async () => {
  //   setLoading(true);
  //   const productRes = await axios.get(
  //     `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
  //   );
  //   console.log(productRes);
  //   setProducts(productRes.data.products);
  //   // setPagination(productRes.data.pagination);
  //   setLoading(false);
  // };

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    if (season === "spring") {
      const filterCityProducts = products.filter((product) => {
        return product.category === "春季旅遊";
      });
      setSeasonProducts(filterCityProducts);
    } else if (season === "summer") {
      const filterCityProducts = products.filter((product) => {
        return product.category === "夏季旅遊";
      });
      setSeasonProducts(filterCityProducts);
    } else if (season === "fall") {
      const filterCityProducts = products.filter((product) => {
        return product.category === "秋季旅遊";
      });
      setSeasonProducts(filterCityProducts);
    } else if (season === "winter") {
      const filterCityProducts = products.filter((product) => {
        return product.category === "冬季旅遊";
      });
      setSeasonProducts(filterCityProducts);
    }
  }, [products, season]);

  const handleFavorite = (product) => {
    if (favorites && favorites.some((item) => item.id === product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  return (
    <div className="row tour">
      {seasonProducts.map((product) => {
        const isFavorite = favorites.some((item) => item.id === product.id);
        return (
          <div className="col-sm-6 col-md-4 mb-5" key={product.id}>
            <div className="card border-1 mb-4 position-relative">
              <div
                className="position-absolute top-0 end-0 m-2 text-danger"
                onClick={() => handleFavorite(product)}
              >
                {isFavorite ? (
                  <FaHeart size={20} className="text-danger" />
                ) : (
                  <FaRegHeart size={20} className="text-white" />
                )}
              </div>
              <Link className="link" to={`/product/${product.id}`}>
                <img
                  src={product.imageUrl}
                  className="card-img-top rounded-1 object-cover"
                  height={300}
                  alt="..."
                />

                <div className="card-body p-2">
                  <h5 className="mb-0 mt-2 card-title tour__name">
                    {product.title}
                  </h5>
                  <div className="row justify-content-between mt-3">
                    <div className="col-md-8 ">
                      <i className="bi bi-calendar2-date-fill text-muted"></i>
                      <span className="ms-2 text-muted">
                        07/02, 07/27, 08/06, 09/03...
                      </span>
                    </div>
                    <div className=" col-md-4 text-end ">
                      <span className="tour__price">NT$ {product.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherJapan;
