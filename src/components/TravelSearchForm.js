import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const countries = [
  "東京",
  "京都",
  "大阪",
  "北海道",
  "沖繩",
  "福岡",
  "名古屋",
  "神戶",
  "橫濱",
  "奈良",
  "札幌",
  "鹿兒島",
  "熊本",
  "長崎",
  "宮崎",
  "宮城",
  "新潟",
  "長野",
  "岐阜",
  "靜岡",
  "石川",
  "福井",
  "滋賀",
  "和歌山",
  "愛媛",
  "高知",
  "德島",
  "香川",
  "鳥取",
  "島根",
  "岡山",
  "廣島",
  "山口",
  "山形",
  "岩手",
  "秋田",
  "青森",
  "富山",
  "福島",
  "群馬",
  "埼玉",
  "千葉",
  "茨城",
  "栃木",
  "山梨",
  "愛知",
  "三重",
  "佐賀",
  "大分",
  "沖繩",
];

const TravelSearchForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // 處理搜尋邏輯
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Departure:", departure);
    console.log("Destination:", destination);
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
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
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
          <button type="submit" className="travel-search-form__button">
            搜尋
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelSearchForm;
