---
layout: app
title: "hMailServer"
os: ["Windows"]
tags: ["SMTP","POP","IMAP"]
description: "hMailServer is a free, open-source mail server software for Microsoft Windows. It allows you to set up and manage your own email server, providing features such as SMTP, POP3, and IMAP functionality. With hMailServer, you can create multiple email accounts, domains, and distribution lists, making it suitable for small to medium-sized businesses or individuals who want to host their own email services. It also includes spam protection features, support for multiple languages, and an easy-to-use administration interface. Overall, hMailServer offers a flexible and customizable solution for hosting email services on Windows platforms."
version: 4.4.2
---

## Weakness

In Windows, the default configuration location is <code>Program Files (x86)\hMailServer\Bin\hMailServer.ini</code>, inside this file, there are some passwords stored as hashes, wich will be crack with *hashcat*.
