const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // 在实际应用中，可以清除用户相关会话或令牌
    res.json({ message: '登出成功' });
});

module.exports = router;
