// Sidebar.js
import { useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import TravelSearchForm from "./TravelSearchForm";

// 菜單數據
const MENU_DATA = {
  areas: [
    { path: "area-japan/kanto", label: "關東", icon: "bi bi-geo-alt" },
    { path: "area-japan/kansai", label: "關西", icon: "bi bi-geo-alt" },
    { path: "area-japan/hokkaido", label: "北海道", icon: "bi bi-geo-alt" },
    { path: "area-japan/tohoku", label: "東北", icon: "bi bi-geo-alt" },
    { path: "area-japan/hokuriku", label: "北陸", icon: "bi bi-geo-alt" },
    { path: "area-japan/kyushu", label: "九州", icon: "bi bi-geo-alt" },
  ],
  themes: [
    { path: "tour/classic-japan", label: "經典之旅", icon: "bi bi-stars" },
    { path: "tour/shop-japan", label: "美學之旅", icon: "bi bi-brush" },
    { path: "tour/rail-japan", label: "鐵道之旅", icon: "bi bi-train-front" },
    { path: "tour/vibe-japan", label: "深度之旅", icon: "bi bi-compass" },
  ],
  seasons: [
    { path: "season-japan/spring", label: "春季之旅", icon: "bi bi-flower1" },
    { path: "season-japan/summer", label: "夏季之旅", icon: "bi bi-sun" },
    { path: "season-japan/fall", label: "秋季之旅", icon: "bi bi-tree" },
    { path: "season-japan/winter", label: "冬季之旅", icon: "bi bi-snow" },
  ],
  featured: [
    {
      path: "/product/-Nzf__o2dpmQ_VfkPwnw",
      label: "美食饗宴",
      icon: "bi bi-cup-hot",
    },
    {
      path: "/product/-Nzf_nF5zhwOzwl2z_hi",
      label: "咖啡品味",
      icon: "bi bi-cup",
    },
    {
      path: "/product/-Nzf_yFq40JTwB0WB4-V",
      label: "寺廟之旅",
      icon: "bi bi-building",
    },
    {
      path: "/product/-Nzfa9hKlZ5znzway6Ni",
      label: "購物之都",
      icon: "bi bi-bag",
    },
    {
      path: "/product/-O-5Hoy0jCcQdrdh9lCY",
      label: "滑雪勝地",
      icon: "bi bi-snow2",
    },
    {
      path: "/product/-NzfaHOVNwBYrJ18yzZd",
      label: "環球影城",
      icon: "bi bi-camera",
    },
  ],
  footer: [
    { path: "/location", label: "服務據點" },
    { path: "/information", label: "常見問題" },
    { path: "/contact", label: "聯絡我們" },
    { path: "login", label: "後台登入" },
  ],
  social: [
    { icon: "fa-brands fa-facebook", label: "Facebook" },
    { icon: "fab fa-instagram", label: "Instagram" },
    { icon: "fab fa-line", label: "Line" },
    { icon: "bi bi-telephone-fill", label: "電話" },
  ],
};

// 菜單項目組件
const MenuItem = memo(({ path, label, icon, onClick }) => {
  return (
    <div className="menu-item-wrapper" onClick={onClick}>
      <Link to={path || "#"} className="menu-item">
        <div className="menu-icon">{icon && <i className={icon}></i>}</div>
        <span className="menu-label">{label}</span>
      </Link>
    </div>
  );
});
// 設置 displayName
MenuItem.displayName = "MenuItem";

// 菜單區塊組件
const MenuSection = memo(({ title, items, onClick }) => {
  return (
    <div className="menu-section">
      {title && (
        <div className="section-header">
          <h5 className="section-title">{title}</h5>
        </div>
      )}
      <div className="menu-grid">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            path={item.path}
            label={item.label}
            icon={item.icon}
            onClick={onClick}
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
        <div className="sidebar-content">
          <div className="member-section">
            <div className="member-item">
              <Link to="member/orders" className="link" onClick={onToggle}>
                <i className="fa-solid fa-user"></i>
                <span>會員專區</span>
              </Link>
            </div>
            <div className="member-item">
              <Link to="/member/favorite" className="link" onClick={onToggle}>
                <i className="fa-solid fa-heart"></i>
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
          />

          <MenuSection
            title="季節之旅"
            items={MENU_DATA.seasons}
            onClick={onToggle}
          />

          <MenuSection
            title="精選之旅"
            items={MENU_DATA.featured}
            onClick={onToggle}
          />

          {/* 底部導航連結 */}
          <div className="footer-links">
            <div className="footer-grid">
              {MENU_DATA.footer.map((item, idx) => (
                <div key={idx} className="footer-item" onClick={onToggle}>
                  <Link className="footer-link" to={item.path}>
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 社交媒體圖標 */}
          <div className="social-icons-container">
            {MENU_DATA.social.map((item, idx) => (
              <div key={idx} className="social-item">
                <Link className="social-link" aria-label={item.label}>
                  <i className={`${item.icon}`}></i>
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
