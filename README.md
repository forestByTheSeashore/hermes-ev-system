# Hermes EV Manufacturing System

> 一个完整的电动汽车制造企业管理系统，支持多角色管理和全流程业务操作

## 🚗 项目简介

Hermes是一个专注于电动汽车制造的综合性企业管理系统，提供完整的分支机构、部门架构、员工管理、原材料供应、车辆生产、库存管理以及客户销售和门店控制系统。

### 主要功能

- **多角色管理系统**：支持管理员、销售员、客户和供应商四种角色
- **车辆定制化**：提供多种车型、颜色、轮胎、座椅等配置选项
- **订单管理**：完整的订单生命周期管理
- **库存管理**：实时库存监控和管理
- **供应链管理**：原材料采购和供应商管理
- **数据可视化**：基于图表的业务数据展示
- **门店管理**：多门店运营和管理支持

## 🏗️ 系统架构

```
Hermes EV Manufacturing System
├── Frontend (React + Material-UI)
│   ├── 客户端界面
│   ├── 管理仪表板
│   ├── 员工工作台
│   └── 供应商门户
├── Backend (PHP + MySQL)
│   ├── RESTful API
│   ├── 角色权限控制
│   └── 数据库操作
└── Database (MySQL)
    ├── 业务数据表
    ├── 视图定义
    └── 存储过程
```

## 🛠️ 技术栈

### 前端技术
- **React 18.3.1** - 主要前端框架
- **Material-UI 6.2.0** - UI组件库
- **React Router 7.0.2** - 路由管理
- **Chart.js 4.4.7** - 数据可视化
- **Axios 1.7.9** - HTTP客户端
- **Ant Design 5.22.5** - 辅助UI组件

### 后端技术
- **PHP 8.0+** - 服务器端语言
- **MySQL 8.0+** - 数据库
- **PDO** - 数据库连接
- **AWS RDS** - 云数据库服务

### 开发工具
- **Node.js 16+** - 前端构建环境
- **npm** - 包管理器

## 📦 安装指南

### 环境要求

- Node.js 16.0+
- npm 8.0+
- PHP 8.0+
- MySQL 8.0+

### 1. 克隆项目

```bash
git clone <repository-url>
cd hermes-ev-manufacturing-system
```

### 2. 前端安装

```bash
cd frontend
npm install
```

### 3. 后端配置

1. 配置数据库连接信息（`backend/config.php`）
2. 导入数据库结构（`database/view.sql`）
3. 配置Web服务器指向`backend`目录

### 4. 启动服务

```bash
# 启动前端开发服务器
cd frontend
npm start

# 启动后端服务器
# 配置Apache/Nginx指向backend目录
```

## 🚀 使用方法

### 访问系统

- **前端应用**: http://localhost:3000
- **后端API**: http://localhost/backend

### 角色登录

系统支持四种角色登录：

1. **管理员 (Manager)**
   - 查看销售数据和生产统计
   - 管理员工信息
   - 监控库存状态

2. **销售员 (Salesman)**
   - 处理客户订单
   - 管理门店库存
   - 查看销售报表

3. **客户 (Customer)**
   - 浏览车型和配置
   - 定制车辆选项
   - 下单和跟踪订单

4. **供应商 (Supplier)**
   - 管理原材料供应
   - 查看采购订单
   - 更新交付状态

### 主要页面

- **主页**: 产品展示和公司介绍
- **车辆配置**: 个性化定制界面
- **管理仪表板**: 数据可视化和业务监控
- **订单管理**: 订单处理和跟踪
- **库存管理**: 实时库存监控

## 📊 数据库设计

系统包含以下主要数据表：

- **Model**: 车型信息
- **Customer**: 客户信息
- **Customer_Order**: 客户订单
- **Inventory**: 库存管理
- **Supplier**: 供应商信息
- **Material_Inventory**: 原材料库存
- **Factory**: 工厂信息
- **Employee**: 员工信息

## 🔧 开发指南

### 前端开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建生产版本
npm run build

# 运行测试
npm test
```

### 后端开发

1. 修改`backend/config.php`中的数据库配置
2. 创建新的API端点文件
3. 实现相应的业务逻辑
4. 添加必要的数据库视图或存储过程

### 添加新功能

1. 前端: 在`src/pages/`或`src/components/`中添加新组件
2. 后端: 在`backend/`中添加新的PHP文件
3. 数据库: 在`database/`中添加相应的SQL文件

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

- 项目维护者: Hermes Development Team
- 邮箱: contact@hermes-ev.com
- 项目链接: [GitHub Repository](https://github.com/your-username/hermes-ev-manufacturing-system)

## 🎯 未来计划

- [ ] 移动端适配
- [ ] 微服务架构重构
- [ ] 实时通知系统
- [ ] 高级数据分析
- [ ] 国际化支持
- [ ] 单元测试完善

---

**注意**: 本系统仅用于学习和演示目的，生产环境使用请确保进行充分的安全性测试和性能优化。 