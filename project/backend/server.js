const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login');
const bookmarksRoute = require('./routes/bookmarks');
const logoutRoute = require('./routes/logout'); // 引入登出路由

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/login', loginRoute);
app.use('/bookmarks', bookmarksRoute);
app.use('/logout', logoutRoute); // 添加登出路由

app.listen(port, () => {
    console.log(`服务器正在运行在 http://localhost:${port}`);
});
