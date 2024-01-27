#!/bin/sh

# just change the directory if this command doesn't work
docker run --rm -v /opt/opendkim/keys:/tmp -w /tmp --entrypoint opendkim-genkey \
       instrumentisto/opendkim \
           --subdomains \
           --domain=mccormick.sh \
           --selector=default