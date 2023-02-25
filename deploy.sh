#!/bin/bash

rsync -trhPuL --exclude-from=deployExclude.txt --delete docker 1mccormick:/opt
rsync -trhPuLv --exclude-from=deployExclude.txt --exclude service/node_modules --delete service 1mccormick:/opt/temp

echo Complete!