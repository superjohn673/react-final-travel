import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      // 創建 GSAP 時間軸
      const tl = gsap.timeline({ defaults: { duration: 0.3 } });

      // 設定文字逐個出現動畫
      tl.to(".splash-screen", { autoAlpha: 1 }, "+=0.2") // 0.2 秒後淡入
        .fromTo(".char1", { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
        .fromTo(".char2", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "+=0.6")
        // .fromTo(".char3", { opacity: 0, y: 0 }, { opacity: 1, y: 0 }, "+=0.3")
        .to(".splash-screen", { autoAlpha: 0 }, "+=0.5")
        .call(() => setShowSplash(false));
    }
  }, []);

  return (
    <>
      {showSplash && (
        <div
          className="splash-screen"
          style={{ backgroundColor: "white", opacity: 0 }}
        >
          <div className="splash-text">
            <span className="char1">Shiba</span>
            <span className="char2"> Travel</span>
            {/* <span className="char3"> 遊</span> */}
          </div>
        </div>
      )}
    </>
  );
};

export default SplashScreen;
