import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Sidebar from "./SideBar";

const NavBar = ({ cartData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNavBar, setShowNavBar] = useState(false);
  const [_isSmallScreen, setIsSmallScreen] = useState(false);
  const [_isMediumScreen, setIsMediumScreen] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [closeCartPreviewTimer, setCloseCartPreviewTimer] = useState(null);
  const cartPreviewRef = useRef(null);
  const cartContainerRef = useRef(null);
  const location = useLocation(); // 獲取當前路徑

  // 檢查當前頁面是否應該禁用購物車預覽
  const shouldDisableCartPreview = () => {
    return (
      location.pathname.includes("/cart") ||
      location.pathname.includes("/checkout") ||
      location.pathname.includes("/success")
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 顯示購物車預覽
  const handleCartMouseEnter = () => {
    // 如果在購物車、結帳或成功頁面，不顯示預覽
    if (shouldDisableCartPreview()) {
      return;
    }

    if (closeCartPreviewTimer) {
      clearTimeout(closeCartPreviewTimer);
      setCloseCartPreviewTimer(null);
    }
    setShowCartPreview(true);
  };

  // 隱藏購物車預覽（延遲執行，避免滑鼠移動時立即消失）
  const handleCartMouseLeave = (e) => {
    // 如果在購物車、結帳或成功頁面，不處理預覽
    if (shouldDisableCartPreview()) {
      return;
    }

    // 檢查滑鼠是否移動到預覽區塊或購物車容器
    if (
      (cartPreviewRef.current &&
        cartPreviewRef.current.contains(e.relatedTarget)) ||
      (cartContainerRef.current &&
        cartContainerRef.current.contains(e.relatedTarget))
    ) {
      return; // 如果滑鼠移動到預覽區塊或購物車容器內，不隱藏預覽
    }

    const timer = setTimeout(() => {
      setShowCartPreview(false);
    }, 500); // 增加延遲時間到500毫秒，給用戶更多時間移動到預覽區塊
    setCloseCartPreviewTimer(timer);
  };

  // 計算總金額
  const calculateTotal = (item) => {
    const adultQty = parseInt(
      localStorage.getItem("adultQuantityStorage") || 0
    );
    const childrenQty = parseInt(
      localStorage.getItem("childrenQuantityStorage") || 0
    );
    const adultPrice = item.product.price || 0;
    const childrenPrice = item.product.price * 0.8 || 0; // 假設兒童價格為成人的80%

    return (
      "NT$ " +
      (adultQty * adultPrice + childrenQty * childrenPrice).toLocaleString()
    );
  };

  // 格式化日期顯示
  const formatDate = (dateString) => {
    if (!dateString || dateString === "未選擇") return "未選擇";

    try {
      const date = new Date(dateString);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    } catch (e) {
      return dateString;
    }
  };

  // 格式化人數顯示
  const formatPeople = () => {
    const adultQty = parseInt(
      localStorage.getItem("adultQuantityStorage") || 0
    );
    const childrenQty = parseInt(
      localStorage.getItem("childrenQuantityStorage") || 0
    );

    if (childrenQty === 0) {
      return `${adultQty} 大人`;
    } else {
      return `${adultQty} 大人, ${childrenQty} 小孩`;
    }
  };

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        const navbarHeight = navbar.offsetHeight;
        document.documentElement.style.setProperty(
          "--navbar-height",
          `${navbarHeight}px`
        );
      }
    };

    // 監聽視窗大小改變
    window.addEventListener("resize", updateNavbarHeight);
    // 初始化設定
    updateNavbarHeight();

    return () => {
      window.removeEventListener("resize", updateNavbarHeight);
      if (closeCartPreviewTimer) {
        clearTimeout(closeCartPreviewTimer);
      }
    };
  }, [closeCartPreviewTimer]);

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        const navbarHeight = navbar.offsetHeight;
        document.documentElement.style.setProperty(
          "--navbar-height",
          `${navbarHeight}px`
        );
      }
    };

    // 監聽視窗大小改變
    window.addEventListener("resize", updateNavbarHeight);
    // 初始化設定
    updateNavbarHeight();

    return () => {
      window.removeEventListener("resize", updateNavbarHeight);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowNavBar(false);
      } else {
        setShowNavBar(true);
      }
    };

    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width < 768);
      setIsMediumScreen(width >= 768 && width < 992);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize(); // 初始化螢幕尺寸狀態

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 點擊外部關閉購物車預覽
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showCartPreview &&
        cartPreviewRef.current &&
        !cartPreviewRef.current.contains(event.target) &&
        !event.target.closest(".cart-container")
      ) {
        setShowCartPreview(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCartPreview]);

  return (
    <div
      className={`bg-white sticky-top ${showNavBar ? "show" : "hide"}`}
      style={{ transition: "top 0.3s" }}
    >
      <div className="container-fluid navbar-container">
        <nav className="navbar px-3 navbar-expand-lg navbar-light d-flex justify-content-between">
          <div className="">
            <button
              className="navbar-toggler d-md-none nav-item"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={toggleSidebar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="d-none d-md-block">
              <NavLink
                className="nav-link ps-0 nav-item"
                onClick={toggleSidebar}
              >
                <i className="bi bi-list menu-icon"></i>
              </NavLink>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <NavLink className="navbar-brand" to="/">
              Shiba Travel
            </NavLink>
          </div>
          <div className="cart-container" ref={cartContainerRef}>
            <div
              className="position-relative cart-trigger"
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
            >
              <NavLink
                to="/cart"
                className="nav-link position-relative nav-item"
              >
                <i className="bi bi-bag-fill cart-icon"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-badge">
                  {cartData?.carts?.length > 0 ? cartData?.carts?.length : ""}
                </span>
              </NavLink>

              {/* 購物車預覽 - 只在非購物車相關頁面顯示 */}
              {showCartPreview && !shouldDisableCartPreview() && (
                <div
                  ref={cartPreviewRef}
                  className="cart-preview"
                  onMouseEnter={handleCartMouseEnter}
                  onMouseLeave={handleCartMouseLeave}
                >
                  {!cartData?.carts || cartData?.carts?.length === 0 ? (
                    <div className="cart-preview__empty">
                      <i className="bi bi-bag-x cart-preview__icon"></i>
                      <p>尚未選擇行程</p>
                      <NavLink
                        to="/area-japan/kanto"
                        className="cart-preview__link"
                      >
                        立即選擇
                      </NavLink>
                    </div>
                  ) : (
                    <div className="cart-preview__content">
                      <div className="cart-preview__header">
                        <h6>購物車內容</h6>
                      </div>
                      {cartData?.carts?.map((item) => (
                        <div key={item.id} className="cart-preview__item">
                          <div className="cart-preview__image">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.title}
                            />
                          </div>
                          <div className="cart-preview__info">
                            <h6 className="cart-preview__title">
                              {item.product.title}
                            </h6>
                            <div className="cart-preview__details">
                              <div className="cart-preview__detail-item">
                                <i className="bi bi-calendar3"></i>
                                <span>
                                  {formatDate(
                                    localStorage.getItem("selectedDateStorage")
                                  )}
                                </span>
                              </div>
                              <div className="cart-preview__detail-item">
                                <i className="bi bi-people"></i>
                                <span>{formatPeople()}</span>
                              </div>
                              <div className="cart-preview__detail-item cart-preview__price">
                                <span>{calculateTotal(item)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <NavLink to="/cart" className="cart-preview__checkout">
                        前往結帳
                      </NavLink>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    </div>
  );
};

export default NavBar;
