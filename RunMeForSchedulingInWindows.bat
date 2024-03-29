set CURRENT_DIR=%~dp0
set CURRENT_DIVE=%~d0

net file 1>nul 2>nul && goto :run || powershell -ex unrestricted -Command "Start-Process -Verb RunAs -FilePath '%comspec%' -ArgumentList '/c %~fnx0 %*'"
goto :eof

:run
    %CURRENT_DIVE%
    cd "%CURRENT_DIR%"

    echo %CURRENT_DIVE% > "%CURRENT_DIR%\WeighbridgeStart.bat"
    echo cd "%CURRENT_DIR%" >> "%CURRENT_DIR%\WeighbridgeStart.bat"
    echo taskkill /f /im javaw.exe >> "%CURRENT_DIR%\WeighbridgeStart.bat"
    echo taskkill /f /im ngrok.exe >> "%CURRENT_DIR%\WeighbridgeStart.bat"
    echo start /b ngrok start -config ngrok.yml babulens >> "%CURRENT_DIR%\WeighbridgeStart.bat"
    echo javaw.exe -Djava.security.egd=file:/dev/./urandom -jar weighbridge.jar >> "%CURRENT_DIR%\WeighbridgeStart.bat"

    echo taskkill /f /im javaw.exe > "%CURRENT_DIR%\WeighbridgeStop.bat"
    echo taskkill /f /im ngrok.exe >> "%CURRENT_DIR%\WeighbridgeStop.bat"

    echo %CURRENT_DIVE% > "%CURRENT_DIR%\ServerStarting.bat"
    echo cd "%CURRENT_DIR%" >> "%CURRENT_DIR%\ServerStarting.bat"
    echo taskkill /f /im ngrok.exe >> "%CURRENT_DIR%\ServerStarting.bat"
    echo start /b ngrok start -config ngrok.yml babulens >> "%CURRENT_DIR%\ServerStarting.bat"

    echo Set WshShell = CreateObject("WScript.Shell") > "%CURRENT_DIR%\ServerStarting.vbs"
    echo WshShell.Run chr(34) ^& "%CURRENT_DIR%\ServerStarting.bat" ^& Chr(34), 0 >> "%CURRENT_DIR%\ServerStarting.vbs"
    echo Set WshShell = Nothing  >> "%CURRENT_DIR%\ServerStarting.vbs"

    echo Set oWS = WScript.CreateObject("WScript.Shell") > "%CURRENT_DIR%\temp.vbs"
    echo sLinkFile = "%UserProfile%\Desktop\ServerStarting.lnk" >> "%CURRENT_DIR%\temp.vbs"
    echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.TargetPath = "%CURRENT_DIR%\ServerStarting.vbs" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.IconLocation = "%CURRENT_DIR%\babulensLogo.bmp" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.Save >> "%CURRENT_DIR%\temp.vbs"
    cscript /nologo "%CURRENT_DIR%\temp.vbs"

    echo Set WshShell = CreateObject("WScript.Shell") > "%CURRENT_DIR%\Weighbridge.vbs"
    echo WshShell.Run chr(34) ^& "%CURRENT_DIR%\WeighbridgeStart.bat" ^& Chr(34), 0 >> "%CURRENT_DIR%\Weighbridge.vbs"
    echo Set WshShell = Nothing  >> "%CURRENT_DIR%\Weighbridge.vbs"

    echo Set oWS = WScript.CreateObject("WScript.Shell") > "%CURRENT_DIR%\temp.vbs"
    echo sLinkFile = "%programdata%\Microsoft\Windows\Start Menu\Programs\StartUp\Weighbridge.lnk" >> "%CURRENT_DIR%\temp.vbs"
    echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.TargetPath = "%CURRENT_DIR%\Weighbridge.vbs" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.Description = "WeighBridge Software" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.WorkingDirectory = "%CURRENT_DIR%" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.IconLocation = "%CURRENT_DIR%\babulensLogo.bmp" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.Save >> "%CURRENT_DIR%\temp.vbs"
    cscript /nologo "%CURRENT_DIR%\temp.vbs"

    echo Set oWS = WScript.CreateObject("WScript.Shell") > "%CURRENT_DIR%\temp.vbs"
    echo sLinkFile = "%UserProfile%\Desktop\StartWeighbridge.lnk" >> "%CURRENT_DIR%\temp.vbs"
    echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.TargetPath = "%CURRENT_DIR%\Weighbridge.vbs" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.IconLocation = "%CURRENT_DIR%\babulensLogo.bmp" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.Save >> "%CURRENT_DIR%\temp.vbs"
    cscript /nologo "%CURRENT_DIR%\temp.vbs"

    echo Set oWS = WScript.CreateObject("WScript.Shell") > "%CURRENT_DIR%\temp.vbs"
    echo sLinkFile = "%UserProfile%\Desktop\StopWeighbridge.lnk" >> "%CURRENT_DIR%\temp.vbs"
    echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.TargetPath = "%CURRENT_DIR%\WeighbridgeStop.bat" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.IconLocation = "%CURRENT_DIR%\babulensLogo.bmp" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.Save >> "%CURRENT_DIR%\temp.vbs"
    cscript /nologo "%CURRENT_DIR%\temp.vbs"

    echo Set oWS = WScript.CreateObject("WScript.Shell") > "%CURRENT_DIR%\temp.vbs"
    echo sLinkFile = "%UserProfile%\Desktop\Weighbridge.lnk" >> "%CURRENT_DIR%\temp.vbs"
    echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.TargetPath = "http://localhost:9000/" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.IconLocation = "%CURRENT_DIR%\babulensLogo.bmp" >> "%CURRENT_DIR%\temp.vbs"
    echo oLink.Save >> "%CURRENT_DIR%\temp.vbs"
    cscript /nologo "%CURRENT_DIR%\temp.vbs"

    del "%CURRENT_DIR%\temp.vbs"

    timeout 5

EXIT
