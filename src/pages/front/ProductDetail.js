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

  // 匹配每一天的行程，分別處理行程、特色重點、餐食與住宿
  const days = textContent.match(/(Day \d+:.*?)(?=(Day \d+:|$))/gs);

  if (!days) {
    console.error("找不到任何行程日");
    return [];
  }

  days.forEach((dayText) => {
    // 匹配行程、行程特色、餐食與住宿
    const match = dayText.match(
      /Day (\d+):\s*([\s\S]*?)(?:\n(.*?))?(?:\行程特色:\s*(.*?))?\s*早餐:\s*(.*?)\s*午餐:\s*(.*?)\s*晚餐:\s*(.*?)\s*住宿:\s*(.*?)(?:\s|$)/s
    );

    if (match) {
      const dayNumber = match[1]; // 提取第幾天
      const routeText = match[2].trim(); // 提取行程路線
      const route = routeText.split(" → "); // 按 "→" 分割行程路線
      const highlight = match[4] ? match[4].trim() : ""; // 提取行程特色
      const breakfast = match[5] ? match[5].trim() : ""; // 提取早餐資訊
      const lunch = match[6] ? match[6].trim() : ""; // 提取午餐資訊
      const dinner = match[7] ? match[7].trim() : ""; // 提取晚餐資訊
      const accommodation = match[8] ? match[8].trim() : ""; // 提取住宿資訊

      // 添加每一天的行程與相關資訊
      itinerary.push({
        day: dayNumber,
        route,
        highlight,
        meals: {
          breakfast,
          lunch,
          dinner,
        },
        accommodation,
      });
    } else {
      console.warn(`Day 格式不正確: ${dayText}`);
    }
  });

  console.log(itinerary);
  return itinerary;
};

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
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
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
                    <div className="mt-1">
                      {product.title
                        ? product.title.split("|")[1].trim().substring(0, 4)
                        : ""}
                    </div>
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
                        <div className="mt-1">
                          {itinerary.length > 0 ? itinerary[0].route[1] : ""}
                        </div>
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
                    <small>Day {itinerary.length}</small>
                    <div className="mt-1">
                      {product.title
                        ? product.title.split("|")[1].trim().substring(0, 4)
                        : ""}
                    </div>
                    <div>JX 193</div>
                  </div>
                  <div className="col-md-12 border-end border-3 border-danger-subtle py-2">
                    <div className="row">
                      <div className="col">
                        <small>Departure</small>
                        <div className="mt-1">
                          {itinerary.length > 0 ? itinerary[0].route[1] : ""}
                        </div>
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

          {/* 顯示行程內容圖片 */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <div className="row justify-content-center">
                {product.imagesUrl &&
                  product.imagesUrl.map((url, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                      <img
                        src={url}
                        alt={`Image ${index + 1}`}
                        className="img-fluid rounded"
                        style={{
                          height: "300px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* 每日行程內容*/}
          <div>
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
                          <li>{day.meals.breakfast}</li>
                          <li>{day.meals.lunch}</li>
                          <li>{day.meals.dinner}</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-1">
                          <i class="fa-solid fa-bed">
                            <span className="ms-1">住宿</span>
                          </i>
                        </div>
                        <p>{day.accommodation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
