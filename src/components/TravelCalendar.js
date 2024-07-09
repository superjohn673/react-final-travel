import React, { useState } from "react";
import moment from "moment";

const TravelCalendar = ({ product, onDateSelected }) => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const currentDate = moment();

  // 取得當前月份的所有日期
  const datesInMonth = () => {
    const date = selectedDate.clone().startOf("month");
    const datesArray = [];

    // 從當前月份的第一天開始
    while (date.month() === selectedDate.month()) {
      datesArray.push(date.clone());
      date.add(1, "day");
    }

    // 將日期補到第一天是星期日
    while (datesArray[0].day() !== 0) {
      datesArray.unshift(datesArray[0].clone().subtract(1, "day"));
    }

    // 將日期補到最後一天是星期六
    while (datesArray[datesArray.length - 1].day() !== 6) {
      datesArray.push(datesArray[datesArray.length - 1].clone().add(1, "day"));
    }

    return datesArray;
  };

  // 處理日期選擇
  const handleDateClick = (date) => {
    if (date.isBefore(currentDate, "day") || date.isAfter(moment("2024-12-31")))
      return; // 如果日期在當前日期之前或2024年12月31日之後,不做任何操作
    setSelectedDate(date);
    // 調用父組件傳遞的 onDateSelected 回調函數
    onDateSelected(date);
    // 在這裡添加你的價格查詢邏輯
    console.log(`選擇的日期: ${date.format("YYYY-MM-DD")}`);
  };

  // 渲染日曆
  return (
    <div className="travel-calendar">
      <div className="calendar-header">
        <div className="prev-month-container">
          <button
            className={`prev-month ${
              selectedDate.isSame(currentDate, "month") ? "d-none" : ""
            }`}
            onClick={
              selectedDate.isSame(currentDate, "month")
                ? () => {}
                : () =>
                    setSelectedDate(selectedDate.clone().subtract(1, "month"))
            }
            disabled={selectedDate.isSame(currentDate, "month")}
          >
            <i className="fas fa-chevron-left text-white"></i>
          </button>
        </div>
        <div className="current-month-container">
          <span className="current-month">
            {selectedDate.format("YYYY年MM月")}
          </span>
        </div>
        <div className="next-month-container">
          <button
            className={`next-month ${
              selectedDate.isSame(moment("2024-12-01"), "month") ? "d-none" : ""
            }`}
            onClick={() =>
              setSelectedDate(
                selectedDate.clone().add(1, "month").startOf("month")
              )
            }
          >
            <i
              className={`fas fa-chevron-right ${
                selectedDate.isSame(moment("2024-12-01"), "month")
                  ? "d-none"
                  : "text-white"
              }`}
            ></i>
          </button>
        </div>
      </div>
      <div className="calendar-body">
        {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
          <div className="day-name" key={day}>
            {day}
          </div>
        ))}
        {datesInMonth().map((date) => (
          <div
            key={date.format("YYYY-MM-DD")}
            className={`day-cell ${
              date.isSame(selectedDate, "day") ? "selected" : ""
            } ${
              date.isBefore(currentDate, "day") ||
              date.isAfter(moment("2024-12-31"))
                ? "past-date"
                : ""
            } ${
              date.month() !== selectedDate.month() ? "adjacent-month-date" : ""
            }`}
            onClick={
              date.isBefore(currentDate, "day") ||
              date.isAfter(moment("2024-12-31"))
                ? null
                : () => handleDateClick(date)
            }
          >
            <div className="fw-bolder">{date.date()}</div>
            {!date.isBefore(currentDate, "day") &&
              !date.isAfter(moment("2024-12-31")) && (
                <small>
                  {typeof product.price === "number"
                    ? product.price.toLocaleString()
                    : ""}
                </small>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelCalendar;
