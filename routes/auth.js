const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

// 註冊路由
router.post("/signup", authController.postSignup);

module.exports = router;