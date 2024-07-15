import React, { useState } from "react";

const ServiceLocations = () => {
  return (
    <>
      <div className="container py-5">
        <div className="mb-5">
          <p className="text-center fs-2 ">服務據點</p>
        </div>
        <div className="service-location-container">
          <div className="location-section">
            <h2 className="border-bottom pb-4">台北</h2>
            <div className="location-info">
              <div className="row">
                <div className="col-lg-4">
                  {" "}
                  <div className="contact-info">
                    <h3>聯絡資訊</h3>
                    <p>地址: 台北市XX區XX路XX號</p>
                    <p>電話: 02-XXXX-XXXX</p>
                    <p>Email: taipei@example.com</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  {" "}
                  <div className="transportation-info">
                    <h3>交通資訊</h3>
                    <p>捷運站: 近XX站</p>
                    <p>公車路線: XX, XX, XX</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  {" "}
                  <div className="business-hours">
                    <h3>營業時間</h3>
                    <p>週一至週五: 09:00 - 18:00</p>
                    <p>週六: 10:00 - 17:00</p>
                    <p>週日: 休息</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.6706701246806!2d121.53581931539865!3d25.04832998396615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da9c9e1f%3A0x1206fac82448c38b!2sTaipei%20101!5e0!3m2!1szh-TW!2stw!4v1624563600000!5m2!1szh-TW!2stw"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="location-section">
            <h2 className="border-bottom pb-4">台中</h2>
            <div className="location-info">
              <div className="row">
                <div className="col-lg-4">
                  {" "}
                  <div className="contact-info">
                    <h3>聯絡資訊</h3>
                    <p>地址: 台中市XX區XX路XX號</p>
                    <p>電話: 04-XXXX-XXXX</p>
                    <p>Email: taichung@example.com</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  {" "}
                  <div className="transportation-info">
                    <h3>交通資訊</h3>
                    <p>捷運站: 近XX站</p>
                    <p>公車路線: XX, XX, XX</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  {" "}
                  <div className="business-hours">
                    <h3>營業時間</h3>
                    <p>週一至週五: 09:00 - 18:00</p>
                    <p>週六: 10:00 - 17:00</p>
                    <p>週日: 休息</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.1717354270396!2d120.68473231539449!3d24.13716198441067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d8e71c5e9d1%3A0x4d3a5d2b097a0c97!2z5Y-w5YyXIOWkp-WtpuaVtA!5e0!3m2!1szh-TW!2stw!4v1624563696000!5m2!1szh-TW!2stw"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="location-section">
            <h2 className="border-bottom pb-4">高雄</h2>
            <div className="location-info">
              <div className="row">
                <div className="col-lg-4">
                  {" "}
                  <div className="contact-info">
                    <h3>聯絡資訊</h3>
                    <p>地址: 高雄市XX區XX路XX號</p>
                    <p>電話: 07-XXXX-XXXX</p>
                    <p>Email: kaohsiung@example.com</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  {" "}
                  <div className="transportation-info">
                    <h3>交通資訊</h3>
                    <p>捷運站: 近XX站</p>
                    <p>公車路線: XX, XX, XX</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  {" "}
                  <div className="business-hours">
                    <h3>營業時間</h3>
                    <p>週一至週五: 09:00 - 18:00</p>
                    <p>週六: 10:00 - 17:00</p>
                    <p>週日: 休息</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.4433559120064!2d120.30270131538396!3d22.620310085135013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e06b9498e9c1b%3A0xf3e0b6ba34536b26!2z5Y-w5YyXIOWuneWxseeUteWPt-S4reW_gw!5e0!3m2!1szh-TW!2stw!4v1624563784000!5m2!1szh-TW!2stw"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceLocations;
