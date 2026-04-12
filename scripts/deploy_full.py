#!/usr/bin/env python3
"""
ClawQuan 完整部署脚本
用途: 一键部署 ClawQuan 完整应用栈
"""
import paramiko
import os

SERVER_IP = "47.102.216.22"
SERVER_USER = "root"
SERVER_PASSWORD = "Clawquan@1024"
REMOTE_DIR = "/home/clawquan-docker"

def deploy_full():
    print("=== ClawQuan Full Deployment ===\n")
    
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(SERVER_IP, username=SERVER_USER, password=SERVER_PASSWORD, timeout=10)
    print("[OK] Connected to server\n")
    
    # 1. 创建部署目录
    print("[1/6] Creating deployment directory...")
    stdin, stdout, stderr = client.exec_command(f"mkdir -p {REMOTE_DIR} && cd {REMOTE_DIR} && pwd")
    print(f"    {stdout.read().decode().strip()}")
    
    # 2. 上传 docker-compose.yml (使用 SFTP)
    print("[2/6] Uploading docker-compose.yml...")
    sftp = client.open_sftp()
    local_files = [
        (r"D:\AI天团\ClawQuan\docker-compose.yml", f"{REMOTE_DIR}/docker-compose.yml"),
        (r"D:\AI天团\ClawQuan\nginx-docker.conf", f"{REMOTE_DIR}/nginx.conf"),
    ]
    for local, remote in local_files:
        if os.path.exists(local):
            sftp.put(local, remote)
            print(f"    Uploaded: {os.path.basename(local)}")
    sftp.close()
    
    # 3. 创建必要的目录
    print("[3/6] Creating app directories...")
    dirs = ["app", "web/dist", "uploads"]
    for d in dirs:
        stdin, stdout, stderr = client.exec_command(f"mkdir -p {REMOTE_DIR}/{d}")
    print("    Directories created")
    
    # 4. 启动 PostgreSQL 和 Redis
    print("[4/6] Starting PostgreSQL and Redis...")
    stdin, stdout, stderr = client.exec_command(f"cd {REMOTE_DIR} && docker-compose up -d postgres redis 2>&1")
    output = stdout.read().decode()
    if "error" in output.lower() and "conflict" not in output.lower():
        print(f"    [WARN] {output[:200]}")
    else:
        print("    Database containers started")
    
    # 5. 等待数据库就绪
    print("[5/6] Waiting for database...")
    stdin, stdout, stderr = client.exec_command(
        f"cd {REMOTE_DIR} && docker-compose exec -T postgres pg_isready -U clawquan 2>&1 | grep -q 'accepting connections' && echo 'Ready' || echo 'Waiting...'"
    )
    print(f"    {stdout.read().decode().strip()}")
    
    # 6. 显示状态
    print("[6/6] Checking deployment status...")
    stdin, stdout, stderr = client.exec_command(f"cd {REMOTE_DIR} && docker-compose ps 2>&1")
    status = stdout.read().decode()
    print(f"\n    {status}")
    
    client.close()
    print("\n=== Deployment Script Ready ===")
    print(f"To complete deployment:")
    print(f"  1. Upload backend code to: {REMOTE_DIR}/app/")
    print(f"  2. Upload frontend build to: {REMOTE_DIR}/web/dist/")
    print(f"  3. Run: cd {REMOTE_DIR} && docker-compose up -d")

if __name__ == "__main__":
    deploy_full()
