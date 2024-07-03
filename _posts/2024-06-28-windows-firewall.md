---
layout: app
title: "Windows Firewall"
image: "https://en.wikipedia.org/wiki/Windows_Firewall#/media/File:Windows_Firewall_icon.png"
tags: ["firewall"]

---

# Open Ports

## Add rule

```powershell
netsh advfirewall firewall add rule name="<name>" dir=in action=allow protocol=TCP localport=4444
```

## Remove Rule

```powershell
netsh advfirewall firewall delete rule name="<name>" protocol=TCP localport=4444
```