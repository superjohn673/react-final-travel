// Sidebar.js
import React, { useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import TravelSearchForm from "./TravelSearchForm";

// 菜單數據
const MENU_DATA = {
  areas: [
    { path: "area-japan/kanto", label: "關東" },
    { path: "area-japan/kansai", label: "關西" },
    { path: "area-japan/hokkaido", label: "北海道" },
    { path: "area-japan/tohoku", label: "東北" },
    { path: "area-japan/hokuriku", label: "北陸" },
    { path: "area-japan/kyushu", label: "九州" },
  ],
  themes: [
    { path: "tour/classic-japan", label: "經典之旅" },
    { path: "tour/shop-japan", label: "美學之旅" },
    { path: "tour/rail-japan", label: "鐵道之旅" },
    { path: "tour/vibe-japan", label: "深度之旅" },
  ],
  seasons: [
    { path: "season-japan/spring", label: "春季之旅" },
    { path: "season-japan/summer", label: "夏季之旅" },
    { path: "season-japan/fall", label: "秋季之旅" },
    { path: "season-japan/winter", label: "冬季之旅" },
  ],
  featured: [
    { path: "/product/-Nzf__o2dpmQ_VfkPwnw", label: "美食饗宴" },
    { path: "/product/-Nzf_nF5zhwOzwl2z_hi", label: "咖啡品味" },
    { path: "/product/-Nzf_yFq40JTwB0WB4-V", label: "寺廟之旅" },
    { path: "/product/-Nzfa9hKlZ5znzway6Ni", label: "購物之都" },
    { path: "/product/-O-5Hoy0jCcQdrdh9lCY", label: "滑雪勝地" },
    { path: "/product/-NzfaHOVNwBYrJ18yzZd", label: "環球影城" },
  ],
  footer: [
    { path: "/location", label: "服務據點" },
    { path: "/information", label: "常見問題" },
    { path: "/contact", label: "聯絡我們" },
    { path: "login", label: "後台登入" },
  ],
  social: [
    { icon: "fa-brands fa-facebook" },
    { icon: "fab fa-instagram" },
    { icon: "fab fa-line" },
    { icon: "bi bi-telephone-fill" },
  ],
};

// 菜單項目組件
const MenuItem = memo(({ path, label, icon, onClick, size = "h4" }) => {
  const Tag = size;
  return (
    <div
      className={`col-md-${size === "h5" ? "3" : "2"} mb-2`}
      onClick={onClick}
    >
      <Link to={path || "#"} className="link">
        {icon && <i className={`${icon} me-2`}></i>}
        {size ? <Tag>{label}</Tag> : <span>{label}</span>}
      </Link>
    </div>
  );
});
// 設置 displayName
MenuItem.displayName = "MenuItem";

// 菜單區塊組件
const MenuSection = memo(({ title, items, onClick, size }) => {
  return (
    <div className="row mb-3 side-link">
      {title && (
        <div className="col-12 mb-2">
          <h5 className="section-title">{title}</h5>
        </div>
      )}
      <div className="row justify-content-between">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            path={item.path}
            label={item.label}
            icon={item.icon}
            onClick={onClick}
            size={size}
          />
        ))}
      </div>
    </div>
  );
});
// 設置 displayName
MenuSection.displayName = "MenuSection";

const Sidebar = ({ isOpen, onToggle }) => {
  // 優化滾動處理邏輯
  const handleScroll = useCallback(
    (e) => {
      if (isOpen) {
        e.preventDefault();
      }
    },
    [isOpen]
  );

  useEffect(() => {
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
  }, [isOpen, handleScroll]);

  // 添加鍵盤事件處理
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onToggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onToggle]);

  return (
    <>
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="導航選單"
      >
        <button
          className="btn close-button"
          onClick={onToggle}
          aria-label="關閉選單"
        >
          <i className="bi bi-x"></i>
        </button>
        <div className="container px-3">
          <div className="row mt-4 mb-3 side-link justify-content-between">
            <div className="mb-3 member-link">
              <Link to="member/orders" className="link" onClick={onToggle}>
                <i className="fa-solid fa-user me-2"></i>
                <span>會員專區</span>
              </Link>
            </div>
            <div className="mb-3 member-link">
              <Link to="/member/favorite" className="link" onClick={onToggle}>
                <i className="fa-solid fa-heart me-2"></i>
                <span>我的最愛</span>
              </Link>
            </div>
            <TravelSearchForm
              onToggle={onToggle}
              className="d-none d-md-block"
            />
          </div>

          <MenuSection
            title="地區之旅"
            items={MENU_DATA.areas}
            onClick={onToggle}
          />

          <MenuSection
            title="主題之旅"
            items={MENU_DATA.themes}
            onClick={onToggle}
            colSize={3}
          />

          <MenuSection
            title="季節之旅"
            items={MENU_DATA.seasons}
            onClick={onToggle}
            colSize={3}
          />

          <MenuSection
            title="精選之旅"
            items={MENU_DATA.featured}
            onClick={onToggle}
            colSize={2}
          />

          {/* 底部導航連結 */}
          <div className="footer-links mt-5">
            <div className="row justify-content-center">
              {MENU_DATA.footer.map((item, idx) => (
                <div
                  key={idx}
                  className="col-6 col-md-3 text-center mb-3"
                  onClick={onToggle}
                >
                  <Link className="footer-link" to={item.path}>
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 社交媒體圖標 */}
          <div className="row py-4 justify-content-center social-icons-container">
            {MENU_DATA.social.map((item, idx) => (
              <div key={idx} className="col-3 col-md-2 text-center mb-2">
                <Link className="link">
                  <i className={`${item.icon} social-icon`}></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default memo(Sidebar);
