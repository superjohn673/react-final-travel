/**
 * 格式化日期字符串為 YYYY-MM-DD 格式
 * @param {string | number | Date} dateInput - 日期字符串、Unix Timestamp 或 Date 物件
 * @returns {string} 格式化後的日期
 */
export const formatDate = (dateInput) => {
  if (!dateInput) return "-";
  const date = new Date(dateInput);
  if (isNaN(date)) return "-"; // 避免無效日期

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * 格式化 Unix 時間戳為 YYYY/MM/DD HH:MM 格式
 * @param {number} timestamp - Unix 時間戳 (秒)
 * @returns {string} 格式化後的日期時間
 */
export const formatDateTime = (timestamp) => {
  if (!timestamp) return "-";
  const date = new Date(timestamp * 1000);
  if (isNaN(date)) return "-";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

/**
 * 格式化數字為千分位格式（加上逗號）
 * @param {number} number - 要格式化的數字
 * @returns {string} 格式化後的數字
 */
export const formatNumberWithCommas = (number) => {
  if (number === null || number === undefined) return "0";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
