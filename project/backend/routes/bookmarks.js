const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    db.all('SELECT * FROM bookmarks WHERE user_id = ?', [userId], (err, bookmarks) => {
        if (err) return res.status(500).json({ error: '数据库错误' });
        res.json(bookmarks);
    });
});

module.exports = router;
