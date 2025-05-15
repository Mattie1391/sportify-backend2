const express = require('express');
const bcrypt = require('bcrypt');
const { isUndefined, isNotValidString } = require('../utils/validators'); // 假設有這些自訂函式
const { logger } = require('../utils/logger'); // 假設有 logger 工具
const AppDataSource = require('../db/data-source'); // 假設有 ORM 的 data source
const router = express.Router();
const generateJWT = require('../utils/generateJWT'); // 假設有 JWT 生成工具 
const config = require('../config/index');


module.exports = router;