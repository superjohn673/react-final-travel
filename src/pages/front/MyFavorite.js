import { useContext } from "react";
import { AppContext } from "../../store/AppContext";
import { FaHeart } from "react-icons/fa";

const MyFavorite = () => {
  const { favorites, removeFromFavorites } = useContext(AppContext);

  return (
    <div className="container my-5">
      <p className="fs-4 text-center fw-bold mb-4">我的最愛</p>

      <div className="row ">
        {favorites.map((product) => (
          <div className="col-sm-6 col-lg-4 mb-5" key={product.id}>
            <div className="card border-1 mb-4 position-relative h-100">
              <img
                src={product.imageUrl}
                className="card-img-top rounded-1 object-cover"
                height={300}
                alt="..."
              />
              <div className="card-body p-2 d-flex flex-column justify-content-between">
                <h5 className="mb-0 mt-2 card-title tour__name">
                  {product.title}
                </h5>
                <div className="row justify-content-between ">
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
              <div
                className="position-absolute top-0 end-0 m-2 text-danger"
                onClick={() => removeFromFavorites(product.id)}
              >
                <FaHeart size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorite;
