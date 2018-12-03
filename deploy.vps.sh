#!/bin/bash
npm run build
scp -r dist decodeams@oscity.nl:~/decode_docker/decode_pwa

