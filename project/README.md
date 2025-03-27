# book

自建书签
project/
├── backend/
│   ├── database/
│   │   ├── database.db          # SQLite数据库文件
│   │   └── init.sql             # 数据库初始化脚本
│   ├── routes/
│   │   ├── login.js             # 用户登录API
│   │   ├── bookmarks.js         # 书签管理API
│   │   └── logout.js            # 用户登出API
│   ├── server.js                # Express服务器主文件
│   └── package.json             # Node.js依赖配置
├── frontend/
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css        # 样式文件
│   │   ├── js/
│   │   │   └── app.js          # 前端逻辑脚本
│   │   └── index.html           # 主页面
│   └── README.md                # 项目说明
├── .gitignore                   # Git忽略配置文件
└── README.md                    # 项目整体说明文档
AngularJS+Node.js + Express + SQLite



你提供的列表包含了MySQL命令行客户端中的大多数常用命令。以下是对这些命令的简要解释：

‌? 或 ?‌：显示帮助信息。
‌clear 或 \c‌：清除当前输入语句。
‌connect 或 \r‌：重新连接到服务器。可选参数包括数据库名和主机名。
‌delimiter 或 \d‌：设置语句分隔符。
‌edit 或 \e‌：使用指定的文本编辑器编辑命令。
‌ego 或 \G‌：将命令发送到MySQL服务器，并以垂直方式显示结果。
‌exit 或 \q‌：退出MySQL命令行客户端。与quit命令相同。
‌go 或 \g‌：将命令发送到MySQL服务器。
‌help 或 \h‌：显示帮助信息。
‌nopager 或 \n‌：禁用分页器，将结果打印到标准输出。
‌notee 或 \t‌：不将结果写入输出文件。
‌pager 或 \P‌：设置分页器。通过分页器打印查询结果。
‌print 或 \p‌：打印当前命令。
‌prompt 或 \R‌：更改MySQL提示符。
‌quit 或 \q‌：退出MySQL命令行客户端。
‌rehash 或 #‌：重建补全哈希。
‌source 或 .‌：执行SQL脚本文件。需要指定文件名作为参数。
‌status 或 \s‌：从服务器获取状态信息。
‌system 或 !‌：如果已启用，则执行系统shell命令。
‌tee 或 \T‌：设置输出文件。将所有内容附加到指定的输出文件中。
‌use 或 \u‌：使用另一个数据库。需要指定数据库名作为参数。
‌charset 或 \C‌：切换到另一个字符集。在处理具有多字节字符集的二进制日志时可能需要。
‌warnings 或 \W‌：在每条语句后显示警告。
‌nowarning 或 \w‌：不在每条语句后显示警告。
‌resetconnection 或 \x‌：清除会话上下文。
‌query_attributes‌：为下一个查询设置字符串参数（name1 value1 name2 value2 ...）。
‌ssl_session_data_print‌：将当前的SSL会话数据序列化为标准输出或文件。
这些命令大多数都用于管理MySQL命令行客户端的会话、执行SQL脚本、查看服务器状态等。

你是否需要进一步的帮助或有其他关于MySQL的问题？

连接
mysql -u root -p
查找
SHOW DATABASES;
进入
USE cloud_nav;
查找表
SHOW TABLES;
结构
DESCRIBE 表名;
SHOW COLUMNS FROM 表名;
数据内容
SELECT * FROM 表名;

# 书签管理系统

这是一个简单的书签管理系统，使用 Node.js、Express 和 SQLite 构建，前端使用 HTML、CSS 和 JavaScript。

## 安装和运行

1. 克隆项目：
   ```bash
   git clone <项目链接>
   cd project
   ```

2. 安装后端依赖：
   ```bash
   cd backend
   npm install
   ```

3. 初始化数据库：
   ```bash
   sqlite3 database/database.db < database/init.sql
   ```

4. 启动后端服务器：
   ```bash
   node server.js
   ```

5. 打开前端页面：
   使用浏览器打开 `frontend/public/index.html`。

6. 如果需要安装前端依赖（可选）：
   ```bash
   cd frontend
   npm install
   ```

---

如果需要对某个文件进行扩展或调整，随时告诉我！ 😊
server {
    listen 80;
    server_name test.111600.xyz;

    # 将 HTTP 请求重定向到 HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name test.111600.xyz;

    # SSL 证书和密钥路径
    ssl_certificate /var/www/project/111600cet.pem;
    ssl_certificate_key /var/www/project/111600key.key;

    # 优化 SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # 配置静态文件目录
    root /var/www/project/frontend/public;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # API 请求转发到后端
    location /login {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # 允许跨域请求
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Content-Type';

        # 处理 OPTIONS 请求
        if ($request_method = OPTIONS) {
            return 204;
        }
    }
}

