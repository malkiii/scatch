#!/bin/bash

if nc -z localhost 3000 ; then
  cmd.exe /c pnpm cypress open --project . --e2e --browser chrome
else
  echo -e "\n- Run \x1b[33m\"pnpm dev\"\x1b[0m to start localhost:3000 server.\n"
fi