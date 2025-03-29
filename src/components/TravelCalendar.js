import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "moment/locale/zh-tw"; // 加載繁體中文語言包

const TravelCalendar = ({ product, onDateSelected }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [calendarReady, setCalendarReady] = useState(false);
  const currentDate = new Date();
  // 設置當天日期為 23:59:59，確保當天不可選
  const adjustedCurrentDate = new Date(currentDate);
  adjustedCurrentDate.setHours(0, 0, 0, 0);

  const endDate = new Date("2025-12-31");
  const calendarRef = useRef(null);

  // 設置 moment 語言為繁體中文
  useEffect(() => {
    moment.locale("zh-tw");
  }, []);

  // 監聽窗口大小變化，精確檢測中等尺寸螢幕
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const isMd = windowWidth <= 991.98 && windowWidth >= 768;
      setIsMediumScreen(isMd);
    };

    handleResize(); // 初始設置
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 在組件掛載後強制重新渲染日曆一次，解決初始載入時的顯示問題
  useEffect(() => {
    // 等待 DOM 完全渲染
    const timer = setTimeout(() => {
      setCalendarReady(true);

      // 如果日曆容器已存在，觸發一次調整
      if (calendarRef.current) {
        applyCalendarStyles();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // 專門處理中等尺寸螢幕上日曆的顯示問題
  useEffect(() => {
    if (calendarReady && calendarRef.current) {
      applyCalendarStyles();

      // 監聽日曆內容變化
      const observer = new MutationObserver(applyCalendarStyles);
      observer.observe(calendarRef.current, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, [isMediumScreen, calendarReady]);

  // 提取樣式應用邏輯到單獨的函數
  const applyCalendarStyles = () => {
    const calendarContainer = calendarRef.current;
    if (!calendarContainer) return;

    // 調整容器尺寸和溢出處理
    calendarContainer.style.overflow = "hidden";

    // 查找並調整日期單元格
    const dateNodes = calendarContainer.querySelectorAll(
      ".react-datepicker__day"
    );
    if (dateNodes.length) {
      dateNodes.forEach((node) => {
        node.style.margin = "2px";
        node.style.padding = "0";
        node.style.width = "24px";
        node.style.height = "32px";
        node.style.fontSize = "12px";
        node.style.lineHeight = "14px";
      });
    }

    // 查找並調整日期單元格內的價格文字
    const priceTags = calendarContainer.querySelectorAll(".day-cell small");
    if (priceTags.length) {
      priceTags.forEach((tag) => {
        tag.style.fontSize = "9px";
        tag.style.margin = "2px 0 0 0";
        tag.style.padding = "0";
        tag.style.lineHeight = "1.2";
      });
    }

    // 查找並調整日期名稱
    const dayNames = calendarContainer.querySelectorAll(
      ".react-datepicker__day-name"
    );
    if (dayNames.length) {
      dayNames.forEach((name) => {
        name.style.margin = "2px";
        name.style.padding = "2px";
        name.style.fontSize = "12px";
        name.style.width = "24px";
        name.style.height = "18px";
        name.style.lineHeight = "16px";
      });
    }

    // 調整標題區域
    const header = calendarContainer.querySelector(".calendar-header");
    if (header) {
      header.style.padding = "8px";
      header.style.minHeight = "50px";

      const monthText = header.querySelector(".current-month");
      if (monthText) {
        monthText.style.fontSize = "14px";
      }

      const buttons = header.querySelectorAll("button");
      if (buttons.length) {
        buttons.forEach((btn) => {
          btn.style.width = "28px";
          btn.style.height = "28px";
          btn.style.padding = "2px";
        });
      }
    }

    // 強制觸發重新計算布局
    window.dispatchEvent(new Event("resize"));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelected(moment(date));
  };

  const renderCustomHeader = ({ monthDate, decreaseMonth, increaseMonth }) => {
    const isCurrentMonth =
      new Date(monthDate).getMonth() === currentDate.getMonth() &&
      new Date(monthDate).getFullYear() === currentDate.getFullYear();

    const isLastMonth =
      new Date(monthDate).getMonth() === endDate.getMonth() &&
      new Date(monthDate).getFullYear() === endDate.getFullYear();

    return (
      <div className="calendar-header">
        {/* 修改左側按鈕，不使用 d-none 以保持布局 */}
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={isCurrentMonth}
          className={`prev-month ${isCurrentMonth ? "invisible" : ""}`}
        >
          <i className="fas fa-chevron-left text-white"></i>
        </button>
        <div className="current-month-container">
          <span className="current-month">
            {moment(monthDate).format("YYYY年MM月")}
          </span>
        </div>
        {/* 修改右側按鈕，不使用 d-none 以保持布局 */}
        <button
          type="button"
          onClick={increaseMonth}
          disabled={isLastMonth}
          className={`next-month ${isLastMonth ? "invisible" : ""}`}
        >
          <i className="fas fa-chevron-right text-white"></i>
        </button>
      </div>
    );
  };

  const renderDayContents = (day, date) => {
    // 檢查是否是當天或過去日期
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPastDate = date <= today;
    const isFutureDate = date > endDate;
    const isSelectable = !isPastDate && !isFutureDate;
    const isSaturday = date.getDay() === 6;

    return (
      <div className="day-cell">
        <div
          className={`fw-bolder ${isMediumScreen ? "md-screen" : ""} ${
            isSaturday ? "saturday-text" : ""
          }`}
        >
          {day}
        </div>
        {isSelectable && (
          <small>
            {typeof product.price === "number"
              ? product.price.toLocaleString()
              : ""}
          </small>
        )}
      </div>
    );
  };

  return (
    <div
      className={`travel-calendar ${isMediumScreen ? "md-screen" : ""}`}
      ref={calendarRef}
    >
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={new Date(currentDate.getTime() + 86400000)} // 明天開始可選
        maxDate={endDate}
        renderCustomHeader={renderCustomHeader}
        renderDayContents={renderDayContents}
        inline
        calendarClassName={`custom-calendar ${
          isMediumScreen ? "md-screen" : ""
        }`}
        dayClassName={(date) => {
          const classNames = [];
          if (date.getDay() === 6) classNames.push("saturday");
          if (date.getTime() === selectedDate.getTime())
            classNames.push("selected-date");
          return classNames.join(" ");
        }}
        locale="zh-TW"
        dateFormat="yyyy/MM/dd"
        showMonthDropdown={false}
        showYearDropdown={false}
        disabledKeyboardNavigation
        fixedHeight
        onMonthChange={() => {
          // 在月份變更時也重新應用樣式
          setTimeout(applyCalendarStyles, 50);
        }}
      />
    </div>
  );
};

export default TravelCalendar;
