---
layout: app
title: "Android Bypass"
image: "https://lh3.googleusercontent.com/P5QMyNHTevjUPkQYYC1bo5-gBdJkwOqgXpIwL80JgIm4CO-yzK32OOX3pr7y8b9YNhXQZotdsgD7JLolmWZx5BkvEvZwofL7I8CLHBOINY5O09KlrQ=rwa-s0"
tags: ["android","SSL","Bypass","certificate","install burp","frida"]
section: "Android"
---

# Bypass SSL
Para poder saltar los controles de SSL en una aplicación Android, primero debera tenerse un telefono rooteado. En caso de usar el emulador de Android, es necesario crear la imágen con "Google API", con esto dejara ejecutar todos los comandos como root.

## Install frida

[https://frida.re/docs/android/](https://frida.re/docs/android/)

**Copy Frida Server to Android Phone**

```bash
adb push frida-server /data/local/tmp/frida-server
```

```bash
adb shell "/data/local/tmp/frida-server -D &"
```

**Check Frida Server**

```bash
frida-ps -U ps
```
### Install BurpSuite Certificate on Android Device

```bash
openssl x509 -inform DER -in cacert.der -out cacert.pem  
openssl x509 -inform PEM -subject_hash_old -in cacert.pem |head -1  
mv cacert.pem <hash>.0
adb push <hash>.0 /sdcard
```

```bash
:/# adb root 
:/# adb remount
:/# adb reboot
:/# adb shell
:/# mount -o rw,remount /system<
:/# mv /sdcard/&lt;hash&gt;.0 /system/etc/security/cacerts/
:/# chmod 644 /system/etc/security/cacerts/<hash>;.0
```

> When try to mount /system partition maybe show and error. Try to find out the /system partition and remount it.
```bash
mount |grep system
```
  
# ByPass

```bash
frida -U -f package -l Javascript_File
frida --codeshare akabe1/frida-multiple-unpinning -U -f package
```