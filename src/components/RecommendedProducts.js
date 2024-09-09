import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export const RecommendedProducts = () => {
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
  return (
    <>
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
            <Link to="/product/-O6M1FkTIzUtE54sofRN" className="link">
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
            <Link to="/product/-O6M0HQQWG_IrQOFrnal" className="link">
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
    </>
  );
};

export default RecommendedProducts;
