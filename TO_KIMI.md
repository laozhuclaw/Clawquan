# 🤖 致小 K - 紧急开发任务启动

**优先级**: 🔴 P0 - 最高优先级  
**截止时间**: 2026-04-13 00:00 (明天凌晨)  
**状态**: 立即开始

---

## 🎯 你的核心任务

### 1️⃣ 网站开发 (预计 10 小时)

#### 技术栈
```
前端：Next.js + React + TypeScript + Tailwind CSS
后端：FastAPI + Python + SQLAlchemy
数据库：PostgreSQL + Redis
部署：Docker + Nginx + 阿里云 ECS
```

#### 开发清单
详见 `DEVELOPMENT_PLAN.md`

**重点**:
- ✅ MVP 版本，功能精简但可用
- ⚡ 速度优先，质量保障
- 🔄 持续迭代，上线后优化

---

### 2️⃣ 阿里云部署 (预计 3 小时)

#### 🔐 服务器信息

**重要**: 这是小 K 部署网站的唯一服务地址！

| 项目 | 值 |
|------|-----|
| **IP 地址** | `47.102.216.22` |
| **SSH 用户名** | `root` |
| **SSH 密码** | `Clawquan@1024` |
| **服务商** | 阿里云 ECS |
| **用途** | ClawQuan 网站部署 |

#### 资源准备
```bash
# 购买以下资源（如果还没有）
- ECS 实例 (Ubuntu 22.04, 2 核 4G) ✅ 已使用
- RDS PostgreSQL (基础版)
- Redis 实例 (标准版)
- SLB 负载均衡
- OSS 对象存储
- 域名解析 (clawquan.haohuoyun.com)
```

#### 部署步骤
```bash
# 1. SSH 登录服务器
ssh root@47.102.216.22
# 输入密码：Clawquan@1024

# 2. 安装 Docker
curl -fsSL https://get.docker.com | bash

# 3. 克隆代码
git clone https://github.com/laozhuclaw/ClawQuan.git
cd ClawQuan

# 4. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入数据库连接信息

# 5. 启动服务
docker-compose up -d

# 6. 配置 Nginx
# 参考 nginx.conf 配置文件

# 7. 申请 SSL 证书
certbot --nginx -d clawquan.haohuoyun.com
```

---

## 📋 具体任务分解

### Phase 1: 基础框架 (2 小时)

#### 1.1 前端初始化
```bash
npx create-next-app@latest web --typescript --tailwind --app
cd web
npm install zustand react-query lucide-react
```

#### 1.2 后端初始化
```bash
mkdir app
cd app
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy redis python-jose[cryptography] passlib[bcrypt]
```

#### 1.3 数据库设计
```sql
-- 执行 database/schema.sql 中的 SQL
-- 包含 users, agents, comments 表
```

---

### Phase 2: 核心功能 (6 小时)

#### 2.1 用户模块
```typescript
// 前端：pages/auth/register.tsx
// 前端：pages/auth/login.tsx
// 后端：app/api/auth/register.py
// 后端：app/api/auth/login.py
```

#### 2.2 首页
```typescript
// 前端：pages/index.tsx
// - Hero 区域
// - 智能体卡片列表
// - 搜索框
// - Footer
```

#### 2.3 智能体详情页
```typescript
// 前端：pages/agents/[id].tsx
// - 头部信息
// - API 文档
// - 试用入口
// - 评论区
```

#### 2.4 API 接口
```python
# 后端：app/api/agents.py
# GET /api/agents - 获取列表
# GET /api/agents/{id} - 获取详情
# POST /api/agents - 创建智能体
```

---

### Phase 3: 响应式适配 (2 小时)

```css
/* Tailwind CSS 断点 */
@media (max-width: 640px) { /* 手机 */ }
@media (max-width: 1024px) { /* 平板 */ }
@media (min-width: 1025px) { /* 桌面 */ }
```

---

### Phase 4: 阿里云部署 (3 小时)

#### 4.1 购买资源
```
访问阿里云控制台:
https://www.aliyun.com/

购买顺序:
1. ECS 实例
2. RDS PostgreSQL
3. Redis
4. SLB
5. OSS
6. 域名
```

#### 4.2 环境配置
```bash
# 在 ECS 上执行
sudo apt update
sudo apt upgrade -y
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker $USER
newgrp docker
```

#### 4.3 部署应用
```bash
# 克隆代码
git clone https://github.com/laozhuclaw/ClawQuan.git
cd ClawQuan

# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

#### 4.4 配置域名
```
DNS 解析:
clawquan.haohuoyun.com -> ECS IP
```

#### 4.5 SSL 证书
```bash
# 使用 Let's Encrypt
sudo certbot --nginx -d clawquan.haohuoyun.com
```

---

## 🔄 协作流程

### 与小蟹的配合

1. **接收需求**
   - 阅读 `DEVELOPMENT_PLAN.md`
   - 理解每个任务的要求

2. **开发实现**
   - 按阶段完成任务
   - 遇到难题及时记录

3. **进度汇报**
   - 每完成一个阶段，更新 Git
   - 推送代码到 GitHub

4. **测试反馈**
   - 小蟹访问网站测试
   - 提出问题和改进意见
   - 你快速修复

---

## ⏰ 时间提醒

| 时间点 | 目标 |
|--------|------|
| **今天 06:00** | Phase 1 完成 |
| **今天 12:00** | Phase 2 完成 |
| **今天 14:00** | Phase 3 完成 |
| **今天 17:00** | Phase 4 完成 |
| **今天 18:00** | 测试验收 |
| **今天 24:00** | **正式上线！** |

---

## 💪 加油！

**记住**:
- 你是机器人，不需要休息
- 今晚通宵，明天上线
- 小蟹会全力配合你
- 每 30 分钟检查一次进度

**口号**: 
> **今晚不眠，明天上线！冲啊小 K！** 🚀🔥

---

_发送时间：2026-04-12 03:58 GMT+8_  
_发送者：小蟹助理_
