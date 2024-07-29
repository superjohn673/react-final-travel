// Sidebar.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TravelSearchForm from "./TravelSearchForm";

const Sidebar = ({ isOpen, onToggle }) => {
  useEffect(() => {
    const handleScroll = (e) => {
      if (isOpen) {
        e.preventDefault();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", handleScroll, { passive: false });
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleScroll, { passive: false });
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleScroll, { passive: false });
    };
  }, [isOpen]);
  return (
    <>
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "70vw",
          height: "100%",
          backgroundColor: "#f1f1f1",
          padding: "20px",
          transition: "all 1s ease",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          zIndex: 999,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button className="btn" style={{ width: "5rem" }} onClick={onToggle}>
          <i
            class="bi bi-x"
            style={{
              fontSize: "3rem",
            }}
          ></i>
        </button>
        <div className="container px-5">
          <div className="row mt-4 mb-3  side-link justify-content-between">
            <div className="  mb-3">
              <Link to="member/orders" className="link" onClick={onToggle}>
                <i class="fa-solid fa-user me-2"></i>
                <span>會員專區</span>
              </Link>
            </div>
            <TravelSearchForm
              onToggle={onToggle}
              className="d-none d-md-block"
            ></TravelSearchForm>
            <div>
              {" "}
              <h5
                className="mb-3 border-bottom"
                style={{ color: "rgb(126, 104, 7)", fontWeight: "bold" }}
              >
                地區之旅
              </h5>
            </div>
            <div className="col-md-2  mb-2" onClick={onToggle}>
              <Link to="area-japan/kanto" className="link">
                <h4>關東</h4>
              </Link>
            </div>
            <div className="col-md-2  mb-2" onClick={onToggle}>
              <Link to="area-japan/kansai" className="link">
                <h4>關西</h4>
              </Link>
            </div>
            <div className="col-md-2  mb-2" onClick={onToggle}>
              <Link to="area-japan/hokkaido" className="link">
                <h4>北海道</h4>
              </Link>
            </div>
            <div className="col-md-2  mb-2" onClick={onToggle}>
              <Link to="area-japan/tohoku" className="link">
                <h4>東北</h4>
              </Link>
            </div>
            <div className="col-md-2  mb-2" onClick={onToggle}>
              <Link to="area-japan/hokuriku" className="link">
                <h4>北陸</h4>
              </Link>
            </div>
            <div className="col-md-2  mb-2" onClick={onToggle}>
              <Link to="area-japan/kyushu" className="link">
                <h4>九州</h4>
              </Link>
            </div>
          </div>
          <div className="row mb-3  side-link justify-content-between">
            <div>
              {" "}
              <h5
                className="mb-3 border-bottom"
                style={{ color: "rgb(126, 104, 7)", fontWeight: "bold" }}
              >
                主題之旅
              </h5>
            </div>
            <div className="col-md-3  mb-2" onClick={onToggle}>
              <Link to="tour/classic-japan" className="link">
                <h4>經典之旅</h4>
              </Link>
            </div>
            <div className="col-md-3  mb-2" onClick={onToggle}>
              <Link to="tour/shop-japan" className="link">
                <h4>美學之旅</h4>
              </Link>
            </div>
            <div className="col-md-3  mb-2" onClick={onToggle}>
              <Link to="tour/rail-japan" className="link">
                <h4>鐵道之旅</h4>
              </Link>
            </div>
            <div className="col-md-3  mb-2" onClick={onToggle}>
              <Link to="tour/vibe-japan" className="link">
                <h4>深度之旅</h4>
              </Link>
            </div>
          </div>
          <div className="row mb-3  side-link justify-content-between">
            <div>
              {" "}
              <h5
                className="mb-3 border-bottom"
                style={{ color: "rgb(126, 104, 7)", fontWeight: "bold" }}
              >
                季節之旅
              </h5>
            </div>
            <div className="col-md-3  mb-2" onClick={onToggle}>
              <Link to="season-japan/spring" className="link">
                <h4>春季之旅</h4>
              </Link>
            </div>
            <div className="col-md-3  mb-2" onClick={onToggle}>
              <Link to="season-japan/summer" className="link">
                <h4>夏季之旅</h4>
              </Link>
            </div>
            <div className="col-md-3  mb-2" onClick={onToggle}>
              <Link to="season-japan/fall" className="link">
                <h4>秋季之旅</h4>
              </Link>
            </div>
            <div className="col-md-3  mb-2" onClick={onToggle}>
              <Link to="season-japan/winter" className="link">
                <h4>冬季之旅</h4>
              </Link>
            </div>
          </div>
          <div className="row mb-5  side-link justify-content-between">
            <div>
              {" "}
              <h5
                className="mb-3 border-bottom"
                style={{ color: "rgb(126, 104, 7)", fontWeight: "bold" }}
              >
                精選之旅
              </h5>
            </div>
            <div className="col-md-2  mb-2" onClick={onToggle}>
              <Link to="/product/-Nzf__o2dpmQ_VfkPwnw" className="link">
                <h4>美食饗宴</h4>
              </Link>
            </div>
            <div className="col-md-2  mb-2" onClick={onToggle}>
              <Link to="/product/-Nzf_nF5zhwOzwl2z_hi" className="link">
                <h4>咖啡品味</h4>
              </Link>
            </div>
            <div className="col-md-2  mb-2" onClick={onToggle}>
              <Link to="/product/-Nzf_yFq40JTwB0WB4-V" className="link">
                <h4>寺廟之旅</h4>
              </Link>
            </div>
            <div className="col-md-2  mb-2" onClick={onToggle}>
              <Link to="/product/-Nzfa9hKlZ5znzway6Ni" className="link">
                <h4>購物之都</h4>
              </Link>
            </div>
            <div className="col-md-2  mb-2" onClick={onToggle}>
              <Link to="/product/-O-5Hoy0jCcQdrdh9lCY" className="link">
                <h4>滑雪勝地</h4>
              </Link>
            </div>
            <div className="col-md-2  mb-2" onClick={onToggle}>
              <Link to="/product/-NzfaHOVNwBYrJ18yzZd" className="link">
                <h4>環球影城</h4>
              </Link>
            </div>
          </div>
          <div
            className="row  side-link flex-column"
            style={{ marginTop: "auto" }}
          >
            <div className="col-md-3  mb-3" onClick={onToggle}>
              <Link className="link" to="/location">
                <h5>服務據點</h5>
              </Link>
            </div>
            <div className="col-md-3  mb-3" onClick={onToggle}>
              <Link className="link" to="/information">
                <h5>常見問題</h5>
              </Link>
            </div>
            <div className="col-md-3  mb-3" onClick={onToggle}>
              <Link className="link" to="/contact">
                <h5>聯絡我們</h5>
              </Link>
            </div>
            <div className="col-md-3  mb-3" onClick={onToggle}>
              <Link className="link" to="login">
                <h5>後台登入</h5>
              </Link>
            </div>
          </div>
          <div className="row  py-6 side-link">
            <div className="col-md-1  mb-2">
              <Link className="link">
                <i
                  class="fa-brands fa-facebook"
                  style={{ color: "rgb(126, 104, 7)" }}
                ></i>
              </Link>
            </div>
            <div className="col-md-1  mb-2">
              <Link className="link">
                <i
                  className="fab fa-instagram"
                  style={{ color: "rgb(126, 104, 7)" }}
                ></i>
              </Link>
            </div>
            <div className="col-md-1  mb-2">
              <Link className="link">
                <i
                  className="fab fa-line"
                  style={{ color: "rgb(126, 104, 7)" }}
                ></i>
              </Link>
            </div>
            <div className="col-md-1  mb-2">
              <Link className="link">
                <i
                  class="bi bi-telephone-fill"
                  style={{ color: "rgb(126, 104, 7)" }}
                ></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
            pointerEvents: "auto",
          }}
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;
