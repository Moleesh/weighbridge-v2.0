
net file 1>nul 2>nul && goto :run || powershell -ex unrestricted -Command "Start-Process -Verb RunAs -FilePath '%comspec%' -ArgumentList '/c %~fnx0 %*'"
goto :eof

:run
	echo javaw - java %cd%\weighbridge.jar > "%programdata%\Microsoft\Windows\Start Menu\Programs\StartUp\weighbridge.bat"
EXIT

