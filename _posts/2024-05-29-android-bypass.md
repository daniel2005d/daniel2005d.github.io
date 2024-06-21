---
layout: app
title: "Android"
tags: ["android","SSL","Bypass","certificate","install burp","frida"]
---

# Bypass SSL
Para poder saltar los controles de SSL en una aplicación Android, primero debera tenerse un telefono rooteado. En caso de usar el emulador de Android, es necesario crear la imágen con "Google API", con esto dejara ejecutar todos los comandos como root.

<div class="">Install frida</div>

[Download](https://frida.re/docs/android/)
<h4 class="subtitle mb-0">Copy Frida Server to Android Phone</h4>
<div class="">
  <pre>
    <code>
    adb push frida-server /data/local/tmp/frida-server
    </code>
  </pre>
</div>


<h4 class="subtitle mb-0">Run Frida Server</h4>
<pre>
  <code>
    adb shell "/data/local/tmp/frida-server -D &"
  </code>
</pre>

<h4 class="subtitle mb-0">Check Frida Server</h4>
<pre>
  <code>
    frida-ps -U ps
  </code>
</pre>

<h4 class="subtitle mb-0">Install BurpSuite Certificate on Android Device</h4>

<div class="row mb-0">
  <div class="window">
        <div class="title-bar">
          <div>
            <span class="window_dot language-python"></span>
            <span class="window_dot bg-warning"></span>
            <span class="window_dot bg-success"></span>
          </div>
          
        </div>

        <div class="content code-content">
            <p>openssl x509 -inform DER -in cacert.der -out cacert.pem  </p>
            <p>openssl x509 -inform PEM -subject_hash_old -in cacert.pem |head -1  </p>
            <p>mv cacert.pem &lt;hash&gt;.0 </p>
            <p>adb push &lt;hash&gt;.0 /sdcard</p>
        </div>
  </div>
</div>
<div class="row mb-1">
 <div class="window">
        <div class="title-bar">
          <div>
            <span class="window_dot language-python"></span>
            <span class="window_dot bg-warning"></span>
            <span class="window_dot bg-success"></span>
          </div>
           <div class="title-bar">MacOS Style Window</div>
              <div style="width: 32px;"></div> 
        </div>

        <div class="content code-content">
            <p>:/# adb root </p>
            <p>:/# adb remount</p>
            <p>:/# adb reboot</p>
            <p>:/# adb shell</p>
            <p>:/# mount -o rw,remount /system</p>
            <p>:/# mv /sdcard/&lt;hash&gt;.0 /system/etc/security/cacerts/</p>
            <p>:/# chmod 644 /system/etc/security/cacerts/&lt;hash&gt;.0</p>
        </div>
         
  </div>
  <div class="alert alert-danger" role="alert">
          When try to mount /system partition maybe show and error. Try to find out the /system partition and remount it.
          mount |grep system
        </div>
  </div>
  <div class="row mb-0">
<h4 class="subtitle mb-0">ByPass</h4>
<pre>
<code>
  <p>frida -U -f package -l Javascript_File</p>
  <p>frida --codeshare akabe1/frida-multiple-unpinning -U -f package</p>
</code>
</pre>

  </div>