import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import RecommendedProducts from "../../components/RecommendedProducts";
import homeRailImg from "../../assets/images/home/home-rail.jpg";
import homeClassicImg from "../../assets/images/home/home-classic.jpg";
import homeShopImg from "../../assets/images/home/home-shop.jpg";
import homeVibeImg from "../../assets/images/home/home-vibe.jpg";
import homeSpringImg from "../../assets/images/home/home-spring.jpg";
import homeSummerImg from "../../assets/images/home/home-summer.jpg";
import homeFallImg from "../../assets/images/home/home-fall.jpg";
import homeWinterImg from "../../assets/images/home/home-winter.jpg";
import homeKinkakujiImg from "../../assets/images/home/home-kinkakuji.jpg";
import homeFujiImg from "../../assets/images/home/home-fuji.jpg";
import homeTokyoImg from "../../assets/images/home/home-tokyo.jpg";
import homeKyotoImg from "../../assets/images/home/home-kyoto.jpg";
import homeHokkaidoImg from "../../assets/images/home/home-hokkaido.jpg";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [interval, setInterval] = useState(null);
  const [imageUrl, setImageUrl] = useState(homeRailImg);

  const contentSectionRef = useRef(null);
  const carouselSectionRef = useRef(null);
  const listSectionRef = useRef(null);
  const springSectionRef = useRef(null);
  const summerSectionRef = useRef(null);
  const fallSectionRef = useRef(null);
  const winterSectionRef = useRef(null);

  //更換照片
  const handleImageChange = (newImageUrl) => {
    if (newImageUrl === imageUrl) return;
    // 設定新圖片
    setImageUrl(newImageUrl);
  };

  //點擊箭頭往下移動
  const handleScrollDown = () => {
    if (contentSectionRef.current) {
      contentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 手動控制輪播
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    clearInterval(interval);
  };

  //取得NavBar高度
  useEffect(() => {
    const navbar = document.querySelector(".navbar"); // 或使用更具體的選擇器
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      console.log("NavBar height:", navbarHeight); // 先印出來看看實際高度

      // 可以動態設定 CSS 變數
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${navbarHeight}px`
      );
    }
  }, []);

  //標題淡入淡出效果
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          } else {
            entry.target.classList.remove("fade-in");
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const contentSection = contentSectionRef.current;
    const carouselSection = carouselSectionRef.current;
    const listSection = listSectionRef.current;

    if (contentSection) {
      observer.observe(contentSection);
    }
    if (carouselSection) {
      observer.observe(carouselSection);
    }
    if (listSection) {
      observer.observe(listSection);
    }

    return () => {
      if (contentSection) {
        observer.unobserve(contentSection);
      }
      if (carouselSection) {
        observer.unobserve(carouselSection);
      }
      if (listSection) {
        observer.unobserve(listSection);
      }
    };
  }, []);

  //季節區塊 slide-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in-left");
          }
        });
      },
      {
        rootMargin: "0px 0px -50% 0px",
      }
    );

    const springSection = springSectionRef.current;
    const fallSection = fallSectionRef.current;

    if (springSection) {
      observer.observe(springSection);
    }
    if (fallSection) {
      observer.observe(fallSection);
    }

    return () => {
      if (springSection) {
        observer.unobserve(springSection);
      }
      if (fallSection) {
        observer.unobserve(fallSection);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in-right");
          }
        });
      },
      {
        rootMargin: "0px 0px -50% 0px",
      }
    );

    const summerSection = summerSectionRef.current;
    const winterSection = winterSectionRef.current;

    if (summerSection) {
      observer.observe(summerSection);
    }
    if (winterSection) {
      observer.observe(winterSection);
    }

    return () => {
      if (summerSection) {
        observer.unobserve(summerSection);
      }
      if (winterSection) {
        observer.unobserve(winterSection);
      }
    };
  }, []);

  // 自動輪播
  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 3000);
    setInterval(autoPlayInterval);

    // 清理效果,當組件卸載時停止自動輪播
    return () => clearInterval(autoPlayInterval);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row flex-md-row-reverse index-banner">
          <div
            className="col px-0 gx-0 img-container"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          >
            <div
              className=" d-lg-none fs-2 text-white img-container__inf "
              onClick={handleScrollDown}
            >
              <i className="fa-solid fa-angles-down "></i>
            </div>
          </div>
          <div className="col-lg-5 d-none d-lg-block tour-menu">
            <div className="d-flex flex-row justify-content-evenly align-items-center h-100">
              {[
                {
                  title: "日本經典旅遊",
                  path: "/tour/classic-japan",
                  image: homeClassicImg,
                  icon: "fa-torii-gate",
                },
                {
                  title: "日本美學旅遊",
                  path: "/tour/shop-japan",
                  image: homeShopImg,
                  icon: "fa-store",
                },
                {
                  title: "日本鐵道旅遊",
                  path: "/tour/rail-japan",
                  image: homeRailImg,
                  icon: "fa-train",
                },
                {
                  title: "日本深度旅遊",
                  path: "/tour/vibe-japan",
                  image: homeVibeImg,
                  icon: "fa-mountain",
                },
              ].map((item, index) => (
                <div className="tour-menu__item" key={index}>
                  <Link
                    to={item.path}
                    onMouseEnter={() => handleImageChange(item.image)}
                    className="nav-link d-flex flex-column align-items-center"
                  >
                    <i className={`fas ${item.icon} mb-3`}></i>
                    <h2 className="tour-menu__title">{item.title}</h2>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light py-5">
        <div className="container index-content-section">
          <div className="index-content-section__text" ref={contentSectionRef}>
            <div className="container">
              <h2 className="section-title">
                <span className="section-title__main">季節日本</span>
                <span className="section-title__sub">Seasonal Japan</span>
              </h2>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <p className="section-description">
                    日本四季交替明顯，每個季節都有獨特的美景。柴旅遊精心規劃各季活動，讓遊客完整體驗當地文化、節慶、美食，留下深刻的回憶。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row gy-4 gx-md-4">
            <div
              className="col-md-6 mt-md-4 season-section"
              ref={springSectionRef}
            >
              <div className="card border-0 mb-4 bg-light season-card">
                <Link to="/season-japan/spring">
                  <div className="season-card__image-wrapper">
                    <img
                      src={homeSpringImg}
                      className="card-img-top"
                      alt="春季之旅"
                    />
                  </div>
                </Link>
                <div className="card-body p-0">
                  <h3 className="season-card__title">
                    <span className="season-card__title-main">春季之旅</span>
                    <span className="season-card__title-sub">
                      Spring Journey
                    </span>
                  </h3>
                  <div className="season-card__content">
                    <p className="season-card__text">
                      滿園盛放的櫻花，紛飛的櫻花瓣，赴一場絢爛的春日盛宴。日本各地綻放的色彩，令人心曠神怡。
                    </p>
                    <Link to="/season-japan/spring">
                      <button className="btn btn-outline-dark rounded-0">
                        查看行程 <i className="fas fa-arrow-right ms-2"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 mt-md-4 season-section"
              ref={summerSectionRef}
            >
              <div className="card border-0 mb-4 bg-light season-card">
                <Link to="/season-japan/summer">
                  <div className="season-card__image-wrapper">
                    <img
                      src={homeSummerImg}
                      className="card-img-top"
                      alt="夏季之旅"
                    />
                  </div>
                </Link>
                <div className="card-body p-0">
                  <h3 className="season-card__title">
                    <span className="season-card__title-main">夏季之旅</span>
                    <span className="season-card__title-sub">
                      Summer Journey
                    </span>
                  </h3>
                  <div className="season-card__content">
                    <p className="season-card__text">
                      炎炎夏日，海濱祭典熱鬧非凡。嚐美食、品美酒、賞煙花，感受夏日的悠閒休閒時光。
                    </p>
                    <Link to="/season-japan/summer">
                      <button className="btn btn-outline-dark rounded-0">
                        查看行程 <i className="fas fa-arrow-right ms-2"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 mt-md-4 season-section"
              ref={fallSectionRef}
            >
              <div className="card border-0 mb-4 bg-light season-card">
                <Link to="/season-japan/fall">
                  <div className="season-card__image-wrapper">
                    <img
                      src={homeFallImg}
                      className="card-img-top"
                      alt="秋季之旅"
                    />
                  </div>
                </Link>
                <div className="card-body p-0">
                  <h3 className="season-card__title">
                    <span className="season-card__title-main">秋季之旅</span>
                    <span className="season-card__title-sub">Fall Journey</span>
                  </h3>
                  <div className="season-card__content">
                    <p className="season-card__text">
                      層林盡染的楓葉，映襯著古剎寺院，幽靜迷人。品嚐季節限定美食，徜徉在秋高氣爽的愜意時刻。
                    </p>
                    <Link to="/season-japan/fall">
                      <button className="btn btn-outline-dark rounded-0">
                        查看行程 <i className="fas fa-arrow-right ms-2"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 mt-md-4 season-section"
              ref={winterSectionRef}
            >
              <div className="card border-0 mb-4 bg-light season-card">
                <Link to="/season-japan/winter">
                  <div className="season-card__image-wrapper">
                    <img
                      src={homeWinterImg}
                      className="card-img-top"
                      alt="冬季之旅"
                    />
                  </div>
                </Link>
                <div className="card-body p-0">
                  <h3 className="season-card__title">
                    <span className="season-card__title-main">冬季之旅</span>
                    <span className="season-card__title-sub">
                      Winter Journey
                    </span>
                  </h3>
                  <div className="season-card__content">
                    <p className="season-card__text">
                      銀裝素裹的雪景，溫暖的溫泉浴，體驗日本獨特的冬日魅力。滑雪、赏雪、品嚐溫暖的料理，享受寒冬里的靜謐時光。
                    </p>
                    <Link to="/season-japan/winter">
                      <button className="btn btn-outline-dark rounded-0">
                        查看行程 <i className="fas fa-arrow-right ms-2"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 carousel-section">
        <div className="row justify-content-center align-items-center flex-row-reverse">
          <div
            className="col-md-4 carousel-section__text d-none d-lg-block"
            ref={carouselSectionRef}
          >
            <h2 className="carousel-section__title">
              <span className="carousel-section__title-main">究極日本旅行</span>
              <span className="carousel-section__title-sub">
                Ultimate Japan Journey
              </span>
            </h2>
            <div className="carousel-section__content">
              <p>
                日本集文化藝術、溫泉美食於一體。無論是京都賞櫻、東京潮流、北海道滑雪等，體驗日本獨特魅力。無論何時造訪，都是您最佳的選擇。
              </p>
              <div className="carousel-section__decoration"></div>
            </div>
          </div>
          <div className="col-md-7">
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              className="carousel-custom"
            >
              <Carousel.Item>
                <Link to="/product/-NzbMI_fwF3y-MwCh56e">
                  <img
                    src={homeKinkakujiImg}
                    className="d-block w-100"
                    alt="金閣之美"
                  />
                  <div className="carousel-overlay"></div>
                </Link>
                <Carousel.Caption>
                  <h3>金閣之美</h3>
                  <p className="d-none d-md-block">體驗京都金閣寺的永恆之美</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Link to="/product/-Nzb0Rz4ZJOnAcQdx2sO">
                  <img
                    src={homeFujiImg}
                    className="d-block w-100"
                    alt="富士山之美"
                  />
                  <div className="carousel-overlay"></div>
                </Link>
                <Carousel.Caption>
                  <h3>富士山之美</h3>
                  <p className="d-none d-md-block">探索日本最高峰的壯麗景色</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Link to="/product/-NwytL8z-PG06KKsQv5M">
                  <img
                    src={homeTokyoImg}
                    className="d-block w-100"
                    alt="東京之美"
                  />
                  <div className="carousel-overlay"></div>
                </Link>
                <Carousel.Caption>
                  <h3>東京之美</h3>
                  <p className="d-none d-md-block">
                    感受現代與傳統交融的大都市魅力
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Link to="/product/-NzbMka_NjwWn1tTJxtx">
                  <img
                    src={homeKyotoImg}
                    className="d-block w-100"
                    alt="京都之美"
                  />
                  <div className="carousel-overlay"></div>
                </Link>
                <Carousel.Caption>
                  <h3>京都之美</h3>
                  <p className="d-none d-md-block">
                    漫步千年古都，感受日本傳統文化
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Link to="/product/-Nzb0Rz4ZJOnAcQdx2sO">
                  <img
                    src={homeHokkaidoImg}
                    className="d-block w-100"
                    alt="北海道之美"
                  />
                  <div className="carousel-overlay"></div>
                </Link>
                <Carousel.Caption>
                  <h3>北海道之美</h3>
                  <p className="d-none d-md-block">探索日本最北端的自然奇觀</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="bg-light py-5">
        <div className="container-fluid  index-list-section">
          <div className="mb-5 index-list-section__text" ref={listSectionRef}>
            <div className="container">
              <h2 className="section-title">
                <span className="section-title__main">精選日本</span>
                <span className="section-title__sub">Selected Japan</span>
              </h2>
              <div className="row justify-content-center">
                <div className="col-md-7 ">
                  <p className="section-description">
                    富有現代活力與古老傳統並存的日本。美麗的櫻花、雄偉的富士山、悠長的歷史文化，以及創新前瞻的科技發展，都令人嘆為觀止。獨特的武士精神、禪意的茶藝，以及令人垂涎的美食佳餚。無論是親身體驗傳統藝能,還是沉浸在城市的摩登時尚,日本絕對是個值得探索的國家。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <RecommendedProducts></RecommendedProducts>
        </div>
      </div>
    </>
  );
};

export default Home;
