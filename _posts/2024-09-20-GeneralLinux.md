---
layout: app
title: "Linux"
tags: ["bash","dd"]
---

# Clone disk with dd and send throught netcat

```bash
dd if=/dev/[disk] | nc -l -p [port] => Send
nc -n [IP address] | dd of=/dev/[disk]

```