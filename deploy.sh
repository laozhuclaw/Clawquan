#!/bin/bash

# ClawQuan 网站部署脚本
# 执行方式：bash deploy.sh

echo "=========================================="
echo "🚀 ClawQuan 网站部署脚本"
echo "=========================================="

# 配置
SERVER_IP="47.102.216.22"
SERVER_USER="root"
LOCAL_DIR="/c/Users/Admin/.openclaw/workspace/projects/ClawQuan"
REMOTE_DIR="/var/www/clawquan"

echo ""
echo "📋 部署步骤:"
echo "1. 创建远程目录..."
ssh ${SERVER_USER}@${SERVER_IP} "mkdir -p ${REMOTE_DIR}"

echo "2. 上传 index.html..."
scp "${LOCAL_DIR}/index.html" ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/

echo "3. 设置权限..."
ssh ${SERVER_USER}@${SERVER_IP} "chmod -R 755 ${REMOTE_DIR}"

echo "4. 检查 Nginx 状态..."
ssh ${SERVER_USER}@${SERVER_IP} "systemctl status nginx || echo 'Nginx not installed'"

echo ""
echo "✅ 部署完成！"
echo "访问地址：http://${SERVER_IP}/"
echo "=========================================="
