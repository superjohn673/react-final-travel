import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
// import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AppContext } from "../../store/AppContext";

const ThemeJapan = () => {
  const { theme } = useParams();
  const [themeProducts, setThemeProducts] = useState([]);
  const {
    products,
    getAllProducts,
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useContext(AppContext);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    if (theme === "classic-japan") {
      const filterCityProducts = products.filter((product) => {
        return (
          product.category === "經典關東" ||
          product.category === "經典關西" ||
          product.category === "經典北海道" ||
          product.category === "經典東北" ||
          product.category === "經典北陸" ||
          product.category === "經典九州"
        );
      });
      setThemeProducts(filterCityProducts);
    } else if (theme === "shop-japan") {
      const filterCityProducts = products.filter((product) => {
        return (
          product.category === "美學關東" ||
          product.category === "美學關西" ||
          product.category === "美學北海道" ||
          product.category === "美學東北" ||
          product.category === "美學北陸" ||
          product.category === "美學九州"
        );
      });
      setThemeProducts(filterCityProducts);
    } else if (theme === "rail-japan") {
      const filterCityProducts = products.filter((product) => {
        return (
          product.category === "鐵道關東" ||
          product.category === "鐵道關西" ||
          product.category === "鐵道北海道" ||
          product.category === "鐵道東北" ||
          product.category === "鐵道北陸" ||
          product.category === "鐵道九州"
        );
      });
      setThemeProducts(filterCityProducts);
    } else if (theme === "vibe-japan") {
      const filterCityProducts = products.filter((product) => {
        return (
          product.category === "深度關東" ||
          product.category === "深度關西" ||
          product.category === "深度北海道" ||
          product.category === "深度東北" ||
          product.category === "深度北陸" ||
          product.category === "深度九州"
        );
      });
      setThemeProducts(filterCityProducts);
    }
  }, [products, theme]);

  const handleFavorite = (product) => {
    if (favorites && favorites.some((item) => item.id === product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="row tour">
      {themeProducts.map((product) => {
        const isFavorite = favorites.some((item) => item.id === product.id);
        return (
          <div className="col-md-6 col-lg-4 mb-4" key={product.id}>
            <div className="card border-1 mb-4 position-relative h-100">
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

export default ThemeJapan;
