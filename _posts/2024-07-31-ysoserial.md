---
layout: app
title: "Ysoserial"
tags: [""]
---

# Error

```bash

Error while generating or serializing payload                                                                                                                                                                                                
java.lang.IllegalAccessError: class ysoserial.payloads.util.Gadgets (in unnamed module @0x48b3574b) cannot access class com.sun.org.apache.xalan.internal.xsltc.trax.TemplatesImpl (in module java.xml) because module java.xml does not expo
rt com.sun.org.apache.xalan.internal.xsltc.trax to unnamed module @0x48b3574b                                                                                                                                                                
at ysoserial.payloads.util.Gadgets.createTemplatesImpl(Gadgets.java:102)                                                                                                                                                             
at ysoserial.payloads.Spring1.getObject(Spring1.java:57)                                                                                                                                                                             
at ysoserial.GeneratePayload.main(GeneratePayload.java:34)
```

## Fix

1. Install openjdk-11-jdk

```bash
sudo apt install openjdk-11-jdk
```

2. Set $PATH

```bash
export PATH="/usr/lib/jvm/java-11-openjdk-amd64/bin:$PATH"
java --version
```