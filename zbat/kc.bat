@echo off
set /p gitpwd=<C:\Zoo\projs\gitpwd.txt
set OPTS_CONFIG=-Dgit.pwd=%gitpwd%
call ss config %1