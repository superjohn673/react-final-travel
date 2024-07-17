import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "./SideBar";

const NavBar = ({ cartData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNavBar, setShowNavBar] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize(); // 初始化 isSmallScreen 狀態

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
      <div className="container-fluid shadow">
        <nav className="navbar px-3 navbar-expand-lg navbar-light bg-white d-flex justify-content-between">
          <div className="">
            <button
              className="navbar-toggler"
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
            <div
              className={`collapse navbar-collapse bg-white custom-header-md-open ${
                isSmallScreen && isSidebarOpen ? "d-none" : ""
              }`}
              id="navbarNav"
            >
              <ul className="navbar-nav d-none d-md-block">
                <li className="nav-item active">
                  <NavLink
                    className="nav-link ps-0"
                    style={{ fontSize: "1.5rem" }}
                    onClick={toggleSidebar}
                  >
                    <i class="bi bi-list" style={{ fontSize: "2.5rem" }}></i>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="">
            <NavLink
              className="navbar-brand "
              to="/"
              style={{
                fontFamily: "Kalam",
                fontSize: "2rem",
              }}
            >
              Shiba Travel
            </NavLink>
          </div>
          <div className="">
            <div>
              <NavLink to="/cart" className="nav-link position-relative">
                <i className="bi bi-bag-fill"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
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
