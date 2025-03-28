# Bookmark Management

一个简单的书签管理系统后端服务。

## 功能

- 提供书签的增删改查接口
- 支持用户认证（基于 JWT）
- 支持跨域请求
- 使用 SQLite 作为数据库

## 技术栈

- **Node.js**: 后端运行时环境
- **Express**: Web 框架
- **SQLite**: 轻量级数据库
- **dotenv**: 环境变量管理
- **bcrypt**: 密码加密
- **jsonwebtoken**: 用户认证
- **cors**: 处理跨域请求

## 开发依赖

- **nodemon**: 开发模式下的热加载
- **eslint**: 代码格式检查工具
- **jest**: 测试框架
- **supertest**: HTTP 接口测试

## 安装与运行

### 拉取项目到服务器

1. 使用 SSH 登录到您的服务器。
2. 确保服务器上已安装 Git 和 Node.js。
3. 在服务器上运行以下命令拉取项目：
cd var
git clone https://github.com/1523090155/book.git
cd /var/book/project/backend
npm install
4. 按照以下步骤配置环境变量并启动服务器。
### 配置环境变量
在后端项目根目录（`backend` 目录）创建 `.env` 文件，添加以下内容：
PORT=3000
DATABASE_URL=./database.sqlite
JWT_SECRET=your_jwt_secret
- `PORT`: 服务器运行的端口号。
- `DATABASE_URL`: SQLite 数据库文件路径。
- `JWT_SECRET`: 用于生成和验证 JWT 的密钥。可以通过以下命令生成一个随机的密钥：
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
将生成的密钥替换 `your_jwt_secret`。
### 启动开发服务器
npm run dev
### 启动生产服务器
npm start
### 运行测试
npm test
## 目录结构
/workspaces/book
├── backend
│   ├── server.js       # 主服务器文件
│   ├── package.json    # 项目配置文件
│   ├── ...             # 其他文件
└── README.md           # 项目说明文件
```

## 许可证

MIT © ZT
