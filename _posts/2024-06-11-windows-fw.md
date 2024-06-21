---
layout: app
title: "Windows Firewall"
tags: ["firewall","netsh","enumeration"]
os: ["windows"]
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
# Create port forwarding rule

```bash
netsh interface portproxy add v4tov4 listenport=[port2listen] listenaddress=0.0.0.0 connectport=[dstPort] connectaddress=[dst Address]
```
* **interface portproxy**: This specifies that you are working with the portproxy settings, which are used to configure port forwarding.
* **add v4tov4**: This indicates that you are adding a new rule for forwarding IPv4 traffic to an IPv4 address.
* **listenport=[Port]** This specifies the port on which the local machine will listen for incoming connections.
* **listenaddress=0.0.0.0** This specifies that the local machine will listen on all available network interfaces.
* **connectport=[dstPort]** This specifies the port on the remote machine to which the traffic will be forwarded.
* **connectaddress=[dst Address]** This specifies the IP address of the remote machine to which the traffic will be forwarded.


