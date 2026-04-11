#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ClawQuan - GitHub 文件上传工具
使用 GitHub API 直接上传文件到仓库
"""

import requests
import base64
import os
import time

# 配置
import os
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', '')  # 从环境变量读取
REPO_OWNER = "laozhuclaw"
REPO_NAME = "ClawQuan"
BASE_URL = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}"

# 要上传的文件列表
FILES_TO_UPLOAD = [
    "README.md",
    "01-需求调研.md",
    "02-测试计划.md",
    "04-项目总结.md",
    "test_website.html",
    "GITHUB_UPLOAD_GUIDE.md",
]

def upload_file(file_path, file_name):
    """上传单个文件到 GitHub"""
    
    if not os.path.exists(file_path):
        print(f"[ERROR] 文件不存在：{file_path}")
        return False
    
    # 读取文件内容
    with open(file_path, 'r', encoding='utf-8') as f:
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
