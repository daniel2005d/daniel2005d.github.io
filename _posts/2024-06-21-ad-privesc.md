---
layout: app
title: "Active Directory - PirvEsc"
tags: ["privesc","powerup","powerview"]

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
Invoke-Privesc checl
```

### PEASS-ng

```powershell
winPEASx64.exe
```

