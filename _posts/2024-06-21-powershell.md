---
layout: app
title: "Powershell"
tags: ["powershell","winrs","invoke-command","winrm"]
---


# PowerShell

## Run Commands over Remote Machine

```powershell
Invoke-Command -Scriptblock {Get-Process} -ComputerName (Get-Content <list_servers>)
Invoke-Command -FilePath c:\windows\temp\script.ps1 -ComputerName (Get-Content <list_servers>)
```

## Run Command to evade logging

```powershell
winrs -remote:<server> -u:<server>\<administrator> -p:<password> <COMMAND>
winrs -r:<server> <COMMAND>
```

Execute remote commands over WinRM

[WSMan-WinRM](https://github.com/bohops/WSMan-WinRM)


## Commands

```powershell
Start-Process, Stop-Process: Start/Stop Process on localmachine
Get-Help Start-Process -examples | more
```

```powershell
Start-Process notepad.exe
Stop-Process -name notepad.exe
Stop-Process -id 3245
```

```powershell
Get-Process -Name notepad
```

Get Hotfix installed on local machine

```powershell
Get-HotFix
```

## Display Format 

```powershell
Get-Command -CommandType cmdlet -Name Format*


Format-Custom
Format-List
Format-SecureBootUEFI
Format-Table
Format-Wide
```


#### -------------------------- Example ----------------------------
```powershell
	Get-Process | Format-List
	Get-ChildItem | Format-Table [Columns]
	Get-ChildItem | Format-Table *
```

## OutPut Format
```powershell
Get-Command -CommandType cmdlet -Name Out*

Out-Default
Out-File: Send result to file
Out-GridView: Send result to GUID Grid
Out-Host: Print result into console
Out-Null: Do Nothing
Out-Printer: 
Out-String: Display in terminal
```

#### -------------------------- Example ----------------------------

```powershell
Get-Hotfix | Out-GridView
Get-Hotfix | Out-File -FilePath ""
```

# Multiline definition

```powershell
$variable = @"Multiline
string"@
```

# Array

```powershell
@empty = @()
$array = 1,2,4
```

