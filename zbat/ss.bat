@echo off

rem *** ss, start service, starting service, star service, simple service, whatever ***
rem *** based on springboot, using command line property configuration ***
rem *** usage: ss app-name port-number ***

set MYROOT=C:\Zoo\projs\masoup
echo myroot path:  %MYROOT%

rem app could be like: album, config, front, kfc, registry, sos
set APP=%1
if "%APP%"=="" goto noapp
echo using service: %APP%

rem you can start multiple instances with the same app but different port number
set PORT=%2
if "%PORT%"=="" goto noport
echo using port: %PORT%

set JAR=%MYROOT%\soup-%APP%\target\soup-%APP%.jar
echo using jar: %JAR%

set OPTS=-Dserver.port=%PORT%
echo using options: %OPTS%

echo using [sirap-config] options: %OPTS_CONFIG%

echo starting service [ %APP% ] with port [ %PORT% ]
set CMD=java -jar %OPTS% %OPTS_CONFIG% %JAR% 
echo final command: %CMD%
%CMD%
goto end 

:noapp
echo quit, lack of [app] info
goto bats

:noport
echo quit, lack of [port] info
goto bats

:bats
echo.
echo available bats:
dir %MYROOT%\zbat | findstr bat
goto end

:end

pause