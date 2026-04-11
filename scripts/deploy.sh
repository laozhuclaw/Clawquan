#!/bin/bash
# ClawQuan 部署脚本
# 用途: 自动化部署前端构建到服务器
# 使用方法: ./deploy.sh

set -e

echo "=== ClawQuan Deployment Script ==="
echo ""

# 配置
SERVER_IP="47.102.216.22"
SERVER_USER="root"
REMOTE_DIR="/home/clawquan-web"
LOCAL_BUILD_DIR="./web/dist"

# 颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查本地构建目录
if [ ! -d "$LOCAL_BUILD_DIR" ]; then
    echo -e "${RED}Error: Build directory not found: $LOCAL_BUILD_DIR${NC}"
    echo "Please run 'npm run build' first"
    exit 1
fi

echo "1. Checking build files..."
if [ ! -f "$LOCAL_BUILD_DIR/index.html" ]; then
    echo -e "${RED}Error: index.html not found in build directory${NC}"
    exit 1
fi
echo -e "${GREEN}   Build files OK${NC}"

echo ""
echo "2. Backing up current deployment..."
ssh ${SERVER_USER}@${SERVER_IP} "cp -r ${REMOTE_DIR}/dist ${REMOTE_DIR}/dist.backup.$(date +%Y%m%d_%H%M%S) 2>/dev/null || echo 'No previous backup'"
echo -e "${GREEN}   Backup completed${NC}"

echo ""
echo "3. Uploading new build files..."
rsync -avz --delete --exclude='node_modules' ${LOCAL_BUILD_DIR}/ ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/dist/
echo -e "${GREEN}   Upload completed${NC}"

echo ""
echo "4. Setting permissions..."
ssh ${SERVER_USER}@${SERVER_IP} "chmod -R 755 ${REMOTE_DIR}/dist/"
echo -e "${GREEN}   Permissions set${NC}"

echo ""
echo "5. Testing Nginx configuration..."
ssh ${SERVER_USER}@${SERVER_IP} "nginx -t"
echo -e "${GREEN}   Nginx config OK${NC}"

echo ""
echo "6. Reloading Nginx..."
ssh ${SERVER_USER}@${SERVER_IP} "nginx -s reload"
echo -e "${GREEN}   Nginx reloaded${NC}"

echo ""
echo "7. Testing website..."
HTTP_STATUS=$(curl -s -o /dev/null -w '%{http_code}' http://${SERVER_IP}/)
if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}   Website is accessible (HTTP 200)${NC}"
else
    echo -e "${RED}   Warning: Website returned HTTP $HTTP_STATUS${NC}"
fi

echo ""
echo "=== Deployment Completed ==="
echo "Website: http://${SERVER_IP}"
