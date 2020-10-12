
FROM harbor.sinohealth.com:1443/middleware/nginx:1.17
COPY nginx.conf /etc/nginx/
COPY  dist/.  /usr/share/nginx/html/
EXPOSE 80
