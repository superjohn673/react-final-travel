import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "./SideBar";

const NavBar = ({ cartData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNavBar, setShowNavBar] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowNavBar(false);
      } else if (window.scrollY > lastScrollY) {
        setShowNavBar(false);
      } else if (window.scrollY < lastScrollY) {
        setShowNavBar(true);
      }
      lastScrollY = window.scrollY;
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
          <div className="">
            <div>
              <NavLink
                to="/cart"
                className="nav-link position-relative nav-item"
              >
                <i className="bi bi-bag-fill cart-icon"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-badge">
                  {cartData?.carts?.length}
                </span>
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    </div>
  );
};

export default NavBar;
