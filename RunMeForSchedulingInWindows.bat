net file 1>nul 2>nul && goto :run || powershell -ex unrestricted -Command "Start-Process -Verb RunAs -FilePath '%comspec%' -ArgumentList '/c %~fnx0 %*'"
goto :eof

:run
    set CURRENT_DIR=%cd%

	echo cd %cd% > "%CURRENT_DIR%\WeighbridgeStart.bat"
	echo taskkill /f /im javaw.exe >> "%CURRENT_DIR%\WeighbridgeStart.bat"
    echo javaw -jar weighbridge.jar >> "%CURRENT_DIR%\WeighbridgeStart.bat"

	echo taskkill /f /im javaw.exe > "%CURRENT_DIR%\WeighbridgeStop.bat"

    echo Set WshShell = CreateObject("WScript.Shell") > "%CURRENT_DIR%\Weighbridge.vbs"
	echo WshShell.Run chr(34) ^& "%CURRENT_DIR%\WeighbridgeStart.bat" ^& Chr(34), 0 >> "%CURRENT_DIR%\Weighbridge.vbs"
	echo Set WshShell = Nothing  >> "%CURRENT_DIR%\Weighbridge.vbs"

    echo Set oWS = WScript.CreateObject("WScript.Shell") > "%CURRENT_DIR%\temp.vbs"
    echo sLinkFile = "%programdata%\Microsoft\Windows\Start Menu\Programs\StartUp\Weighbridge.lnk" >> "%CURRENT_DIR%\temp.vbs"
    echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.TargetPath = "%CURRENT_DIR%\Weighbridge.vbs" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.Description = "WeighBridge Software" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.WorkingDirectory = "%CURRENT_DIR%" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.IconLocation = "%CURRENT_DIR%\Babulens_Logo.bmp" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.Save >> "%CURRENT_DIR%\temp.vbs"

    cscript /nologo "%CURRENT_DIR%\temp.vbs"

    echo Set oWS = WScript.CreateObject("WScript.Shell") > "%CURRENT_DIR%\temp.vbs"
    echo sLinkFile = "%UserProfile%\Desktop\Weighbridge.lnk" >> "%CURRENT_DIR%\temp.vbs"
    echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.TargetPath = "%CURRENT_DIR%\Weighbridge.vbs" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.IconLocation = "%CURRENT_DIR%\Babulens_Logo.bmp" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.Save >> "%CURRENT_DIR%\temp.vbs"
    cscript /nologo "%CURRENT_DIR%\temp.vbs"

    echo Set oWS = WScript.CreateObject("WScript.Shell") > "%CURRENT_DIR%\temp.vbs"
    echo sLinkFile = "%UserProfile%\Desktop\StopWeighbridge.lnk" >> "%CURRENT_DIR%\temp.vbs"
    echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.TargetPath = "%CURRENT_DIR%\WeighbridgeStop.bat" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.IconLocation = "%CURRENT_DIR%\Babulens_Logo.bmp" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.Save >> "%CURRENT_DIR%\temp.vbs"
    cscript /nologo "%CURRENT_DIR%\temp.vbs"

	timeout 5

    del %SCRIPT%

EXIT

