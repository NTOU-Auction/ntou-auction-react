# NTOU Auction React

[![CI](https://github.com/NTOU-Auction/ntou-auction-react/actions/workflows/main.yml/badge.svg)](https://github.com/NTOU-Auction/ntou-auction-react/actions/workflows/main.yml)
[![React CI/CD with Yarn and Docker for Dev](https://github.com/NTOU-Auction/ntou-auction-react/actions/workflows/docker.yml/badge.svg)](https://github.com/NTOU-Auction/ntou-auction-react/actions/workflows/docker.yml)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FNTOU-Auction%2Fntou-auction-react.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FNTOU-Auction%2Fntou-auction-react?ref=badge_shield)

[![GitHub release](https://img.shields.io/github/release/NTOU-Auction/ntou-auction-react.svg)](https://github.com/NTOU-Auction/ntou-auction-react/releases/latest)
![GitHub top language](https://img.shields.io/github/languages/top/NTOU-Auction/ntou-auction-react)
![GitHub language count](https://img.shields.io/github/languages/count/NTOU-Auction/ntou-auction-react)

![Docker Pulls](https://img.shields.io/docker/pulls/keke125/ntou-auction-react)
![GitHub License](https://img.shields.io/github/license/NTOU-Auction/ntou-auction-react)

NTOU Auction React 為專門為海大師生設計的交易平臺，提供不二價及競標兩種交易模式，此為系統前端部分。

> [!IMPORTANT]
> 需要搭配[NTOU-Auction/ntou-auction-java](https://github.com/NTOU-Auction/ntou-auction-java)才能部署本系統。

## 簡介

本系統為提供海大師生進行交易的平臺，分為買家及賣家兩種角色，交易模式分為競標及不二價，競標可設定截止時間、底價、每次增加金額，買家可購買感興趣的商品，賣家則可上架商品、更新商品、下架商品，透過聊天功能可讓買賣雙方進行溝通，如確定面交時間及地點、詢問商品細節，透過訂單功能，賣家可選擇是否要接受買家的訂單，系統也會儲存訂單相關資訊供買賣雙方參考，透過通知功能，當買家成立訂單時，買賣雙方都會收到Email通知，當訂單狀態更新時，買家也會收到通知，買家遇到喜愛的商品也可加入到我的最愛收藏。

系統支援RWD，讓使用者在不同裝置上皆可輕鬆使用，也支援TLS傳輸加密，確保使用者與網站之間的連線經過加密，增加安全性。

此外，系統以MIT授權條款開放原始碼。

## 網站
https://ntou-auction.com/

網站託管於Oracle Cloud的日本大阪機房

![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)

## 技術

### CI/CD

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

### 支援的作業系統 (搭配Docker)

![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

你可以在偏好的OS上自行組建(build)，我們目前只提供Docker部署

### 程式語言

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### 框架

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)

### 版本控制

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### 專案軟體包管理

![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

### 提升程式碼品質

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## 執行

下載本專案 [或直接clone](https://github.com/NTOU-Auction/ntou-auction-react):

```bash
git clone https://github.com/NTOU-Auction/ntou-auction-react.git
cd ntou-auction-react
```

Install it and run:

```bash
yarn install
yarn run dev
```

打開瀏覽器，輸入 [http://localhost:3000](http://localhost:3000) ，即可看到網頁

## 部署

### Docker 部署

參考 [Docker Hub](https://hub.docker.com/r/keke125/ntou-auction-react)。

## 反向代理(Nginx)參考設定檔

ntou-auction.conf

```nginx

map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      "";
}

server {
    listen 80;
    listen [::]:80;
    server_name example.com;

    # Uncomment to redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;	
  listen [::]:443 ssl http2;
                                                                                
  server_name example.com;
                                                                                
  # Allow large attachments
  client_max_body_size 16M;
                                                                              
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;      
                                                                                                                                                           
  add_header X-Frame-Options "SAMEORIGIN" always; 
  add_header X-XSS-Protection "1; mode=block" always; 
  add_header X-Content-Type-Options "nosniff" always; 
  add_header Referrer-Policy "no-referrer-when-downgrade" always;
                                                                                
    location / {
      proxy_pass http://127.0.0.1:3000;

      proxy_busy_buffers_size   32M;
      proxy_buffers   4 32M;
      proxy_buffer_size   8M;

      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api {
      proxy_pass http://127.0.0.1:8080;

      proxy_busy_buffers_size   32M;
      proxy_buffers   4 32M;
      proxy_buffer_size   8M;

      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /ws {
       proxy_pass http://127.0.0.1:8080;
       proxy_http_version 1.1;
       proxy_set_header Host $host;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection $connection_upgrade;
    }                                                           
}

```

## 授權條款

![GitHub License](https://img.shields.io/github/license/NTOU-Auction/ntou-auction-react)


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FNTOU-Auction%2Fntou-auction-react.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FNTOU-Auction%2Fntou-auction-react?ref=badge_large)