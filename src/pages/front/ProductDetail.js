import { useContext, useMemo, useState, useEffect } from "react";
import { AppContext } from "../../store/AppContext";
import {
  useOutletContext,
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import TravelCalendar from "../../components/TravelCalendar";
import { formatNumberWithCommas } from "../../utils/helpers";
import ButtonWithLoading from "../../components/ButtonWithLoading";

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
      /Day (\d+):\s*([\s\S]*?)(?:\n(.*?))?(?:行程特色:\s*(.*?))?\s*早餐:\s*(.*?)\s*午餐:\s*(.*?)\s*晚餐:\s*(.*?)\s*住宿:\s*(.*?)(?:\s|$)/s
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
  const [activeNavItem, setActiveNavItem] = useState("flight-info");
  const navigate = useNavigate();
  const { setSelectedDate, setAdultQuantity, setChildrenQuantity } =
    useContext(AppContext);

  const navItems = useMemo(
    () => [
      { id: "flight-info", text: "航班資訊" },
      { id: "daily-itinerary", text: "每日行程" },
      { id: "cost-description", text: "費用說明" },
      { id: "booking-info", text: "預訂須知" },
    ],
    []
  );

  const costDescriptionData = [
    {
      title: "團費說明",
      items: ["訂金：$15,000"],
    },
    {
      title: "費用包含",
      items: [
        "含 800 萬旅行業責任保險及 30 萬意外醫療險 ( 旅客未滿 15 歲或 70 歲以上，依法限制最高新台幣 250 萬旅行業責任險)",
        "履約保證保險保額新台幣一億零二佰萬元。",
        "機場稅、燃油費",
      ],
    },
    {
      title: "費用不含",
      items: [
        "導遊領隊、司機小費 NT$300/每日。",
        "私人消費：如行李超重費、飲料酒類、洗衣、電話、電報及私人交通費等。",
        "本行程報價為2人一室,旅客報名指定單人房時須補單人房價差。",
        "不含旅遊平安保險及旅遊不便險等其他私人保險項目",
        "不含台灣及日本兩地因防疫政策而產生之相關費用（PCR 檢測及證明等費用、台灣疫苗施打證明費用等等）。",
        "簽證：請洽客服。",
      ],
    },
  ];

  const bookingInfoData = [
    {
      title: "行程規定",
      items: [
        "行程及餐食將會視情況（如季節、預約狀況、觀光地區休假及住宿飯店地點）調整。",
        "如有行程不參加者，視為自動放棄，恕無法退費。",
        "如有特殊餐食者，請於出發前至少5天(不含假日)告知承辦人員，以便提早為您安排。",
        "旅遊期間，敬請旅客隨時注意自身安全並妥善保管財物，以免發生意外或個人財物損失等事宜。",
        "自備慣用藥品或外用藥膏，避免攜帶粉狀藥物，以免被誤為毒品。途中如身體不適，不隨便吃別人的藥，宜告知領隊安排就醫。",
        "孕婦及年長者或健康狀況不良者，宜有家人隨行，且應先到醫院索取附有中文說明的英文診斷書備用。",
        "在出國前，建議您前往有旅遊醫學門診之醫院諮詢評估，以確保您的健康狀況。",
      ],
    },
    {
      title: "貼心提醒",
      items: [
        "成團人數必須達到 12 人以上，方可成團。本行程最低出團為 12 人以上（含），最多為 35 人以下（含），將派遣合格領隊隨行服務。",
        "開票後不可更改姓名或拼音。",
        "包機團體機位報名付訂後，如取消則不退還訂金。",
        "本公司將依正式取得飯店之結果，綜合當地實際交通等情況、調整安排旅遊行程、飯店入住之先後順序或旅遊路線，敬請以行前說明資料之行程表為準。",
        "旅客若於旅遊中因法定傳染病原因，所增加之住宿、餐食、交通費用由旅客自行負擔，建議旅客若有疑慮可自行洽詢保險公司購買旅遊平安保險。",
        "若遇大風雪、火山、颱風、地震等不可抗力情況，本公司將以安全順利為優先考量下，變更相關行程。",
      ],
    },
  ];

  const addToCart = async () => {
    // 設置 loading 狀態為 true，防止重複點擊
    setIsLoading(true);

    if (cartData?.carts?.length > 0) {
      alert("購物車尚有未確認的行程");
      navigate("/cart");
      setIsLoading(false); // 設置 loading 狀態為 false
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
      const _res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      getCart();
      navigate("/cart");
    } catch (error) {
      console.error("加入購物車失敗:", error);
      console.error("加入購物車失敗:", error);
      // 已經設置了 isLoading 為 true，但在這裡可能需要顯示錯誤提示
      alert("加入購物車失敗，請稍後再試");
    } finally {
      // 無論成功或失敗，都將 loading 狀態設為 false
      setIsLoading(false);
    }
  };

  const onDateSelected = (date) => {
    setTempEelectedDate(date);
  };

  // 檢查是否可以報名
  const canRegister = (adult, children, selectedDate) => {
    return adult + children > 0 && selectedDate !== null;
  };

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        setIsLoading(true);
        const productRes = await axios.get(
          `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
        );
        setProduct(productRes.data.product);
        setItinerary(parseItinerary(productRes.data.product.content)); // 解析行程
      } catch (error) {
        console.error("產品詳情獲取失敗:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProduct(id);
  }, [id]);

  useEffect(() => {
    setIsButtonDisabled(
      !canRegister(tempAdult, tempChildren, tempSelectedDate)
    );
  }, [tempAdult, tempChildren, tempSelectedDate]);

  // 監聽滾動事件，更新當前活躍的導航項
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // 添加偏移量以提前激活

      // 獲取所有區塊的位置
      const sections = navItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (element) {
            return {
              id: item.id,
              offsetTop: element.offsetTop,
              offsetHeight: element.offsetHeight,
            };
          }
          return null;
        })
        .filter(Boolean);

      // 找出當前滾動位置對應的區塊
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offsetTop) {
          setActiveNavItem(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // 處理麵包屑導航的URL
  const getBreadcrumbLinks = () => {
    // 預設值
    const links = {
      country: { name: "日本", url: "/tour?country=日本" },
      type: { name: "團體", url: "/tour?type=團體" },
      category: { name: product.category || "", url: "" },
    };

    // 如果產品有特定的國家/地區分類
    if (product.origin) {
      links.country.name = product.origin;
      links.country.url = `/tour?country=${product.origin}`;
    }

    // 如果產品有特定的類型分類
    if (product.type) {
      links.type.name = product.type;
      links.type.url = `/tour?type=${product.type}`;
    }

    return links;
  };

  const breadcrumbLinks = getBreadcrumbLinks();

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
        {/* 麵包屑導航 */}
        <div className="breadcrumb-nav mt-5">
          <div className="breadcrumb-nav__item">
            <Link to="/">首頁</Link>
          </div>
          <div className="breadcrumb-nav__item">
            <Link to={breadcrumbLinks.country.url}>
              {breadcrumbLinks.country.name}
            </Link>
          </div>
          <div className="breadcrumb-nav__item">
            <Link to={breadcrumbLinks.type.url}>
              {breadcrumbLinks.type.name}
            </Link>
          </div>
          <div className="breadcrumb-nav__item breadcrumb-nav__item--active">
            <span>{product.category}</span>
          </div>
        </div>
        {/* 預訂區塊 */}
        <div className="row justify-content-between mt-5 mb-7">
          {/* 載入日曆 */}
          <div className="col-md-5 mb-3">
            <h2 className="mb-3 d-md-none">{product.title}</h2>
            <div className="calendar-wrapper w-100">
              <TravelCalendar
                product={product}
                onDateSelected={onDateSelected}
              ></TravelCalendar>
            </div>
            {/* 行程描述 */}
            <div className="product-description mt-4">
              <h5 className="mb-3">行程介紹</h5>
              <p className="description-text">{product.description}</p>
            </div>
          </div>
          {/* 行程標題描述及人數選擇*/}
          <div className="col-md-7 d-flex flex-column justify-content-between">
            <div className="product-detail-sidebar">
              <div className="product-title">
                <h2 className="mb-3 d-none d-md-block">{product.title}</h2>
              </div>
              {/* 行程特色 */}
              <div className="tour-features mb-4">
                <h5 className="mb-3">行程特色</h5>
                <div className="tour-features__list">
                  <div className="tour-feature-item">
                    <i className="fas fa-clock feature-icon"></i>
                    <span className="feature-text">
                      行程天數：{itinerary.length} 天
                    </span>
                  </div>
                  <div className="tour-feature-item">
                    <i className="fas fa-map-marker-alt feature-icon"></i>
                    <span className="feature-text">
                      目的地：{product.category}
                    </span>
                  </div>
                  <div className="tour-feature-item">
                    <i className="fas fa-users feature-icon"></i>
                    <span className="feature-text">成團人數：12-35 人</span>
                  </div>
                  <div className="tour-feature-item">
                    <i className="fas fa-utensils feature-icon"></i>
                    <span className="feature-text">餐食：含早餐</span>
                  </div>
                </div>
              </div>
              {/* 價格提示 */}
              <div className="price-highlight mb-4">
                <div className="price-highlight__header">
                  <span>優惠價格</span>
                  <span className="price-amount">
                    ${formatNumberWithCommas(product.price)}
                  </span>
                </div>
                <div className="price-highlight__note">
                  <i className="fas fa-info-circle me-2"></i>
                  <span>兒童價格享有8折優惠</span>
                </div>
              </div>
              {/* 人數選擇 */}
              <div className="passenger-select">
                <div className="passenger-select__container">
                  <div className="passenger-select__item">
                    <div className="passenger-select__header">
                      <div className="passenger-select__type">
                        <i className="fas fa-user"></i>
                        大人
                      </div>
                      <div className="passenger-select__price">
                        ${formatNumberWithCommas(product.price)}/人
                      </div>
                    </div>
                    <div className="input-group w-100 align-items-center">
                      <select
                        name=""
                        className="form-select"
                        id=""
                        value={tempAdult}
                        onChange={(e) => {
                          setTempAdult(e.target.value * 1);
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
                  <div className="passenger-select__item">
                    <div className="passenger-select__header">
                      <div className="passenger-select__type">
                        <i className="fas fa-child fs-4"></i>
                        小孩
                      </div>
                      <div className="passenger-select__price">
                        ${formatNumberWithCommas(product.price * 0.8)}/人
                      </div>
                    </div>
                    <div className="input-group w-100 align-items-center">
                      <select
                        name=""
                        className="form-select"
                        id=""
                        value={tempChildren}
                        onChange={(e) => {
                          setTempChildren(e.target.value * 1);
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

              <ButtonWithLoading
                className="w-100 booking-btn"
                onClick={addToCart}
                isLoading={isLoading}
                disabled={isButtonDisabled}
                loadingText="報名中..."
              >
                {isButtonDisabled ? "請選擇日期和人數" : "報名"}
              </ButtonWithLoading>
            </div>
          </div>
        </div>
        {/* 事項列表 */}
        <div className="my-6">
          <ul className="product-nav-tabs">
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`product-nav-tabs__item ${
                  activeNavItem === item.id ? "active" : ""
                }`}
                onClick={() => {
                  const targetRef = document.getElementById(item.id);
                  targetRef.scrollIntoView({ behavior: "smooth" });
                  setActiveNavItem(item.id);
                }}
              >
                <Link className="link">{item.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* 航班資訊 */}
        <div className="flight-info mb-6" id="flight-info">
          <div className="flight-info__title">
            <h5>航班資訊</h5>
            <h6>參考航班時刻表</h6>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="flight-info__card">
                <div className="flight-info__card-header">
                  <div className="day-number">Day 1</div>
                  <div className="destination">
                    {product.title
                      ? product.title.split("|")[1].trim().substring(0, 4)
                      : ""}
                  </div>
                  <div className="flight-number">JX 189</div>
                </div>
                <div className="flight-info__card-body">
                  <div className="flight-route">
                    <div className="departure">
                      <div className="label">出發地</div>
                      <div className="location">桃園國際機場</div>
                      <div className="time">06:45</div>
                    </div>
                    <div className="flight-icon">
                      <i className="fa-solid fa-plane"></i>
                    </div>
                    <div className="arrival">
                      <div className="label">目的地</div>
                      <div className="location">
                        {itinerary.length > 0 ? itinerary[0].route[1] : ""}
                      </div>
                      <div className="time">10:20</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="flight-info__card">
                <div className="flight-info__card-header">
                  <div className="day-number">Day {itinerary.length}</div>
                  <div className="destination">
                    {product.title
                      ? product.title.split("|")[1].trim().substring(0, 4)
                      : ""}
                  </div>
                  <div className="flight-number">JX 193</div>
                </div>
                <div className="flight-info__card-body">
                  <div className="flight-route">
                    <div className="departure">
                      <div className="label">出發地</div>
                      <div className="location">
                        {itinerary.length > 0 ? itinerary[0].route[1] : ""}
                      </div>
                      <div className="time">18:45</div>
                    </div>
                    <div className="flight-icon">
                      <i className="fa-solid fa-plane"></i>
                    </div>
                    <div className="arrival">
                      <div className="label">目的地</div>
                      <div className="location">桃園國際機場</div>
                      <div className="time">23:15</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 行程內容 */}
        <div className="tour-content" id="daily-itinerary">
          <div className="tour-content__title">
            <span className="tour-content__title-main">每日行程</span>
            <span className="tour-content__title-sub">Daily Tour</span>
          </div>

          {/* 顯示行程內容圖片 */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              {/* 桌面版顯示 */}
              <div className="row justify-content-center d-none d-sm-flex">
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
              {/* 手機版輪播 */}
              <div className="d-block d-sm-none">
                <div
                  id="tourImageCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators">
                    {product.imagesUrl &&
                      product.imagesUrl.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          data-bs-target="#tourImageCarousel"
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-current={index === 0 ? "true" : "false"}
                          aria-label={`Slide ${index + 1}`}
                        ></button>
                      ))}
                  </div>
                  <div className="carousel-inner">
                    {product.imagesUrl &&
                      product.imagesUrl.map((url, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${
                            index === 0 ? "active" : ""
                          }`}
                        >
                          <img
                            src={url}
                            alt={`Image ${index + 1}`}
                            className="d-block w-100"
                            style={{
                              height: "300px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#tourImageCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#tourImageCarousel"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 每日行程內容*/}
          <div>
            {itinerary.map((day) => (
              <div className="day-container" key={day.day}>
                <div className="day-header">
                  <div className="day-number">DAY {day.day}</div>
                  <div className="day-route">{day.route.join(" → ")}</div>
                </div>
                <div className="day-content">
                  <div className="highlight-section">
                    <div className="highlight-title">
                      <i className="fa-solid fa-star"></i> 行程特色
                    </div>
                    <div className="highlight-content">{day.highlight}</div>
                  </div>
                  <div className="info-section">
                    <div className="meals-info">
                      <div className="info-title">
                        <i className="fa-solid fa-utensils"></i> 餐食
                      </div>
                      <ul>
                        <li>{day.meals.breakfast}</li>
                        <li>{day.meals.lunch}</li>
                        <li>{day.meals.dinner}</li>
                      </ul>
                    </div>
                    <div className="accommodation-info">
                      <div className="info-title">
                        <i className="fa-solid fa-bed"></i> 住宿
                      </div>
                      <p>{day.accommodation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 費用說明 */}
        <div className="info-section" id="cost-description">
          <div className="info-section__title">
            <span className="info-section__title-text">費用說明</span>
          </div>
          <div className="info-container">
            {costDescriptionData.map((section, index) => (
              <div className="info-block" key={index}>
                <div className="info-header">
                  <h3 className="info-title">{section.title}</h3>
                </div>
                <div className="info-content">
                  <ul>
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 預訂須知 */}
        <div className="info-section" id="booking-info">
          <div className="info-section__title">
            <span className="info-section__title-text">預訂須知</span>
          </div>
          <div className="info-container">
            {bookingInfoData.map((section, index) => (
              <div className="info-block" key={index}>
                <div className="info-header">
                  <h3 className="info-title">{section.title}</h3>
                </div>
                <div className="info-content">
                  <ul>
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
