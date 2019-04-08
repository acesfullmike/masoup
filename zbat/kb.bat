@echo off

set MYROOT=C:\Zoo\projs\masoup
echo myroot path:  %MYROOT%

rem *** clean and package maven project  ***

call mvn clean package -f%MYROOT%\pom.xml -Dmaven.test.skip=true