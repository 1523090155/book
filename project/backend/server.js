const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config(); // 加载环境变量

const loginRoute = require('./routes/login');
const bookmarksRoute = require('./routes/bookmarks');
const logoutRoute = require('./routes/logout');

const app = express();
const port = process.env.PORT || 3000; // 优先使用环境变量中的端口

// 中间件配置
app.use(helmet()); // 添加安全头
app.use(cors()); // 启用跨域支持
app.use(morgan('combined')); // 记录HTTP请求日志
app.use(bodyParser.json()); // 解析JSON请求体

// 路由
app.use('/login', loginRoute);
app.use('/bookmarks', bookmarksRoute);
app.use('/logout', logoutRoute);

// 健康检查路由
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// 全局错误处理中间件
app.use((err, req, res, next) => {
    console.error('错误详情:', err.stack);
    res.status(500).json({ error: '服务器内部错误，请稍后重试' });
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器正在运行在 http://localhost:${port}`);
});
