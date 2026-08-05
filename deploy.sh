#!/bin/bash
set -e

echo "=========================================="
echo "  婵梦科技官网 - 一键部署脚本"
echo "=========================================="

# 1. 创建 swap（2G 内存服务器需要）
if [ ! -f /swapfile ]; then
  echo "[1/5] 创建 2GB swap 交换空间..."
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
  echo "  ✅ swap 已创建并启用"
else
  echo "[1/5] swap 已存在，跳过"
fi

# 2. 安装 Docker（使用 apt，大陆网络更稳定）
if ! command -v docker &> /dev/null; then
  echo "[2/5] 安装 Docker..."
  sudo apt-get update
  sudo apt-get install -y docker.io docker-compose-v2
  sudo systemctl enable docker --now
  sudo usermod -aG docker $USER
  echo "  ✅ Docker 安装完成"
else
  echo "[2/5] Docker 已安装，跳过"
fi

# 3. 拉取代码
echo "[3/5] 拉取网站代码..."
if [ -d ~/product-website ]; then
  cd ~/product-website
  git pull 2>/dev/null || true
else
  git clone https://github.com/20020107-1/chanmeng-website.git ~/product-website
  cd ~/product-website
fi
echo "  ✅ 代码已就绪"

# 4. 构建并启动 Docker 容器
echo "[4/5] 构建 Docker 镜像（约 3-8 分钟，请耐心等待）..."
docker compose up -d --build 2>&1 | tail -5
echo "  ✅ 容器已启动"

# 5. 安装 Nginx 反向代理
echo "[5/5] 配置 Nginx..."
sudo apt install -y nginx > /dev/null 2>&1

sudo tee /etc/nginx/conf.d/chanmeng.conf > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;

    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

sudo nginx -t 2>/dev/null && sudo systemctl reload nginx
echo "  ✅ Nginx 已配置"

echo ""
echo "=========================================="
echo "  🎉 部署完成！"
echo "=========================================="
echo ""
echo "  网站地址: http://$(curl -s ifconfig.me)"
echo ""
echo "  常用命令:"
echo "    查看状态:  docker compose ps"
echo "    查看日志:  docker compose logs -f"
echo "    重启网站:  docker compose restart"
echo "    更新部署:  cd ~/product-website && git pull && docker compose up -d --build"
echo ""
