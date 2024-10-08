---
layout: app
title: "Android Embebed App"
tags: ["android","ionic","embebed", "reversing","decompile","cordova", "hibrid"]
section: "Android"
---

[Read More](https://infosecwriteups.com/recreating-cordova-mobile-apps-to-bypass-security-implementations-8845ff7bdc58)

Hybrid mobile applications are apps that are built using web technologies such as HTML, CSS, and JavaScript, but are wrapped in a native container allowing them to run on multiple platforms like iOS and Android. These apps are developed using frameworks like Apache Cordova, Ionic, React Native, or Flutter, which enable the use of a single codebase to produce apps for different mobile operating systems.

## Reversing Cordova Application

* [Install Cordova Pre-requisites](https://cordova.apache.org/docs/en/11.x/guide/cli/#install-pre-requisites-for-building)

* Install NodeJS

* Unzip **apk** application file
* Inside `[application folder]/assets/www` folder can view the source code of application.


**The config file `[application folder]/res/xml/coinfig.xml` has all configuration for application.**


3. **Create a new Cordova application**

