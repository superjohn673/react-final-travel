import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AppContext } from "../../store/AppContext";
import { formatNumberWithCommas } from "../../utils/helpers";

const ThemeJapan = () => {
  const { theme } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const {
    products,
    getAllProducts,
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        await getAllProducts();
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [getAllProducts]);

  const themeMap = {
    "classic-japan": "經典",
    "shop-japan": "美學",
    "rail-japan": "鐵道",
    "vibe-japan": "深度",
  };
  const cities = ["關東", "關西", "北海道", "東北", "北陸", "九州"];

  // 直接計算過濾後的產品列表
  const filterThemeProducts = products.filter((product) =>
    cities.some((city) => product.category === `${themeMap[theme]}${city}`)
  );

  const handleFavorite = (product) => {
    if (favorites && favorites.some((item) => item.id === product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <>
      {" "}
      <Loading isLoading={isLoading} />
      <div className="row tour">
        {filterThemeProducts.map((product) => {
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
                    className="card-img-top object-cover"
                    height={300}
                    alt={product.title}
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
                        <span className="tour__price">
                          NT$ {formatNumberWithCommas(product.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ThemeJapan;
