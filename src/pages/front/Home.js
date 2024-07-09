import React, { useState, useRef, useEffect } from "react";
// import SplashScreen from "../../components/SplashScreen";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Slider from "react-slick";

const Home = (isSidebarOpen) => {
  const [index, setIndex] = useState(0);
  const [interval, setInterval] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1683713552787-eb7843b46df8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    // https://images.unsplash.com/photo-1573416264247-7e0212941973?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  );

  const contentSectionRef = useRef(null);
  const carouselSectionRef = useRef(null);
  const listSectionRef = useRef(null);
  const springSectionRef = useRef(null);
  const summerSectionRef = useRef(null);
  const fallSectionRef = useRef(null);
  const winterSectionRef = useRef(null);

  //點擊更換照片
  const handleImageChange = (newImageUrl) => {
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

  //listsection 左右滑
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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
        threshold: 0.5, // 設置觸發淡入效果的閥值, 此處設為 50% 顯示
      }
    );

    if (contentSectionRef.current) {
      observer.observe(contentSectionRef.current);
    }
    if (carouselSectionRef.current) {
      observer.observe(carouselSectionRef.current);
    }
    if (listSectionRef.current) {
      observer.observe(listSectionRef.current);
    }

    return () => {
      if (contentSectionRef.current) {
        observer.unobserve(contentSectionRef.current);
      }
      if (carouselSectionRef.current) {
        observer.unobserve(carouselSectionRef.current);
      }
      if (listSectionRef.current) {
        observer.unobserve(listSectionRef.current);
      }
    };
  }, []);

  //季節區塊 slide-in
  //spring、fall
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in-left");
            // entry.target.classList.remove("slide-out-left");
          } else {
            // entry.target.classList.remove("slide-in-left");
            // entry.target.classList.add("slide-out-left");
          }
        });
      },
      {
        rootMargin: "0px 0px -50% 0px", // 當元素進入視窗下半部時觸發
      }
    );

    if (springSectionRef.current) {
      observer.observe(springSectionRef.current);
    }
    if (fallSectionRef.current) {
      observer.observe(fallSectionRef.current);
    }

    return () => {
      if (springSectionRef.current) {
        observer.unobserve(springSectionRef.current);
      }
      if (fallSectionRef.current) {
        observer.unobserve(fallSectionRef.current);
      }
    };
  }, []);
  //summer、winter
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in-right");
            // entry.target.classList.remove("slide-out-right");
          } else {
            // entry.target.classList.remove("slide-in-right");
            // entry.target.classList.add("slide-out-right");
          }
        });
      },
      {
        rootMargin: "0px 0px -50% 0px", // 當元素進入視窗下半部時觸發
      }
    );

    if (summerSectionRef.current) {
      observer.observe(summerSectionRef.current);
    }
    if (winterSectionRef.current) {
      observer.observe(winterSectionRef.current);
    }

    return () => {
      if (summerSectionRef.current) {
        observer.unobserve(summerSectionRef.current);
      }
      if (winterSectionRef.current) {
        observer.unobserve(winterSectionRef.current);
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
      {/* <SplashScreen></SplashScreen> */}
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
              <i class="fa-solid fa-angles-down "></i>
            </div>
            {/* <img
              src={imageUrl}
              className="img-fluid index-banner--transition "
              alt="..."
            /> */}
          </div>
          <div className="col-lg-5 d-none d-lg-block">
            <div className="d-flex flex-row justify-content-evenly align-items-center h-100">
              <h2 className=" ">
                <Link
                  to="/tour/classic-japan"
                  onMouseEnter={() =>
                    handleImageChange(
                      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    )
                  }
                  className="nav-link"
                >
                  日本經典旅遊
                </Link>
              </h2>
              <h2 className="">
                <Link
                  to="/tour/shop-japan"
                  onMouseEnter={() =>
                    handleImageChange(
                      "https://images.unsplash.com/photo-1536901766856-5d45744cd180?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    )
                  }
                  className="nav-link"
                >
                  日本美學旅遊
                </Link>
              </h2>
              <h2 className="">
                <Link
                  to="/tour/rail-japan"
                  onMouseEnter={() =>
                    handleImageChange(
                      "https://images.unsplash.com/photo-1683713552787-eb7843b46df8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    )
                  }
                  className="nav-link"
                >
                  日本鐵道旅遊
                </Link>
              </h2>
              <h2 className="">
                <Link
                  to="/tour/vibe-japan"
                  onMouseEnter={() =>
                    handleImageChange(
                      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1953&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    )
                  }
                  className="nav-link"
                >
                  日本深度旅遊
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light py-5">
        <div className="container index-content-section">
          <div className="index-content-section__text " ref={contentSectionRef}>
            <div className="container">
              <p className="text-center fs-2">季節日本</p>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <p className="text-center fs-4">
                    日本四季交替明顯，每個季節都有獨特的美景。柴旅遊精心規劃各季活動，讓遊客完整體驗當地文化、節慶、美食，留下深刻的回憶。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row  gx-5">
            <div
              className="col-md-6 mt-md-4 season-section"
              ref={springSectionRef}
            >
              <div className="card border-0 mb-4 position-relative bg-light">
                <Link to="/season-japan/spring">
                  <img
                    src="https://images.unsplash.com/photo-1557409518-691ebcd96038?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="card-img-top "
                    alt="..."
                  />
                </Link>
                <div className="card-body p-0">
                  <h3 className="mb-0 mt-4 text-center">春季之旅</h3>
                  <div className="d-flex justify-content-between mt-3">
                    <p className="card-text text-muted mb-0 w-75">
                      滿園盛放的櫻花，紛飛的櫻花瓣，赴一場絢爛的春日盛宴。日本各地綻放的色彩，令人心曠神怡。
                    </p>
                    <div>
                      {" "}
                      <Link to="/season-japan/spring">
                        <button className="btn btn-outline-dark rounded-2 text-nowrap">
                          查看行程
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 mt-md-4 season-section"
              ref={summerSectionRef}
            >
              <div className="card border-0 mb-4 position-relative bg-light">
                <Link to="/season-japan/summer">
                  <img
                    src="https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="card-img-top "
                    alt="..."
                  />
                </Link>

                <div className="card-body p-0">
                  <h3 className="mb-0 mt-4 text-center">夏季之旅</h3>
                  <div className="d-flex justify-content-between mt-3">
                    <p className="card-text text-muted mb-0 w-75">
                      炎炎夏日，海濱祭典熱鬧非凡。嚐美食、品美酒、賞煙花，感受夏日的悠閒休閒時光。
                    </p>
                    <div>
                      {" "}
                      <Link to="/season-japan/summer">
                        <button className="btn btn-outline-dark rounded-2 text-nowrap">
                          查看行程
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 mt-md-4 season-section"
              ref={fallSectionRef}
            >
              <div className="card border-0 mb-4 position-relative bg-light">
                <Link to="/season-japan/fall">
                  {" "}
                  <img
                    src="https://images.unsplash.com/photo-1610238115511-81be15284155?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="card-img-top"
                    alt="..."
                  />
                </Link>

                <div className="card-body p-0">
                  <h3 className="mb-0 mt-4 text-center">秋季之旅</h3>
                  <div className="d-flex justify-content-between mt-3">
                    <p className="card-text text-muted mb-0 w-75 ">
                      層林盡染的楓葉，映襯著古剎寺院，幽靜迷人。品嚐季節限定美食，徜徉在秋高氣爽的愜意時刻。
                    </p>
                    <div>
                      <Link to="/season-japan/fall">
                        <button className="btn btn-outline-dark rounded-2 text-nowrap">
                          查看行程
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 mt-md-4 season-section"
              ref={winterSectionRef}
            >
              <div className="card border-0 mb-4 position-relative bg-light">
                <Link to="/season-japan/winter">
                  {" "}
                  <img
                    src="https://images.unsplash.com/photo-1598176433730-2aca0907a717?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="card-img-top "
                    alt="..."
                  />
                </Link>

                <div className="card-body p-0">
                  <h3 className="mb-0 mt-4 text-center">冬季之旅</h3>
                  <div className="d-flex justify-content-between mt-3">
                    <p className="card-text text-muted mb-0 w-75">
                      銀裝素裹的雪景，溫暖的溫泉浴，體驗日本獨特的冬日魅力。滑雪、赏雪、品嚐溫暖的料理，享受寒冬里的靜謐時光。
                    </p>
                    <div>
                      {" "}
                      <Link to="/season-japan/winter">
                        <button className="btn btn-outline-dark rounded-2 text-nowrap">
                          查看行程
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" container-fluid py-5 carousel-section ">
        <div className="row justify-content-center align-items-center flex-row-reverse">
          <div
            className="col-md-3 carousel-section__text d-none d-lg-block"
            ref={carouselSectionRef}
          >
            <p className=" fs-2 text-center">究極日本旅行</p>
            <p className="fs-4">
              日本集文化藝術、溫泉美食於一體。無論是京都賞櫻、東京潮流、北海道滑雪等，體驗日本獨特魅力。無論何時造訪，都是您最佳的選擇。
            </p>
          </div>
          <div className="col-md-8">
            {" "}
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <Link to="/product/-NzbMI_fwF3y-MwCh56e">
                  <img
                    src="https://images.unsplash.com/photo-1505337987237-3bb1b9362b31?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="d-block w-100  "
                    alt="..."
                  />
                </Link>
                <Carousel.Caption>
                  <h3>金閣之美</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Link to="/product/-Nzb0Rz4ZJOnAcQdx2sO">
                  <img
                    src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="d-block w-100 "
                    alt="..."
                  />
                </Link>
                <Carousel.Caption>
                  <h3>富士山之美</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Link to="/product/-NwytL8z-PG06KKsQv5M">
                  <img
                    src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="d-block w-100 "
                    alt="..."
                  />
                </Link>
                <Carousel.Caption>
                  <h3>東京之美</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Link to="/product/-NzbMka_NjwWn1tTJxtx">
                  <img
                    src="https://images.unsplash.com/photo-1522623349500-de37a56ea2a5?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="d-block w-100 "
                    alt="..."
                  />
                </Link>
                <Carousel.Caption>
                  <h3>京都之美</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Link to="/product/-Nzb0Rz4ZJOnAcQdx2sO">
                  <img
                    src="https://images.unsplash.com/photo-1545105511-839f4a45a030?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="d-block w-100"
                    alt="..."
                  />
                </Link>
                <Carousel.Caption>
                  <h3>北海道之美</h3>
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
              <p className="text-center fs-2">精選日本</p>
              <div className="row justify-content-center">
                <div className="col-md-7 ">
                  <p className=" text-center fs-4">
                    富有現代活力與古老傳統並存的日本。美麗的櫻花、雄偉的富士山、悠長的歷史文化，以及創新前瞻的科技發展，都令人嘆為觀止。獨特的武士精神、禪意的茶藝，以及令人垂涎的美食佳餚。無論是親身體驗傳統藝能,還是沉浸在城市的摩登時尚,日本絕對是個值得探索的國家。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <Slider {...settings}>
              <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
                <Link to="/product/-Nzf__o2dpmQ_VfkPwnw" className="link">
                  <div
                    className="index-list-section__img d-flex justify-content-center align-items-end"
                    style={{
                      backgroundImage:
                        "URL('https://images.unsplash.com/photo-1573806439793-82aa612294b2?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    }}
                  >
                    <p className=" index-list-section__inf">瞭解更多</p>
                  </div>
                </Link>
                <h4 className="mt-4">美食饗宴</h4>
                <p className="text-muted">來一場探索職人料理之旅吧</p>
              </div>
              <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
                <Link to="/product/-Nzf_nF5zhwOzwl2z_hi" className="link">
                  <div
                    className="index-list-section__img d-flex justify-content-center align-items-end"
                    style={{
                      backgroundImage:
                        "URL('https://images.unsplash.com/photo-1667560615919-837fe9001e58?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    }}
                  >
                    <p className=" index-list-section__inf">瞭解更多</p>
                  </div>
                </Link>
                <h4 className="mt-4">咖啡品味</h4>
                <p className="text-muted">尋找心靈放鬆咖啡之旅</p>
              </div>
              <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
                <Link to="/product/-Nzf_yFq40JTwB0WB4-V" className="link">
                  <div
                    className="index-list-section__img d-flex justify-content-center align-items-end"
                    style={{
                      backgroundImage:
                        "URL('https://images.unsplash.com/photo-1601823984263-b87b59798b70?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    }}
                  >
                    <p className=" index-list-section__inf">瞭解更多</p>
                  </div>
                </Link>
                <h4 className="mt-4">寺廟之旅</h4>
                <p className="text-muted">尋找宗教文化神之地</p>
              </div>
              <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
                <Link to="/product/-NzfaHOVNwBYrJ18yzZd" className="link">
                  <div
                    className="index-list-section__img d-flex justify-content-center align-items-end"
                    style={{
                      backgroundImage:
                        "URL('https://images.unsplash.com/photo-1611124601110-f804e03a2a6a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    }}
                  >
                    <p className=" index-list-section__inf">瞭解更多</p>
                  </div>
                </Link>
                <h4 className="mt-4">滑雪聖地</h4>
                <p className="text-muted">來一場刺激的滑雪體驗吧</p>
              </div>
              <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
                <Link to="/product/-NzfaHOVNwBYrJ18yzZd" className="link">
                  <div
                    className="index-list-section__img d-flex justify-content-center align-items-end"
                    style={{
                      backgroundImage:
                        "URL('https://images.unsplash.com/photo-1621445944472-f252571005b6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    }}
                  >
                    <p className=" index-list-section__inf">瞭解更多</p>
                  </div>
                </Link>
                <h4 className="mt-4">環球影城</h4>
                <p className="text-muted">渡過快樂的環球影城</p>
              </div>
              <div className="col-md-4 col-lg-2 d-flex justify-content-center align-items-center flex-column">
                <Link to="/product/-Nzfa9hKlZ5znzway6Ni" className="link">
                  <div
                    className="index-list-section__img d-flex justify-content-center align-items-end"
                    style={{
                      backgroundImage:
                        "URL('https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    }}
                  >
                    <p className=" index-list-section__inf">瞭解更多</p>
                  </div>
                </Link>
                <h4 className="mt-4">購物之都</h4>
                <p className="text-muted">盡情放鬆購物享樂</p>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
