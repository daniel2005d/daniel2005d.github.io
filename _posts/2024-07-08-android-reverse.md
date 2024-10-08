---
layout: app
title: "Reverse Android"
image: "https://lh3.googleusercontent.com/P5QMyNHTevjUPkQYYC1bo5-gBdJkwOqgXpIwL80JgIm4CO-yzK32OOX3pr7y8b9YNhXQZotdsgD7JLolmWZx5BkvEvZwofL7I8CLHBOINY5O09KlrQ=rwa-s0"
tags: ["adb","android","apktool","reverse","frida","bypass"]
section: "Android"
---

# Tools 

* [apktool](https://apktool.org/)
* [jadx](https://github.com/skylot/jadx)

# Prevent

[SSL Pinning in Android](https://medium.com/@anandgaur22/ssl-pinning-in-android-14851dc41703)

# Disassemble a .dex

[https://github.com/JesusFreke/smali/wiki](https://github.com/JesusFreke/smali/wiki)
```bash
java -jar baksmali-2.1.1.jar classes.dex
```

# Assemble .smali

```java
java -jar smali-2.1.1.jar </source>
```

# Install FRIDA

[https://frida.re/docs/android/](https://frida.re/docs/android/)

## Run Frida

```bash
adb shell "/path/frida-server -D &"
```

## Hook

Create a simple Javascript file

```javascript
Java.perform(() => {
  const Activity = Java.use('com.example.apkrypt.MainActivity');

  Activity.md5.implementation = function (str) {
    send('onResume() got called! Let\'s call the original implementation');
    send(str);
    return "735c3628699822c4c1c09219f317a8e9"
    //this.onResume();
  };
});
```

### Classes

**Java.perform ⇒ Context of the current app**

`Java.use(’packagename.Class’)`

`Activity.function_to_hook`

**Invoke script**

```jsx
frida -U -f <package> -l <Javascript File>
```

# Xamarin

[GitHub - alexisegf/Dexamarin: Xamarin decompilation tool (only Android APK support for now)](https://github.com/alexisegf/Dexamarin?tab=readme-ov-file)

## Attack

**Install Burp Certificate**

### 1. Using Frida

After to install frida tools, and frida server, we can use this command

```bash
$ frida --codeshare akabe1/frida-multiple-unpinning -U -f <appname>
```

### 2. Modifying the `network_security_config`

Decompile apk, into `manifest.xml` file, check if the `android:networkSecurityConfig` change the /res/xml/network_security_config.xml and replace with this content:

```xml
<network-security-config> 
    <base-config> 
        <trust-anchors> 
            <!-- Trust preinstalled CAs --> 
            <certificates src="system" /> 
            <!-- Additionally trust user added CAs --> 
            <certificates src="user" /> 
        </trust-anchors> 
    </base-config> 
</network-security-config>
```

**Recompile the application and install.**

```xml
apktool b <Application-Decompiled-Folder> [-o apkOutputName]
java -jar  uber-apk-signer-xxx.jar — apk <apkfile>.apk
adb install <apkfile>-signed.apk
```