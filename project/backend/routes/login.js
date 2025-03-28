
const express = require('express');
const router = express.Router();
const db = require('../database/db'); // 引入数据库模块
const bcrypt = require('bcrypt'); // 用于密码加密和验证

// 验证用户凭据的函数
const validateUserCredentials = (username, password, callback) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) return callback(err);
        const isValid = user && bcrypt.compareSync(password, user.password); // 验证加密密码
        callback(null, isValid ? user : null);
    });
};

// 登录路由
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // 输入校验
    if (!username || !password) {
        return res.status(400).json({ error: '用户名和密码不能为空' });
    }

    // 验证用户凭据
    validateUserCredentials(username, password, (err, user) => {
        if (err) {
            console.error('数据库错误:', err.message); // 记录错误日志
            return res.status(500).json({ error: '数据库错误', details: err.message });
        }
        if (user) {
            res.json({ message: '登录成功', userId: user.id });
        } else {
            res.status(401).json({ error: '用户名或密码错误' });
        }
    });
});

module.exports = router;

