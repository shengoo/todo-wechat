```text
server {
        listen 80;
        server_name api.qsmttech.cn;
        return 301 https://api.qsmttech.cn$request_uri;
}
server {
    listen 443;
    server_name api.qsmttech.cn;
    ssl on;

    root /var/www/html;
    index index.php index.html index.htm index.nginx-debian.html;

    ssl_certificate   cert/api.qsmttech.cn.pem;
    ssl_certificate_key  cert/api.qsmttech.cn.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```