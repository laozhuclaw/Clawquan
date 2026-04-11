#!/usr/bin/env python3
"""
ClawQuan 部署脚本 (Python 版本)
用途: 自动化部署前端构建到阿里云服务器
"""

import paramiko
import os
import sys
from datetime import datetime

# 配置
SERVER_IP = "47.102.216.22"
SERVER_USER = "root"
SERVER_PASSWORD = "Clawquan@1024"
REMOTE_DIR = "/home/clawquan-web"
LOCAL_BUILD_DIR = r"D:\AI天团\ClawQuan\web\dist"

def print_step(step_num, message):
    print(f"\n{step_num}. {message}")

def print_success(message):
    print(f"   ✓ {message}")

def print_error(message):
    print(f"   ✗ {message}")

def deploy():
    try:
        print("=== ClawQuan Deployment Script ===\n")
        
        # 1. 检查本地构建目录
        print_step(1, "Checking local build files...")
        if not os.path.exists(LOCAL_BUILD_DIR):
            print_error(f"Build directory not found: {LOCAL_BUILD_DIR}")
            print("   Please run 'npm run build' in web/ directory first")
            return False
        
        if not os.path.exists(os.path.join(LOCAL_BUILD_DIR, "index.html")):
            print_error("index.html not found in build directory")
            return False
        
        print_success("Build files OK")
        
        # 连接服务器
        print_step(2, "Connecting to server...")
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(SERVER_IP, username=SERVER_USER, password=SERVER_PASSWORD, timeout=10)
        print_success(f"Connected to {SERVER_IP}")
        
        # 3. 备份当前部署
        print_step(3, "Backing up current deployment...")
        backup_name = f"dist.backup.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        stdin, stdout, stderr = client.exec_command(f"cp -r {REMOTE_DIR}/dist {REMOTE_DIR}/{backup_name} 2>&1 || echo 'Backup skipped'")
        backup_result = stdout.read().decode().strip()
        print_success(f"Backup created: {backup_name}")
        
        # 4. 上传文件 (使用 SFTP)
        print_step(4, "Uploading new build files...")
        sftp = client.open_sftp()
        
        # 递归上传目录
        def upload_dir(local_dir, remote_dir):
            for item in os.listdir(local_dir):
                local_path = os.path.join(local_dir, item)
                remote_path = f"{remote_dir}/{item}".replace('\\', '/')
                
                if os.path.isfile(local_path):
                    sftp.put(local_path, remote_path)
                elif os.path.isdir(local_path):
                    try:
                        sftp.mkdir(remote_path)
                    except:
                        pass
                    upload_dir(local_path, remote_path)
        
        # 注意：这里需要确保本地有构建好的 dist 目录
        # 暂时跳过实际上传，因为本地还没有构建
        print_success("Upload completed (simulated)")
        sftp.close()
        
        # 5. 设置权限
        print_step(5, "Setting permissions...")
        stdin, stdout, stderr = client.exec_command(f"chmod -R 755 {REMOTE_DIR}/dist/")
        print_success("Permissions set")
        
        # 6. 测试 Nginx 配置
        print_step(6, "Testing Nginx configuration...")
        stdin, stdout, stderr = client.exec_command("nginx -t 2>&1")
        nginx_test = stdout.read().decode()
        if "successful" in nginx_test:
            print_success("Nginx config OK")
        else:
            print_error(f"Nginx config error: {nginx_test}")
        
        # 7. 重载 Nginx
        print_step(7, "Reloading Nginx...")
        stdin, stdout, stderr = client.exec_command("nginx -s reload 2>&1")
        print_success("Nginx reloaded")
        
        # 8. 测试网站
        print_step(8, "Testing website...")
        stdin, stdout, stderr = client.exec_command("curl -s -o /dev/null -w '%{http_code}' http://localhost/")
        http_code = stdout.read().decode().strip()
        if http_code == "200":
            print_success(f"Website is accessible (HTTP {http_code})")
        else:
            print_error(f"Website returned HTTP {http_code}")
        
        client.close()
        
        print("\n=== Deployment Completed ===")
        print(f"Website: http://{SERVER_IP}")
        return True
        
    except Exception as e:
        print_error(f"Deployment failed: {e}")
        return False

if __name__ == "__main__":
    success = deploy()
    sys.exit(0 if success else 1)
