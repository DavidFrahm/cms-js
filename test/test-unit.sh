#!/usr/bin/env bash

BASE_DIR=`dirname $0`

echo -e "\n"
echo "==================================================================="
echo "Running unit tests..."
karma start $BASE_DIR/config/karma-unit.conf.js $* --single-run --no-auto-watch
echo "==================================================================="
