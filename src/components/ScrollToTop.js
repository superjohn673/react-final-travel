// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, navigate]);

  return null; // 不需要渲染任何內容
}

export default ScrollToTop;
