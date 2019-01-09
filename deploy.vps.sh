#!/bin/bash
npm run build
scp -r dist decodeams@37.97.148.6:~/decode_docker/decode_pwa

