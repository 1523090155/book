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

### 克隆项目

```bash
git clone https://github.com/your-username/bookmark-management.git
cd bookmark-management
```

### 安装依赖

```bash
npm install
```

### 配置环境变量

在项目根目录创建 `.env` 文件，添加以下内容：

```
PORT=3000
DATABASE_URL=./database.sqlite
JWT_SECRET=your_jwt_secret
```

### 启动开发服务器

```bash
npm run dev
```

### 启动生产服务器

```bash
npm start
```

### 运行测试

```bash
npm test
```

## 目录结构

```
/workspaces/book
├── backend
│   ├── server.js       # 主服务器文件
│   ├── package.json    # 项目配置文件
│   ├── ...             # 其他文件
└── README.md           # 项目说明文件
```

## 许可证

MIT © ZT
