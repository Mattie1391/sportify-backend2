// utils/ validators.js

/**
 * 檢查值是否為 undefined
 * @param {any} value - 要檢查的值
 * @returns {boolean} - 如果值為 undefined，回傳 true；否則回傳 false
 */
const isUndefined = (value) => {
    return typeof value === 'undefined';
  };
  
  /**
   * 檢查字串是否為無效的字串
   * @param {any} str - 要檢查的字串
   * @returns {boolean} - 如果字串為 null、非字串類型或為空字串，回傳 true；否則回傳 false
   */
  const isNotValidString = (str) => {
    return typeof str !== 'string' || str.trim() === '';
  };
  
  module.exports = {
    isUndefined,
    isNotValidString,
  };