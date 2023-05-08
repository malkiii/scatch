#!/bin/bash

if nc -z localhost 3000 ; then
  yarn cypress
else
  echo -e "\nRun \x1b[33m\"yarn dev\"\x1b[0m to start localhost:3000 server.\n"
fi