#!/bin/bash

docker-compose -f www.yml pull
docker-compose -f www.yml up --build -d
sleep 10
docker exec mail bash -c "postmap -F /etc/postfix/sni_maps ; postfix reload"


