
net file 1>nul 2>nul && goto :run || powershell -ex unrestricted -Command "Start-Process -Verb RunAs -FilePath '%comspec%' -ArgumentList '/c %~fnx0 %*'"
goto :eof

:run
    echo Set WshShell = CreateObject("WScript.Shell") > "%programdata%\Microsoft\Windows\Start Menu\Programs\StartUp\weighbridge.vbs"
	echo WshShell.Run chr(34) ^& "%cd%\weighbridge.bat" ^& Chr(34), 0 >> "%programdata%\Microsoft\Windows\Start Menu\Programs\StartUp\weighbridge.vbs"
	echo Set WshShell = Nothing  >> "%programdata%\Microsoft\Windows\Start Menu\Programs\StartUp\weighbridge.vbs"
	echo cd %cd% > weighbridge.bat
    echo javaw -jar weighbridge.jar >> weighbridge.bat
EXIT

