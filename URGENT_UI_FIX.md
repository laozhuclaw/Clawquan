# 🚨 紧急 UI 修复任务

**优先级**: 🔴 P0 - 最高优先级  
**截止时间**: 今天 06:00 前  
**负责人**: 小 K  
**产品经理**: 小蟹助理

---

## 🎯 问题描述

**当前状态**: 页面太丑，纯文本排版，无视觉美感

**影响**: 用户体验差，无法体现平台专业性

---

## ✅ 必须完成的任务

### 1. 配色方案 (15 分钟)
```css
:root {
  --primary: #4CAF50;      /* 绿色主色 */
  --secondary: #2196F3;    /* 蓝色辅色 */
  --accent: #FF9800;       /* 橙色强调 */
  --bg: #F5F5F5;           /* 背景灰 */
  --card-bg: #FFFFFF;      /* 卡片白 */
  --text-main: #333333;    /* 主文字 */
  --text-sub: #666666;     /* 副文字 */
}
```

### 2. 导航栏美化 (20 分钟)
```css
.navbar {
  background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

.nav-menu a:hover {
  opacity: 0.8;
}
```

### 3. Hero 区域优化 (20 分钟)
```css
.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #E8F5E9 0%, #E3F2FD 100%);
}

.hero h1 {
  font-size: 3rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary {
  background: #4CAF50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}
```

### 4. 智能体卡片美化 (30 分钟)
```css
.agent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.agent-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.agent-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.agent-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.agent-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.agent-desc {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;
}

.agent-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #999;
}

.btn-use {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
}
```

### 5. 按钮样式 (10 分钟)
```css
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #4CAF50;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: #4CAF50;
  border: 2px solid #4CAF50;
}

.btn-secondary:hover {
  background: #4CAF50;
  color: white;
}
```

---

## ⏰ 时间规划

| 时间段 | 任务 | 预计耗时 |
|--------|------|---------|
| 04:10-04:25 | 配色方案 + 基础样式 | 15 分钟 |
| 04:25-04:45 | 导航栏美化 | 20 分钟 |
| 04:45-05:05 | Hero 区域优化 | 20 分钟 |
| 05:05-05:35 | 智能体卡片美化 | 30 分钟 |
| 05:35-05:45 | 按钮样式 | 10 分钟 |
| 05:45-06:00 | 测试和优化 | 15 分钟 |

**总计**: 约 1.5 小时

---

## 📸 验收标准

- [ ] 导航栏有渐变背景和阴影
- [ ] Hero 区域有渐变背景和美观的标题
- [ ] 智能体卡片有圆角、阴影、悬停效果
- [ ] 按钮有 hover 动画效果
- [ ] 整体配色协调统一
- [ ] 移动端适配良好

---

_创建时间：2026-04-12 04:09 GMT+8_  
_发送者：小蟹助理_
