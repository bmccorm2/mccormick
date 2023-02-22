#!/bin/bash

rsync -trhPuL --exclude deploy.sh --delete docker 1mccormick:/opt
# rsync -trhPuLv --exclude deploy.sh --exclude service/node_modules --delete service mail:/opt/temp

echo Complete!