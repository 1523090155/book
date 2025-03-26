const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.post('/', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
        if (err) return res.status(500).json({ error: '数据库错误' });
        if (user) {
            res.json({ message: '登录成功', userId: user.id });
        } else {
            res.status(401).json({ error: '用户名或密码错误' });
        }
    });
});

module.exports = router;
