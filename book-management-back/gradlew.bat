@echo off
setlocal

set APP_HOME=%~dp0
set CLASSPATH=%APP_HOME%gradle\wrapper\gradle-wrapper.jar

if not exist "%CLASSPATH%" (
  echo Gradle Wrapper jar not found: %CLASSPATH%
  echo Run "gradlew.bat wrapper" from a machine with Gradle installed or restore gradle\wrapper\gradle-wrapper.jar.
  exit /b 1
)

java -Xmx64m -Xms64m -classpath "%CLASSPATH%" org.gradle.wrapper.GradleWrapperMain %*
endlocal
