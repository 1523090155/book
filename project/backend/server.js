const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config(); // 加载环境变量

const port = process.env.PORT || 3000;
const loginRoute = require('./routes/login');
const bookmarksRoute = require('./routes/bookmarks');
const logoutRoute = require('./routes/logout');

const app = express();

// 手动设置跨域请求头
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有域名进行跨域调用
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的请求方法
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
    next();
});

// 中间件配置
app.use(helmet()); // 添加安全头
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

// 根路由
app.get('/', (req, res) => {
    res.send('欢迎来到后台服务器！'); // 可返回简单的欢迎信息
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