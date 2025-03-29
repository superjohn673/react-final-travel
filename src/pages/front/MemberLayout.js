import { Outlet, Link, useLocation } from "react-router-dom";
import { FaUser, FaListAlt, FaHeart } from "react-icons/fa";

const MemberLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="container member-layout">
      <div className="row">
        <div className="col-md-3 member-sidebar">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">會員中心</h5>
            </div>
            <div className="list-group list-group-flush">
              <Link
                to="/member/profile"
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  currentPath === "/member/profile" ? "active" : ""
                }`}
              >
                <FaUser className="me-2" />
                個人資料
              </Link>
              <Link
                to="/member/orders"
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  currentPath === "/member/orders" ||
                  currentPath.includes("/member/orders/")
                    ? "active"
                    : ""
                }`}
              >
                <FaListAlt className="me-2" />
                我的訂單
              </Link>
              <Link
                to="/member/favorite"
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  currentPath === "/member/favorite" ? "active" : ""
                }`}
              >
                <FaHeart className="me-2" />
                我的最愛
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-9 member-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MemberLayout;
