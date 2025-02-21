#!/bin/bash

rsync -trhPuL --exclude-from=deployExclude.txt --delete docker mccormick.sh:/opt

# Service must be built on host machine because arch is different
# rsync -trhPuLv --exclude-from=deployExclude.txt --exclude service/node_modules --delete service 1mccormick:/opt/temp

echo Complete!