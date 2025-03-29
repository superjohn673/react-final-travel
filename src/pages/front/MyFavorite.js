import { useContext } from "react";
import { AppContext } from "../../store/AppContext";
import { FaHeart, FaCalendarAlt, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatNumberWithCommas } from "../../utils/helpers";

const MyFavorite = () => {
  const { favorites, removeFromFavorites } = useContext(AppContext);

  return (
    <div className="favorite-section">
      <div className="card">
        <div className="card-header">
          <h5>
            <FaHeart className="me-2" /> 我的最愛
          </h5>
        </div>
        <div className="card-body">
          {favorites.length === 0 && (
            <div className="empty-favorites">
              <FaHeart size={60} />
              <p className="mb-0">您的收藏列表是空的</p>
              <Link to="/" className="btn-explore">
                開始探索旅遊行程
              </Link>
            </div>
          )}

          {favorites.length > 0 && (
            <div className="favorite-grid">
              {favorites.map((product) => (
                <div className="favorite-item" key={product.id}>
                  <div className="favorite-image">
                    <img src={product.imageUrl} alt={product.title} />
                  </div>
                  <div className="favorite-badge">熱門行程</div>
                  <div className="favorite-content">
                    <h5>{product.title}</h5>
                    <div className="favorite-info">
                      <FaCalendarAlt />
                      <span>07/02, 07/27, 08/06, 09/03...</span>
                    </div>
                    <div className="favorite-price">
                      NT$ {formatNumberWithCommas(product.price)}
                    </div>
                  </div>
                  <div className="favorite-actions">
                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-cart"
                    >
                      <FaEye /> 查看行程內容
                    </Link>
                    <button
                      className="btn btn-remove"
                      onClick={() => removeFromFavorites(product.id)}
                    >
                      <FaTrashAlt /> 移除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFavorite;
