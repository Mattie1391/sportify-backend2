// 驗證名稱格式
function validateName(name) {
  if (!name || name.length < 2 || name.length > 10 || /[^a-zA-Z0-9]/.test(name)) {
      return "使用者名稱必須為2-10個字，且不可包含特殊符號或空白";
  }
  return null;
}

// 驗證 Email 格式
function validateEmail(email) {
  const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
  if (!email || !emailRegex.test(email)) {
      return "Email 格式不正確";
  }
  return null;
}

// 驗證密碼格式
function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  if (!password || !passwordRegex.test(password)) {
      return "密碼需要包含大小寫字母與數字，長度為8-16個字，且皆不可有空白";
  }
  return null;
}

// 確認密碼一致性
function validatePasswordMatch(password, passwordCheck) {
  if (password !== passwordCheck) {
      return "密碼與確認密碼不一致";
  }
  return null;
}

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
};