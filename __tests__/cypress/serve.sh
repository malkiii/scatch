#!/bin/bash

if curl -IsS http://localhost:3000 &> /dev/null ; then
  yarn cypress
else
  echo -e "\nRun \x1b[33m\"yarn dev\"\x1b[0m to start localhost:3000 server.\n"
fi