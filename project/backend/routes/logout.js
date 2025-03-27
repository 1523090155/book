const express = require('express');
const router = express.Router();

// 假设使用会话
router.post('/', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error('会话销毁失败:', err);
                return res.status(500).json({ error: '无法登出，请稍后再试' });
            }
            res.clearCookie('connect.sid'); // 可选：清除客户端的会话Cookie
            res.json({ message: '登出成功' });
        });
    } else {
        res.json({ message: '未检测到会话，但返回登出成功状态' });
    }
});

module.exports = router;
