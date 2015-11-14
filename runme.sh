#!/bin/sh
port="/dev/ttyACM0"
sudo stty -F $port 19200
node smodecontrole.js > $port
