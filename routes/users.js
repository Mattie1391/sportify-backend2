// routes/users.js

const express = require('express');
const bcrypt = require('bcrypt');
const { isUndefined, isNotValidString } = require('../utils/validators'); // 假設有這些自訂函式
const { logger } = require('../utils/logger'); // 假設有 logger 工具
const AppDataSource = require('../db/data-source'); // 假設有 ORM 的 data source
const router = express.Router();
const generateJWT = require('../utils/generateJWT'); // 假設有 JWT 生成工具 
const config = require('../config/index');

router.post('/auth/signup', async (req, res, next) => {
  try {
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}/;
    const { name, email, password } = req.body;

    // 檢查欄位是否正確
    if (isUndefined(name) || isNotValidString(name) || isUndefined(email) || isNotValidString(email) || isUndefined(password) || isNotValidString(password)) {
      logger.warn('欄位未填寫正確');
      res.status(400).json({
        status: 'failed',
        message: '欄位未填寫正確'
      });
      return;
    }

    // 檢查密碼格式
    if (!passwordPattern.test(password)) {
      logger.warn('建立使用者錯誤: 密碼不符合規則，需要包含英文數字大小寫，最短8個字，最長16個字');
      res.status(400).json({
        status: 'failed',
        message: '密碼不符合規則，需要包含英文數字大小寫，最短8個字，最長16個字'
      });
      return;
    }

    // 檢查 Email 是否已被使用
    const userRepository = AppDataSource.getRepository('User');
    const existingUser = await userRepository.findOne({
      where: { email }
    });

    if (existingUser) {
      logger.warn('建立使用者錯誤: Email 已被使用');
      res.status(409).json({
        status: 'failed',
        message: 'Email 已被使用'
      });
      return;
    }

    // 密碼加密處理
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // 建立新使用者
    const newUser = userRepository.create({
      name,
      email,
      role: 'USER',
      password: hashPassword
    });

    const savedUser = await userRepository.save(newUser);
    logger.info('新建立的使用者ID:', savedUser.id);

    // 回傳成功訊息
    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: savedUser.id,
          name: savedUser.name
        }
      }
    });
  } catch (error) {
    logger.error('建立使用者錯誤:', error);
    next(error);
  }
});

router.post('/auth/login/email', async (req, res, next) => {
  try {
    // 密碼規則
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}/;
    const { email, password } = req.body;

    // 檢查欄位是否正確
    if (isUndefined(email) || isNotValidString(email) || isUndefined(password) || isNotValidString(password)) {
      logger.warn('欄位未填寫正確');
      return res.status(400).json({
        status: false,
        errorCode: 'INVALID_FIELDS',
        message: '欄位未填寫正確'
      });
    }

    // 檢查密碼格式
    if (!passwordPattern.test(password)) {
      logger.warn('密碼不符合規則，需要包含大寫、小寫字母及數字，長度 8–16 個字');
      return res.status(400).json({
        status: false,
        errorCode: 'INVALID_PASSWORD_FORMAT',
        message: '密碼不符合規則，需要包含大寫、小寫字母及數字，長度 8–16 個字'
      });
    }

    // 查詢使用者資料庫
    const userRepository = AppDataSource.getRepository('User');
    const existingUser = await userRepository.findOne({
      select: ['id', 'name', 'password'],
      where: { email }
    });

    // 檢查使用者是否存在
    if (!existingUser) {
      logger.warn(`使用者不存在: ${email}`);
      return res.status(400).json({
        status: false,
        errorCode: 'USER_NOT_FOUND',
        message: '使用者不存在或密碼輸入錯誤'
      });
    }

    // 比對密碼
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      logger.warn(`密碼錯誤: ${email}`);
      return res.status(400).json({
        status: false,
        errorCode: 'PASSWORD_INCORRECT',
        message: '使用者不存在或密碼輸入錯誤'
      });
    }

    // 生成 JWT
    const token = await generateJWT(
      { id: existingUser.id },
      config.get('secret.jwtSecret'),
      { expiresIn: `${config.get('secret.jwtExpiresDay')}` }
    );

    // 回傳成功訊息
    res.status(200).json({
      status: true,
      data: {
        token,
        user: {
          id: existingUser.id,
          name: existingUser.name
        }
      }
    });
  } catch (error) {
    logger.error('登入錯誤:', error);
    next(error);
  }
});

module.exports = router;