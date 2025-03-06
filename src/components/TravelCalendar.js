import React, { useState, useEffect, useRef, useCallback } from "react";
import moment from "moment";

const TravelCalendar = ({ product, onDateSelected }) => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [calendarDates, setCalendarDates] = useState([]);
  const calendarRef = useRef(null);
  const currentDate = moment();

  // 設定日曆的結束日期為 2025 年底
  const endDate = moment("2025-12-31");

  // 取得當前月份的所有日期
  const getDatesInMonth = useCallback(() => {
    const startOfMonth = selectedDate.clone().startOf("month");
    const endOfMonth = selectedDate.clone().endOf("month");
    const date = startOfMonth.clone();
    const datesArray = [];

    while (date.isSameOrBefore(endOfMonth, "day")) {
      datesArray.push(date.clone());
      date.add(1, "day");
    }

    // 確保第一週從週日開始
    while (datesArray[0].day() !== 0) {
      datesArray.unshift(datesArray[0].clone().subtract(1, "day"));
    }

    // 確保最後一週到週六結束
    while (datesArray[datesArray.length - 1].day() !== 6) {
      datesArray.push(datesArray[datesArray.length - 1].clone().add(1, "day"));
    }

    return datesArray;
  }, [selectedDate]);

  // 當月份變更時，更新日期陣列
  useEffect(() => {
    setCalendarDates(getDatesInMonth());
  }, [getDatesInMonth]);

  // 處理日期選擇
  const handleDateClick = (date) => {
    if (date.isBefore(currentDate, "day") || date.isAfter(endDate)) return;
    setSelectedDate(date);
    onDateSelected(date);
  };

  // 判斷日期是否可點選
  const isDateSelectable = (date) => {
    return !date.isBefore(currentDate, "day") && !date.isAfter(endDate);
  };

  // 切換到上個月
  const goToPreviousMonth = () => {
    setSelectedDate(selectedDate.clone().subtract(1, "month"));
  };

  // 切換到下個月
  const goToNextMonth = () => {
    setSelectedDate(selectedDate.clone().add(1, "month").startOf("month"));
  };

  // 確保每個月份渲染完成後重新計算佈局
  useEffect(() => {
    if (calendarRef.current) {
      // 強制重新計算佈局，確保所有日期格子能正確顯示
      const cells = calendarRef.current.querySelectorAll(".day-cell");
      if (cells.length > 0) {
        // 觸發重繪
        setTimeout(() => {
          cells.forEach((cell) => {
            cell.style.display = "flex";
          });
        }, 0);
      }
    }
  }, [calendarDates]);

  // 計算日期格子的類名
  const getDateCellClassName = (date) => {
    return `day-cell ${date.isSame(selectedDate, "day") ? "selected" : ""} ${
      !isDateSelectable(date) ? "past-date" : ""
    } ${date.month() !== selectedDate.month() ? "adjacent-month-date" : ""} ${
      date.day() === 6 ? "saturday" : ""
    }`;
  };

  return (
    <div className="travel-calendar" ref={calendarRef}>
      <div className="calendar-header">
        <div className="prev-month-container">
          <button
            className={`prev-month ${
              selectedDate.isSame(currentDate, "month") ? "d-none" : ""
            }`}
            onClick={goToPreviousMonth}
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
              selectedDate.isSame(endDate, "month") ? "d-none" : ""
            }`}
            onClick={goToNextMonth}
            disabled={selectedDate.isSame(endDate, "month")}
          >
            <i
              className={`fas fa-chevron-right ${
                selectedDate.isSame(endDate, "month") ? "d-none" : "text-white"
              }`}
            ></i>
          </button>
        </div>
      </div>
      <div className="calendar-body">
        {["日", "一", "二", "三", "四", "五", "六"].map((day, index) => (
          <div
            className={`day-name ${index === 6 ? "saturday" : ""}`}
            key={day}
          >
            {day}
          </div>
        ))}
        {calendarDates.map((date) => (
          <div
            key={date.format("YYYY-MM-DD")}
            className={getDateCellClassName(date)}
            onClick={
              isDateSelectable(date) ? () => handleDateClick(date) : null
            }
          >
            <div className="fw-bolder">{date.date()}</div>
            {isDateSelectable(date) && (
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
