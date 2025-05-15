const bcrypt = require("bcrypt");
const dataSource = require("../db/data-source");
const {
    validateName,
    validateEmail,
    validatePassword,
    validatePasswordMatch,
} = require("../utils/validators");

// 使用者註冊功能
async function postSignup(req, res, next) {
    const { name, email, password, password_check } = req.body;
    const userRepository = dataSource.getRepository("User");

    try {
        // 驗證名稱
        const nameError = validateName(name);
        if (nameError) {
            return res.status(400).json({
                status: false,
                message: "欄位未填寫正確",
            });
        }

        // 驗證 Email
        const emailError = validateEmail(email);
        if (emailError) {
            return res.status(400).json({
                status: false,
                message: "欄位未填寫正確",
            });
        }

        // 驗證密碼
        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json({
                status: false,
                message: "欄位未填寫正確",
            });
        }

        // 驗證密碼一致性
        const passwordMatchError = validatePasswordMatch(password, password_check);
        if (passwordMatchError) {
            return res.status(400).json({
                status: false,
                message: "密碼確認錯誤",
            });
        }

        // 檢查 Email 是否已存在
        const existingUser = await userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            return res.status(409).json({
                status: false,
                message: "Email已被使用",
            });
        }

        // 加密密碼
        const hashedPassword = await bcrypt.hash(password, 10);

        // 新增使用者
        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        await userRepository.save(newUser);

        // 回傳成功訊息
        res.status(201).json({
            status: true,
            message: "註冊成功",
            data: {
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                },
            },
        });
    } catch (error) {
        next(error); // 傳遞錯誤至全域錯誤處理
    }
}

module.exports = {
    postSignup,
};