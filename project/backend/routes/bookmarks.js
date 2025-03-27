const express = require('express');
const router = express.Router();
const db = require('../database/db'); // 引入数据库模块

// 查询用户书签的函数（抽离为独立模块，便于维护和复用）
const getBookmarksByUserId = (userId, callback) => {
    db.all('SELECT * FROM bookmarks WHERE user_id = ?', [userId], callback);
};

// 路由：根据用户ID获取书签
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    // 验证用户ID是否为有效整数
    if (!Number.isInteger(Number(userId))) {
        return res.status(400).json({ error: '无效的用户ID' });
    }

    // 调用函数获取书签
    getBookmarksByUserId(userId, (err, bookmarks) => {
        if (err) {
            console.error('数据库错误:', err); // 打印详细错误信息
            return res.status(500).json({ error: '数据库错误', details: err.message });
        }

        // 返回书签数据
        res.json(bookmarks);
    });
});

module.exports = router;

