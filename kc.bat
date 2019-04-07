@echo off

set PORT=%1
set APP=config
set JAR=D:\Gitpro\SIRAP\masoup\soup-%APP%\target
set JAR=%JAR%\soup-%APP%.jar
set OPS=-Dserver.port=%PORT%

if "%PORT%"=="" goto quit

echo starting with port %PORT%

java -jar %OPS% %JAR% 
goto end 

:quit
echo quit, lack of port info
goto end 

:end

pause