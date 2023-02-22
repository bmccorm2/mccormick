#!/bin/sh

docker run --rm -v /opt/opendkim/1mccormick.com:/tmp -w /tmp --entrypoint opendkim-genkey \
       instrumentisto/opendkim \
           --subdomains \
           --domain=1mccormick.com \
           --selector=default