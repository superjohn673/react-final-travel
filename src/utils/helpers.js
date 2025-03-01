/**
 * 格式化日期字符串為 YYYY-MM-DD 格式
 * @param {string} dateString - 日期字符串
 * @returns {string} 格式化後的日期
 */
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * 格式化數字為千分位格式（加上逗號）
 * @param {number} number - 要格式化的數字
 * @returns {string} 格式化後的數字
 */
export const formatNumberWithCommas = (number) => {
  if (!number && number !== 0) return "0";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
