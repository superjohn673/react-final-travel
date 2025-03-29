import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const cities = ["台北", "台中", "高雄"];
const countries = [
  "東京",
  "京都",
  "大阪",
  "札幌",
  "函館",
  "福岡",
  "名古屋",
  "神戶",
  "橫濱",
  "奈良",
  "鹿兒島",
  "熊本",
  "長崎",
  "仙台",
  "岐阜",
  "靜岡",
  "和歌山",
  "山形",
  "岩手",
  "秋田",
  "青森",
  "富山",
  "福島",
  "栃木",
  "山梨",
  "大分",
];

const TravelSearchForm = ({ onToggle }) => {
  // 設定今天的日期作為預設值
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    let url = "";
    switch (destination) {
      case "東京":
      case "橫濱":
      case "靜岡":
      case "栃木":
      case "山梨":
        url = "/area-japan/kanto";
        break;
      case "京都":
      case "大阪":
      case "神戶":
      case "奈良":
      case "和歌山":
        url = "/area-japan/kansai";
        break;
      case "札幌":
      case "函館":
        url = "/area-japan/hokkaido";
        break;
      case "仙台":
      case "山形":
      case "岩手":
      case "秋田":
      case "青森":
      case "福島":
        url = "/area-japan/tohoku";
        break;
      case "名古屋":
      case "岐阜":
      case "富山":
        url = "/area-japan/hokuriku";
        break;
      case "福岡":
      case "鹿兒島":
      case "熊本":
      case "長崎":
      case "大分":
        url = "/area-japan/kyushu";
        break;
      default:
        return;
    }

    // 使用 navigate 進行跳轉
    navigate(url);
  };

  return (
    <div className="travel-search-form">
      <form onSubmit={handleSearch}>
        <div className="travel-search-form__row">
          <div className="travel-search-form__group">
            <label htmlFor="start-date">出發日期</label>
            <DatePicker
              id="start-date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="選擇出發日期"
              className="travel-search-form__input"
              minDate={today} // 設定最小可選日期為今天
            />
          </div>
          <div className="travel-search-form__group">
            <label htmlFor="end-date">結束日期</label>
            <DatePicker
              id="end-date"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="選擇結束日期"
              className="travel-search-form__input"
              minDate={startDate || today} // 設定最小可選日期為出發日期或今天
            />
          </div>
        </div>
        <div className="travel-search-form__row">
          <div className="travel-search-form__group">
            <label htmlFor="departure">旅遊出發地</label>
            <select
              id="departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="travel-search-form__input"
            >
              <option value="" disabled>
                選擇出發地
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="travel-search-form__group">
            <label htmlFor="destination">旅遊目的地</label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="travel-search-form__input"
            >
              <option value="" disabled>
                選擇目的地
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="travel-search-form__row">
          <button
            type="submit"
            className="travel-search-form__button"
            onClick={onToggle}
          >
            搜尋
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelSearchForm;
