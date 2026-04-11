# 🚀 GitHub 上传成功经验总结

**创建时间**: 2026-04-12  
**作者**: 小蟹助理  
**状态**: ✅ 已验证可用

---

## 📋 问题背景

### 遇到的困难
1. **Git HTTPS 推送失败** - 网络连接超时/被防火墙拦截
2. **SSH 密钥未配置** - 无法使用 SSH 方式推送
3. **GitHub API Token 有效** - 但需要正确配置

### 解决方案
✅ **使用 Python API 工具直接上传文件** - 绕过 Git 网络限制

---

## 🔧 核心工具：`upload_to_github.py`

### 工具特点
- ✅ 使用 GitHub REST API 直接上传文件
- ✅ 支持批量上传多个文件
- ✅ 自动检测文件是否已存在（更新 vs 新建）
- ✅ 编码容错处理（忽略非 UTF-8 字符）
- ✅ 详细的进度输出和错误提示

### 核心代码结构

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GitHub 文件上传工具
使用 GitHub API 直接上传文件到仓库
"""

import requests
import base64
import os
import time

# 配置
GITHUB_TOKEN = "ghp_你的 Token"  # 从环境变量或硬编码
REPO_OWNER = "用户名"
REPO_NAME = "仓库名"
BASE_URL = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}"

# 要上传的文件列表
FILES_TO_UPLOAD = [
    "README.md",
    "DESIGN.md",
    "DEVELOPMENT_PLAN.md",
    # ... 其他文件
]

def upload_file(file_path, file_name):
    """上传单个文件到 GitHub"""
    
    if not os.path.exists(file_path):
        print(f"[ERROR] 文件不存在：{file_path}")
        return False
    
    # 读取文件内容（带编码容错）
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # 获取文件的 SHA（如果已存在）
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    # 检查文件是否已存在
    response = requests.get(
        f"{BASE_URL}/contents/{file_name}",
        headers=headers
    )
    
    sha = None
    if response.status_code == 200:
        data = response.json()
        sha = data.get('sha')
        print(f"[INFO] 文件已存在，将更新：{file_name}")
    else:
        print(f"[INFO] 新文件：{file_name}")
    
    # 编码文件内容
    encoded_content = base64.b64encode(content.encode('utf-8')).decode('utf-8')
    
    # 准备上传数据
    data = {
        "message": f"feat: 添加 {file_name} - 小蟹 + 小 k 协作模式",
        "content": encoded_content
    }
    
    if sha:
        data["sha"] = sha
    
    # 上传文件
    response = requests.put(
        f"{BASE_URL}/contents/{file_name}",
        headers=headers,
        json=data
    )
    
    if response.status_code in [200, 201]:
        print(f"[OK] 成功上传：{file_name}")
        return True
    else:
        print(f"[ERROR] 上传失败 {file_name}: {response.status_code}")
        print(f"   错误信息：{response.text[:200]}")
        return False

def main():
    """主函数"""
    
    print("="*60)
    print("ClawQuan - GitHub 文件上传工具")
    print("="*60)
    print(f"\n仓库：{REPO_OWNER}/{REPO_NAME}")
    print(f"待上传文件数：{len(FILES_TO_UPLOAD)}")
    print()
    
    # 验证 Token
    print("验证 Token...")
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    response = requests.get("https://api.github.com/user", headers=headers)
    if response.status_code == 200:
        user_data = response.json()
        print(f"[OK] Token 有效！用户：{user_data['login']}")
    else:
        print(f"[ERROR] Token 无效！状态码：{response.status_code}")
        return
    
    print("\n" + "="*60)
    print("开始上传文件...")
    print("="*60 + "\n")
    
    success_count = 0
    fail_count = 0
    
    for file_name in FILES_TO_UPLOAD:
        file_path = os.path.join(os.getcwd(), file_name)
        
        if upload_file(file_path, file_name):
            success_count += 1
        else:
            fail_count += 1
        
        # 避免 API 限流
        time.sleep(0.5)
    
    print("\n" + "="*60)
    print("上传完成！")
    print("="*60)
    print(f"成功：{success_count} 个文件")
    print(f"失败：{fail_count} 个文件")
    print(f"\n仓库地址：https://github.com/{REPO_OWNER}/{REPO_NAME}")
    print("="*60)

if __name__ == "__main__":
    main()
```

---

## 📝 使用步骤

### 1️⃣ 准备工作

```bash
# 确保安装了 requests 库
pip install requests

# 确认 GitHub Token 有效
# 访问 https://github.com/settings/tokens
# 生成 Personal Access Token (需要 repo 权限)
```

### 2️⃣ 配置参数

```python
# 修改以下配置
GITHUB_TOKEN = "ghp_你的 Token"  # 替换为你的 Token
REPO_OWNER = "laozhuclaw"        # 替换为你的用户名
REPO_NAME = "ClawQuan"           # 替换为你的仓库名

# 添加要上传的文件
FILES_TO_UPLOAD = [
    "README.md",
    "DESIGN.md",
    "DEVELOPMENT_PLAN.md",
    "TO_KIMI.md",
    "URGENT_UI_FIX.md",
    "MOBILE_FIRST_UI.md",
]
```

### 3️⃣ 执行上传

```bash
cd C:\Users\Admin\.openclaw\workspace\projects\ClawQuan
python upload_to_github.py
```

### 4️⃣ 查看结果

```
============================================================
ClawQuan - GitHub 文件上传工具
============================================================

仓库：laozhuclaw/ClawQuan
待上传文件数：6

验证 Token...
[OK] Token 有效！用户：laozhuclaw

============================================================
开始上传文件...
============================================================

[INFO] 文件已存在，将更新：README.md
[OK] 成功上传：README.md
[INFO] 文件已存在，将更新：DESIGN.md
[OK] 成功上传：DESIGN.md
[INFO] 新文件：DEVELOPMENT_PLAN.md
[OK] 成功上传：DEVELOPMENT_PLAN.md
[INFO] 新文件：TO_KIMI.md
[OK] 成功上传：TO_KIMI.md
[INFO] 新文件：URGENT_UI_FIX.md
[OK] 成功上传：URGENT_UI_FIX.md
[INFO] 新文件：MOBILE_FIRST_UI.md
[OK] 成功上传：MOBILE_FIRST_UI.md

============================================================
上传完成！
============================================================
成功：6 个文件
失败：0 个文件

仓库地址：https://github.com/laozhuclaw/ClawQuan
============================================================
```

---

## 💡 关键技巧

### 1. 编码容错处理
```python
# 使用 errors='ignore' 避免非 UTF-8 字符导致上传失败
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()
```

### 2. 自动检测文件是否存在
```python
# 先检查文件是否已存在
response = requests.get(f"{BASE_URL}/contents/{file_name}", headers=headers)

if response.status_code == 200:
    # 文件已存在，获取 SHA 用于更新
    sha = data.get('sha')
else:
    # 新文件，不需要 SHA
    sha = None
```

### 3. 避免 API 限流
```python
# 每次上传后等待 0.5 秒
time.sleep(0.5)
```

### 4. Token 验证
```python
# 先验证 Token 是否有效
response = requests.get("https://api.github.com/user", headers=headers)
if response.status_code == 200:
    print(f"[OK] Token 有效！用户：{user_data['login']}")
else:
    print(f"[ERROR] Token 无效！状态码：{response.status_code}")
    return
```

---

## ⚠️ 注意事项

### 1. Token 安全
- ❌ 不要将 Token 提交到 Git
- ✅ 使用环境变量存储：`os.getenv('GITHUB_TOKEN')`
- ✅ 添加到 `.gitignore`: `*.env`

### 2. API 限流
- 免费账户：5000 次/小时
- 认证请求：5000 次/小时
- 建议：批量上传时添加延迟

### 3. 文件大小限制
- 单个文件最大：100 MB
- 超过限制需要使用 Git LFS

### 4. 分支管理
- 默认上传到 `main` 分支
- 如需上传到其他分支，添加 `branch` 参数

---

## 🔄 对比方案

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| **Git push** | 标准流程 | 需要网络通畅 | 网络正常时使用 |
| **GitHub Web 界面** | 简单直观 | 只能少量文件 | 临时上传 1-2 个文件 |
| **Python API** | 稳定可靠、批量上传 | 需要配置 Token | **推荐！网络问题时首选** |

---

## 📊 成功案例

### 本次上传
- **时间**: 2026-04-12 04:17 GMT+8
- **文件数**: 6 个
- **成功率**: 100%
- **耗时**: ~3 秒

### 上传文件清单
1. ✅ `README.md` - 项目介绍
2. ✅ `DESIGN.md` - 系统设计文档
3. ✅ `DEVELOPMENT_PLAN.md` - 开发计划
4. ✅ `TO_KIMI.md` - 给小 K 的指令
5. ✅ `URGENT_UI_FIX.md` - UI 美化任务
6. ✅ `MOBILE_FIRST_UI.md` - 移动端优先方案

---

## 🎯 最佳实践

### 1. 定期备份
```bash
# 每次重要更新后都上传一次
git add .
git commit -m "docs: 更新文档"
python upload_to_github.py
```

### 2. 版本控制
```python
# 在 commit message 中添加版本号或日期
data = {
    "message": f"feat: 添加 {file_name} - v1.0 - 2026-04-12",
    "content": encoded_content
}
```

### 3. 错误处理
```python
# 捕获异常并记录
try:
    if upload_file(file_path, file_name):
        success_count += 1
    else:
        fail_count += 1
except Exception as e:
    print(f"[ERROR] 上传异常：{str(e)}")
    fail_count += 1
```

---

## 📞 故障排查

### Q1: Token 无效？
**A**: 
1. 检查 Token 是否正确复制
2. 确认 Token 有 `repo` 权限
3. 重新生成新的 Token

### Q2: 文件上传失败？
**A**:
1. 检查文件路径是否正确
2. 检查文件编码是否为 UTF-8
3. 查看具体的错误信息

### Q3: API 限流？
**A**:
1. 增加 `time.sleep()` 延迟时间
2. 分批上传文件
3. 等待 1 小时后重试

---

## 📚 相关资源

- [GitHub REST API 文档](https://docs.github.com/en/rest)
- [Contents API - Create or update file contents](https://docs.github.com/en/rest/repos/contents?create-or-update-file)
- [Python requests 库文档](https://requests.readthedocs.io/)

---

_最后更新：2026-04-12 04:19 GMT+8_  
_作者：小蟹助理_  
_状态：✅ 已验证可用_
