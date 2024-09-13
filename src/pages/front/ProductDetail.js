import React, { useContext } from "react";
import { AppContext } from "../../store/AppContext";
import { useEffect, useState } from "react";
import {
  useOutletContext,
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import TravelCalendar from "../../components/TravelCalendar";

const parseItinerary = (htmlContent) => {
  if (!htmlContent) {
    console.error("內容為空，無法解析行程");
    return [];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const textContent = doc.body.textContent || "";

  if (!textContent.trim()) {
    console.error("解析後的內容為空，無法解析行程");
    return [];
  }

  const itinerary = [];

  // 匹配每一天的行程，分別處理行程和特色重點
  const days = textContent.match(/(Day \d+:.*?)(?=(Day \d+:|$))/gs);

  if (!days) {
    console.error("找不到任何行程日");
    return [];
  }

  days.forEach((dayText) => {
    // 匹配行程與可選的特色重點（\n分隔地點與行程路線）
    const match = dayText.match(
      /Day (\d+):\s*([\s\S]*?)(?:\n(.*?))?(?:\行程特色:\s*(.*))?\s*$/
    );

    if (match) {
      const dayNumber = match[1]; // 提取第幾天
      const routeText = match[2].trim(); // 提取行程路線
      const route = routeText.split(" → "); // 按 "→" 分割行程路線
      // const location = match[3] ? match[3].trim() : ""; // 提取行程中的地點
      const highlight = match[4] ? match[4].trim() : ""; // 提取特色重點

      // 添加每一天的行程與相關資訊
      itinerary.push({ day: dayNumber, route, highlight });
    } else {
      console.warn(`Day 格式不正確: ${dayText}`);
    }
  });

  console.log(itinerary);
  return itinerary;
};

// const parseItinerary = (htmlContent) => {
//   if (!htmlContent) {
//     console.error("內容為空，無法解析行程");
//     return [];
//   }

//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlContent, "text/html");
//   const textContent = doc.body.textContent || "";

//   if (!textContent.trim()) {
//     console.error("解析後的內容為空，無法解析行程");
//     return [];
//   }

//   const itinerary = [];

//   // 匹配每一天的行程，分別處理行程和特色重點
//   const days = textContent.match(/(Day \d+:.*?)(?=(Day \d+:|$))/gs);

//   if (!days) {
//     console.error("找不到任何行程日");
//     return [];
//   }

//   days.forEach((dayText) => {
//     // 匹配每一天的行程與可選的特色重點
//     const match = dayText.match(
//       /Day (\d+):\s*([\s\S]*?)(?:\n\n(.*?))?\s*(?:行程特色:\s*(.*))?\s*$/
//     );
//     if (match) {
//       const dayNumber = match[1]; // 提取第幾天
//       const route = match[2].trim().split(" → "); // 提取行程路線
//       const location = match[3] ? match[3].trim() : ""; // 提取行程中的景點
//       const highlight = match[4] ? match[4].trim() : ""; // 提取特色重點

//       // 將每一天的行程與相關資訊加入陣列
//       itinerary.push({ day: dayNumber, route, location, highlight });
//     } else {
//       console.warn(`Day 格式不正確: ${dayText}`);
//     }
//   });

//   console.log(itinerary);
//   return itinerary;
// };

// const parseItinerary = (htmlContent) => {
//   // 檢查是否有內容
//   if (!htmlContent) {
//     console.error("內容為空，無法解析行程");
//     return [];
//   }

//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlContent, "text/html");
//   const textContent = doc.body.textContent || "";

//   // 檢查是否有文本內容
//   if (!textContent.trim()) {
//     console.error("解析後的內容為空，無法解析行程");
//     return [];
//   }

//   const itinerary = [];

//   // 使用正則表達式來找到每一天的行程
//   const days = textContent.match(/Day \d+:.*?(?=(Day \d+:|$))/gs); // 匹配每一天的內容

//   // 檢查是否匹配到了任何天數行程
//   if (!days) {
//     console.error("找不到任何行程日");
//     return [];
//   }

//   days.forEach((dayText) => {
//     const match = dayText.match(/Day (\d+):\s*(.*)/s); // 匹配具體的行程
//     if (match) {
//       const dayNumber = match[1];
//       const route = match[2].trim().split(" → "); // 按 "→" 分割行程路線

//       // 檢查是否有路線資料
//       if (route.length === 0) {
//         console.warn(`Day ${dayNumber} 沒有找到路線`);
//       }

//       itinerary.push({ day: dayNumber, route });
//     } else {
//       console.warn(`Day 的格式不正確: ${dayText}`);
//     }
//   });

//   console.log(itinerary);
//   return itinerary;
// };

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [itinerary, setItinerary] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { getCart, cartData } = useOutletContext();
  const [tempAdult, setTempAdult] = useState(0);
  const [tempChildren, setTempChildren] = useState(0);
  const [tempSelectedDate, setTempEelectedDate] = useState(null);
  const navigate = useNavigate();
  const { setSelectedDate, setAdultQuantity, setChildrenQuantity } =
    useContext(AppContext);

  const getProduct = async (id) => {
    setIsLoading(true);
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
    );
    setProduct(productRes.data.product);
    setItinerary(parseItinerary(productRes.data.product.content)); // 解析行程
    setIsLoading(false);
  };

  const addToCart = async () => {
    if (cartData?.carts?.length > 0) {
      alert("尚有未確認的行程");
      navigate("/cart");
      return;
    }
    localStorage.removeItem("couponInfStorage");
    localStorage.setItem("adultQuantityStorage", tempAdult.toString());
    localStorage.setItem("childrenQuantityStorage", tempChildren.toString());
    localStorage.setItem(
      "selectedDateStorage",
      tempSelectedDate.format("YYYY-MM-DD")
    );
    setAdultQuantity(tempAdult);
    setChildrenQuantity(tempChildren);
    setSelectedDate(tempSelectedDate.format("YYYY-MM-DD"));
    const data = {
      data: {
        product_id: product.id,
        qty: tempAdult + tempChildren,
      },
    };
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      getCart();
      navigate("/cart");
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };

  const onDateSelected = (date) => {
    console.log("1", date.format("YYYY-MM-DD"));
    setTempEelectedDate(date);
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  useEffect(() => {
    setIsButtonDisabled(
      tempAdult + tempChildren === 0 || tempSelectedDate === null
    );
  }, [tempAdult, tempChildren, tempSelectedDate]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <div
        style={{
          minHeight: "400px",
          backgroundImage: `url(${product.imageUrl})`,
          backgroundPosition: "center center",
        }}
      ></div>
      <div className="container full-height">
        {/* 首頁route */}
        <div className="mt-5">
          <Link className="link" to="/" style={{ color: "black" }}>
            <span>首頁 </span>
          </Link>
          <span>/ 日本 </span>
          <span>/ 團體 </span>
          <span>/ {product.category}</span>
        </div>
        {/* 預訂區塊 */}
        <div className="row justify-content-between mt-5 mb-7">
          {/* 載入日曆 */}
          <div className="col-md-7 mb-3">
            <h2 className="mb-3  d-md-none">{product.title}</h2>
            <TravelCalendar
              product={product}
              onDateSelected={onDateSelected}
            ></TravelCalendar>
          </div>
          {/* 行程標題描述及人數選擇*/}
          <div className="col-md-5 d-flex flex-column justify-content-between  ">
            <h2 className="mb-3 d-none d-md-block">{product.title}</h2>
            <p className="d-none d-md-block">{product.description}</p>
            {/* <div
              className="d-none d-md-block"
              dangerouslySetInnerHTML={{ __html: product.content }}
            ></div> */}
            {/* <p className="d-none d-md-block">{product.content}</p> */}
            {/* 人數選擇 */}
            <div className="mt-auto mb-3">
              <div className="mb-3">
                {tempSelectedDate ? (
                  <div className="mt-1">
                    <p className="">
                      出發日期: {tempSelectedDate.format("YYYY-MM-DD")} (
                      {
                        ["日", "一", "二", "三", "四", "五", "六"][
                          tempSelectedDate.day()
                        ]
                      }
                      )
                    </p>
                  </div>
                ) : (
                  <div className="mt-1 text-danger">
                    <p>請選擇出發日期</p>
                  </div>
                )}
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <div className="form-group">
                    <div className="row h-center g-0">
                      <div className="col-lg-6 ">
                        <span className="me-2">大人</span>
                        <br></br>
                        <span className="fw-bold text-danger">
                          ${product.price}/人
                        </span>
                      </div>
                      <div className="col col-md col-lg">
                        {" "}
                        <div className="input-group w-100 align-items-center">
                          <select
                            name=""
                            className="form-select"
                            id=""
                            value={tempAdult}
                            onChange={(e) => {
                              // eslint-disable-next-line no-lone-blocks
                              {
                                setTempAdult(e.target.value * 1);
                              }
                            }}
                          >
                            {[...new Array(16)].map((i, num) => {
                              return (
                                <option value={num} key={num}>
                                  {num}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <div className="row h-center g-0">
                      <div className="col-lg-6">
                        <span className="me-2">小孩</span>
                        <br></br>
                        <span className="fw-bold text-danger">
                          ${product.price * 0.8}/人
                        </span>
                      </div>
                      <div className="col col-md col-lg">
                        {" "}
                        <div className="input-group w-100 align-items-center">
                          <select
                            name=""
                            className="form-select"
                            id=""
                            value={tempChildren}
                            onChange={(e) => {
                              // eslint-disable-next-line no-lone-blocks
                              {
                                setTempChildren(e.target.value * 1);
                              }
                            }}
                          >
                            {[...new Array(16)].map((i, num) => {
                              return (
                                <option value={num} key={num}>
                                  {num}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-dark w-100 rounded-0 py-3 "
                onClick={() => addToCart()}
                disabled={isButtonDisabled || isLoading}
              >
                報名
              </button>
            </div>
          </div>
        </div>
        {/* 事項列表 */}
        <div className="my-6">
          <ul className="list-unstyled d-flex border-top border-bottom py-3">
            <li
              className="me-3"
              onClick={() => {
                const targetRef = document.getElementById("flight-info");
                targetRef.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Link className="link" style={{ color: "black" }}>
                航班資訊
              </Link>
            </li>
            <li
              className="me-3"
              onClick={() => {
                const targetRef = document.getElementById("daily-itinerary");
                targetRef.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Link className="link" style={{ color: "black" }}>
                每日行程
              </Link>
            </li>
            <li
              className="me-3"
              onClick={() => {
                const targetRef = document.getElementById("cost-description");
                targetRef.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Link className="link" style={{ color: "black" }}>
                費用說明
              </Link>
            </li>
            <li
              className="me-3"
              onClick={() => {
                const targetRef = document.getElementById("booking-info");
                targetRef.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Link className="link" style={{ color: "black" }}>
                預訂須知
              </Link>
            </li>
          </ul>
        </div>
        {/* 航班資訊 */}
        <div className="mb-6 text-center" id="flight-info">
          <h5 className="fs-3 fw-bold">航班</h5>
          <h6 className="mb-3">參考航班資訊</h6>
          <div className="row">
            <div className="col-lg-6">
              <div className="container">
                <div className="row border  ">
                  <div className="col-md-12 border-end border-3 border-danger-subtle py-2">
                    <small>Day 1</small>
                    <div className="mt-1">星宇航空</div>
                    <div>JX 189</div>
                  </div>
                  <div className="col-md-12 border-end border-3 border-danger-subtle py-2">
                    <div className="row">
                      <div className="col">
                        <small>Departure</small>
                        <div className="mt-1">桃園國際機場</div>
                        <div>06:45</div>
                      </div>
                      <div className="col-1 d-flex align-items-center">
                        <i class="fa-solid fa-plane fs-4 "></i>
                      </div>
                      <div className="col">
                        <small>Arrival</small>
                        <div className="mt-1">成田機場</div>
                        <div>10:20</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="container">
                <div className="row border">
                  <div className="col-md-12 border-end border-3 border-danger-subtle py-2">
                    <small>Day 6</small>
                    <div className="mt-1">星宇航空</div>
                    <div>JX 193</div>
                  </div>
                  <div className="col-md-12 border-end border-3 border-danger-subtle py-2">
                    <div className="row">
                      <div className="col">
                        <small>Departure</small>
                        <div className="mt-1">成田機場</div>
                        <div>18:45</div>
                      </div>
                      <div className="col-1 d-flex align-items-center">
                        <i class="fa-solid fa-plane fs-4 "></i>
                      </div>
                      <div className="col">
                        <small>Arrival</small>
                        <div className="mt-1">桃園國際機場</div>
                        <div>23:15</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 行程內容 */}
        <div className="tour-content" id="daily-itinerary">
          <div className="text-center mb-6">
            <span className="fs-6 fw-bold">Daily Tour</span>
            <br />
            <span className="fs-3 fw-bold">每日行程</span>
          </div>

          <div>
            {/* 每日行程內容*/}
            {/* 測試開始*/}

            <div className="tour-content" id="daily-itinerary">
              {itinerary.map((day) => (
                <div className="row mb-5 border-bottom" key={day.day}>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-2 mb-4">
                        <div className="tour-daily">DAY {day.day}</div>
                      </div>
                      <div className="col-md-10 d-flex align-items-center mb-4">
                        <div className="tour-daily-route">
                          {day.route.join(" → ")}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="col-md-2 mb-4">
                        <div className="tour-location">{day.location}</div>
                      </div> */}
                      <div className="col-md-10 d-flex align-items-center my-4">
                        <div className="tour-highlight">
                          <strong>行程特色：</strong>
                          <br /> <br />
                          {day.highlight}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="mb-1">
                          <i class="fa-solid fa-utensils">
                            <span className="ms-1">餐食</span>
                          </i>
                        </div>
                        <ul>
                          <li>飯店自助早餐</li>
                          <li>當地特色餐廳</li>
                          <li>日式懷石料理</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-1">
                          <i class="fa-solid fa-bed">
                            <span className="ms-1">住宿</span>
                          </i>
                        </div>
                        <p>精選五星級酒店</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="tour-content" id="daily-itinerary">
              {itinerary.map((day) => (
                <div className="row mb-5 border-bottom" key={day.day}>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-2 mb-4">
                        <div className="tour-daily"> DAY {day.day} </div>
                      </div>
                      <div className="col-md-10 d-flex align-items-center mb-4">
                        <div className="tour-daily-route">
                          {day.route.join(" → ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

            {/*測試 結束*/}
          </div>

          {/* 舊每日行程內容開始*/}
          {/* <div className="row mb-5 border-bottom">
            <div className="col-12">
              <div className="row  ">
                <div className="col-md-2 mb-4">
                  <div className="tour-daily"> DAY 1 </div>
                </div>
                <div className="col-md-10 d-flex align-items-center mb-4">
                  <div class="tour-daily-route">
                    桃園國際機場 → 東京成田空港 → 淺草寺 → 上野動物園 →
                    東京晴空塔
                  </div>
                </div>
              </div>
              <div className="row">
                <div className=" col-md-12 justify-content-between mb-5">
                  <div className="row">
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1580167227251-be70f01b0c51?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1538099130811-745e64318258?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1614651856337-4170236601a9?q=80&w=1673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <h5 className="fw-bold">淺草寺</h5>
                  <p>
                    重點特色 : 日本三大寺廟之一,擁有悠久歷史,是東京地標性建築
                  </p>
                  <p>
                    淺草寺創建於西元628年,是日本三大寺廟之一,保存完整的寺廟建築群,寺內供奉觀音菩薩。遊客可在此參拜,購買手信伴手禮,感受日本傳統文化。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">上野動物園</h5>
                  <p>重點特色 : 日本最大的動物園之一,棲息著各種珍稀動物</p>
                  <p>
                    上野動物園建於1882年,是日本歷史最悠久的動物園,園內有超過3,000種動物,包括大熊貓、長頸鹿、大象等,是東京熱門的家庭旅遊景點。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">東京晴空塔</h5>
                  <p>重點特色 : 東京最高的建築物,提供絕佳的觀景平台</p>
                  <p>
                    東京晴空塔高度634米,是東京最高的建築物,遊客可登頂觀賞東京市區的全景,欣賞城市的迷人夜景,是不可錯過的景點之一。
                  </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="mb-1">
                    <i class="fa-solid fa-utensils">
                      <span className="ms-1">餐食</span>
                    </i>
                  </div>
                  <ul>
                    <li>飯店早餐</li>
                    <li>一蘭拉麵</li>
                    <li>日式料理餐廳</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <div className="mb-1">
                    <i class="fa-solid fa-bed">
                      <span className="ms-1">住宿</span>
                    </i>
                  </div>
                  <p>虹夕諾雅 東京</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-5 border-bottom">
            <div className="col-12">
              <div className="row ">
                <div className="col-md-2 mb-4">
                  <div className="tour-daily"> DAY 2 </div>
                </div>
                <div className="col-md-10 d-flex align-items-center mb-4">
                  <div class="tour-daily-route">
                    銀座 → 明治神宮 → 澀谷 → 新宿御苑 → SHIBUYA SKY展望台
                  </div>
                </div>
              </div>
              <div className="row">
                <div className=" col-md-12 justify-content-between mb-5">
                  <div className="row">
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1593296984896-f5c6d6966363?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1532236204992-f5e85c024202?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1589085947445-a491beee038d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <h5 className="fw-bold">銀座</h5>
                  <p>
                    重點特色 : 東京最繁華的購物中心,雲集眾多精品店及百貨公司
                  </p>
                  <p>
                    銀座是東京最著名的商業中心,雲集了各種時尚精品、高級餐廳和百貨公司,是日本人和遊客的熱門購物好去處。遊客可在此盡情品味東京時尚生活。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">明治神宮</h5>
                  <p>重點特色 : 東京重要的神道教神社,建築典雅莊嚴</p>
                  <p>
                    明治神宮是一處衷心祭祀明治天皇及其皇后的神社,始建於1920年,是東京最重要的神社之一,遊客可在此參拜,感受日本傳統文化。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">澀谷</h5>
                  <p>重點特色 : 東京最時尚的潮流中心,擁有獨特的街頭文化</p>
                  <p>
                    澀谷是東京最流行的市區之一,以其獨特的年輕文化和時尚風格聞名。遊客可在此觀賞街頭藝術、流行服飾以及各式餐廳和娛樂活動。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">新宿御苑</h5>
                  <p>東京最大的公園綠地,擁有豐富的植物景觀</p>
                  <p>
                    新宿御苑是東京最大的城市公園之一,佔地約58公頃,擁有各式植物園區,被譽為東京的後花園。遊客可在此放鬆身心,欣賞美麗的園林景致。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">SHIBUYA SKY展望台</h5>
                  <p>提供涉谷區最高的觀景體驗,可遠眺東京市區全景</p>
                  <p>
                    SHIBUYA
                    SKY是位於涉谷的一處高空觀景平台,高度229米,是涉谷區最高的建築物,遊客可在此俯瞰東京市區的壯麗景色,體驗360度無死角的遼闊視野。
                  </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="mb-1">
                    <i class="fa-solid fa-utensils">
                      <span className="ms-1">餐食</span>
                    </i>
                  </div>
                  <ul>
                    <li>飯店早餐</li>
                    <li>日式定食餐廳</li>
                    <li>敘敘苑燒肉</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <div className="mb-1">
                    <i class="fa-solid fa-bed">
                      <span className="ms-1">住宿</span>
                    </i>
                  </div>
                  <p>東京希爾頓酒店</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-5 border-bottom">
            <div className="col-12">
              <div className="row">
                <div className="col-md-2 mb-4">
                  <div className="tour-daily"> DAY 3 </div>
                </div>
                <div className="col-md-10 d-flex align-items-center mb-4">
                  <div class="tour-daily-route">河口湖 → 箱根 → 御岳纜車</div>
                </div>
              </div>
              <div className="row">
                <div className=" col-md-12 justify-content-between mb-5">
                  <div className="row">
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1599173704879-2e407aa34cde?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1606918801925-e2c914c4b503?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1610375228550-d5cabc1d4090?q=80&w=1734&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <h5 className="fw-bold">河口湖</h5>
                  <p>重點特色 : 日本三大名湖之一,擁有優美的富士山景致</p>
                  <p>
                    河口湖是日本三大名湖之一,位於富士山腳下,風景秀麗,遊客可在此欣賞富士山的絕佳景色,參加遊湖活動,體驗富士山地區的自然美景。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">箱根</h5>
                  <p>重點特色 : 日本著名的溫泉度假勝地,擁有優雅的自然環境</p>
                  <p>
                    箱根是日本著名的溫泉度假勝地,擁有優美的山水環境,遊客可在此泡湯、欣賞風景,放鬆身心,享受悠閒的度假時光。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">御岳纜車</h5>
                  <p>重點特色 : 登上於山崗俯瞰富士山及河口湖的絕佳觀景點</p>
                  <p>
                    御岳纜車是一條連接河口湖畔和御岳山頂的纜車,登頂後可俯瞰整個河口湖區以及壯麗的富士山景致,是一處極佳的觀景之處。
                  </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="mb-1">
                    <i class="fa-solid fa-utensils">
                      <span className="ms-1">餐食</span>
                    </i>
                  </div>
                  <ul>
                    <li>飯店早餐</li>
                    <li>日式料理餐廳</li>
                    <li>牛舌餐廳</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <div className="mb-1">
                    <i class="fa-solid fa-bed">
                      <span className="ms-1">住宿</span>
                    </i>
                  </div>
                  <p>東京澀谷英迪格酒店</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-5 border-bottom">
            <div className="col-12">
              <div className="row ">
                <div className="col-md-2 mb-4">
                  <div className="tour-daily"> DAY 4 </div>
                </div>
                <div className="col-md-10 d-flex align-items-center mb-4">
                  <div class="tour-daily-route">
                    輕井澤 → 輕井澤王子購物廣場 → 輕井澤教會
                  </div>
                </div>
              </div>
              <div className="row">
                <div className=" col-md-12 justify-content-between mb-5">
                  <div className="row">
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1632398758447-e5e8c5c8bfd2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1713972147971-89d60b9c8768?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1705028572444-a411c7a9c8d1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <h5 className="fw-bold">輕井澤</h5>
                  <p>重點特色 : 著名的高級度假勝地,擁有舒適的自然環境</p>
                  <p>
                    輕井澤是日本著名的高級度假勝地,擁有優雅寧靜的自然環境,遊客可在此放鬆身心,漫步於幽靜的街道,欣賞別墅建築,感受高級度假的氛圍。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">輕井澤王子購物廣場</h5>
                  <p>重點特色 : 日本知名的高級outlet購物中心</p>
                  <p>
                    輕井澤王子購物廣場是日本著名的高級outlet購物中心,雲集了各大品牌的特賣店,吸引眾多遊客前來血拼。遊客可在此享受折扣優惠,盡情購物。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">輕井澤教會</h5>
                  <p>重點特色 : 歷史悠久的基督教教堂,建築典雅優美</p>
                  <p>
                    輕井澤教會是一座歷史悠久的基督教教堂,建於1971年,建築設計優雅典雅,是輕井澤著名的地標之一。遊客可在此欣賞教堂的美麗建築,感受宗教氛圍。
                  </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="mb-1">
                    <i class="fa-solid fa-utensils">
                      <span className="ms-1">餐食</span>
                    </i>
                  </div>
                  <ul>
                    <li>飯店早餐</li>
                    <li>輕井澤王子購物廣場自理</li>
                    <li>高級法式餐廳</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <div className="mb-1">
                    <i class="fa-solid fa-bed">
                      <span className="ms-1">住宿</span>
                    </i>
                  </div>
                  <p>東京威斯汀飯店</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-5 border-bottom">
            <div className="col-12">
              <div className="row">
                <div className="col-md-2 mb-4">
                  <div className="tour-daily"> DAY 5 </div>
                </div>
                <div className="col-md-10 d-flex align-items-center mb-4">
                  <div class="tour-daily-route">
                    築地市場 → 皇居外苑 → 六本木Hills
                  </div>
                </div>
              </div>
              <div className="row">
                <div className=" col-md-12 justify-content-between mb-5">
                  <div className="row">
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1587191507538-c8ca2e8c4be8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1514825918313-19e9a7963735?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <h5 className="fw-bold">築地市場</h5>
                  <p>重點特色 : 東京著名的大型海鮮市場,彙聚各類新鮮海產</p>
                  <p>
                    築地市場是東京最著名的大型海鮮市場,集聚了各種海產食材,是日本料理愛好者的必去之地。遊客可在此觀賞現場的海鮮拍賣,品嘗各種新鮮海鮮料理。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">皇居外苑</h5>
                  <p>重點特色 : 皇室居所,擁有優雅的日式園林景觀</p>
                  <p>
                    皇居外苑是日本天皇的居所,園內擁有美麗的日式庭園,遊客可在此欣賞典雅的皇家建築,感受日本皇室文化。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">六本木Hills</h5>
                  <p>重點特色 : 東京文化娛樂中心,集合藝術館、電影院等設施</p>
                  <p>
                    六本木Hills是東京的文化娛樂中心,這裡集合了眾多藝術館、劇院、電影院等設施,還有眾多高級餐廳和購物商場,是遊客前往體驗東京都會生活的好去處。
                  </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="mb-1">
                    <i class="fa-solid fa-utensils">
                      <span className="ms-1">餐食</span>
                    </i>
                  </div>
                  <ul>
                    <li>飯店早餐</li>
                    <li>觀景餐廳</li>
                    <li>新宿燒肉店</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <div className="mb-1">
                    <i class="fa-solid fa-bed">
                      <span className="ms-1">住宿</span>
                    </i>
                  </div>
                  <p>東京半島酒店</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-5 border-bottom">
            <div className="col-12">
              <div className="row ">
                <div className="col-md-2 mb-4">
                  <div className="tour-daily"> DAY 6 </div>
                </div>
                <div className="col-md-10 d-flex align-items-center mb-4">
                  <div class="tour-daily-route">
                    台場 → 東京鐵塔 → 成田國際機場 → 桃園國際機場
                  </div>
                </div>
              </div>
              <div className="row">
                <div className=" col-md-12 justify-content-between mb-5">
                  <div className="row">
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <div className="d-none d-md-block col-md-4">
                      <img
                        className="img-fluid"
                        src="https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <h5 className="fw-bold">台場</h5>
                  <p>重點特色 : 東京海濱區,集合眾多購物、娛樂設施</p>
                  <p>
                    台場是東京的海濱區,這裡建有大型購物商城、娛樂設施、博物館等,遊客可在此盡情參觀購物、體驗東京都會生活。
                  </p>
                  <br></br>
                  <h5 className="fw-bold">東京鐵塔</h5>
                  <p>重點特色 : 東京地標性建築,為東京市區提供絕佳的觀景平台</p>
                  <p>
                    東京鐵塔是東京的標誌性建築,高度333米,是繼巴黎艾菲爾鐵塔之後世界上第二高的鐵塔。遊客可登頂觀賞東京市區的全景,欣賞城市風光。
                  </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="mb-1">
                    <i class="fa-solid fa-utensils">
                      <span className="ms-1">餐食</span>
                    </i>
                  </div>
                  <ul>
                    <li>飯店早餐</li>
                    <li>台場購物廣場日式定食</li>
                    <li>機上美食</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <div className="mb-1">
                    <i class="fa-solid fa-bed">
                      <span className="ms-1">住宿</span>
                    </i>
                  </div>
                  <p>溫暖的家</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* 費用說明 */}
        <div className="mt-6 border-bottom" id="cost-description">
          <div className="text-center mb-6">
            <span className="fs-3 fw-bold">費用說明</span>
          </div>
          <div>
            <div className="row mb-5">
              <div className="col-md-2 fs-4">團費說明</div>
              <div className="col">
                <ul>
                  <li>訂金：$15,000</li>
                </ul>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-2 fs-4">費用包含</div>
              <div className="col">
                <ul>
                  <li className="mb-1">
                    含 800 萬旅行業責任保險及 30 萬意外醫療險 ( 旅客未滿 15 歲或
                    70 歲以上，依法限制最高新台幣 250 萬旅行業責任險)
                  </li>
                  <li className="mb-1">
                    履約保證保險保額新台幣一億零二佰萬元。
                  </li>
                  <li className="mb-1">機場稅、燃油費</li>
                </ul>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-2 fs-4">費用不含</div>
              <div className="col">
                <ul>
                  <li className="mb-1">導遊領隊、司機小費 NT$300/每日。</li>
                  <li className="mb-1">
                    私人消費：如行李超重費、飲料酒類、洗衣、電話、電報及私人交通費等。
                  </li>
                  <li className="mb-1">
                    本行程報價為2人一室,旅客報名指定單人房時須補單人房價差。
                  </li>
                  <li className="mb-1">
                    不含旅遊平安保險及旅遊不便險等其他私人保險項目
                  </li>
                  <li className="mb-1">
                    不含台灣及日本兩地因防疫政策而產生之相關費用（PCR
                    檢測及證明等費用、台灣疫苗施打證明費用等等）。
                  </li>
                  <li className="mb-1">簽證：請洽客服。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* 預訂須知 */}
        <div className="mt-6 border-bottom" id="booking-info">
          <div className="text-center mb-6">
            <span className="fs-3 fw-bold">預訂須知</span>
          </div>
          <div>
            <div className="row mb-5">
              <div className="col-md-2 fs-4">行程規定</div>
              <div className="col">
                <ul>
                  <li className="mb-1">
                    行程及餐食將會視情況（如季節、預約狀況、觀光地區休假及住宿飯店地點）調整。
                  </li>
                  <li className="mb-1">
                    如有行程不參加者，視為自動放棄，恕無法退費。
                  </li>
                  <li className="mb-1">
                    如有特殊餐食者，請於出發前至少5天(不含假日)告知承辦人員，以便提早為您安排。
                  </li>
                  <li className="mb-1">
                    旅遊期間，敬請旅客隨時注意自身安全並妥善保管財物，以免發生意外或個人財物損失等事宜。
                  </li>
                  <li className="mb-1">
                    自備慣用藥品或外用藥膏，避免攜帶粉狀藥物，以免被誤為毒品。途中如身體不適，不隨便吃別人的藥，宜告知領隊安排就醫。
                  </li>
                  <li className="mb-1">
                    孕婦及年長者或健康狀況不良者，宜有家人隨行，且應先到醫院索取附有中文說明的英文診斷書備用。
                  </li>
                  <li className="mb-1">
                    在出國前，建議您前往有旅遊醫學門診之醫院諮詢評估，以確保您的健康狀況。
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-2 fs-4">貼心提醒</div>
              <div className="col">
                <ul>
                  <li className="mb-1">
                    成團人數必須達到 12 人以上，方可成團。本行程最低出團為 12
                    人以上（含），最多為 35
                    人以下（含），將派遣合格領隊隨行服務。
                  </li>
                  <li className="mb-1">開票後不可更改姓名或拼音。</li>
                  <li className="mb-1">
                    包機團體機位報名付訂後，如取消則不退還訂金。
                  </li>
                  <li className="mb-1">
                    本公司將依正式取得飯店之結果，綜合當地實際交通等情況、調整安排旅遊行程、飯店入住之先後順序或旅遊路線，敬請以行前說明資料之行程表為準。
                  </li>
                  <li className="mb-1">
                    旅客若於旅遊中因法定傳染病原因，所增加之住宿、餐食、交通費用由旅客自行負擔，建議旅客若有疑慮可自行洽詢保險公司購買旅遊平安保險。
                  </li>
                  <li className="mb-1">
                    若遇大風雪、火山、颱風、地震等不可抗力情況，本公司將以安全順利為優先考量下，變更相關行程。
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
