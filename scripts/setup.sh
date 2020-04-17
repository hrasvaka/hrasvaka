#!/usr/bin/env sh
git submodule init && \
git submodule update && \
cd ./src/frontend && \
npm install