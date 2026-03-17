---
layout: page
title: "Configuración de Luckfox Pico como servidor DHCP"
permalink: /devices/luckyfox
---

## Introducción

En esta publicación se describe el proceso de configuración de una placa **Luckfox Pico** para funcionar como servidor DHCP. Estos dispositivos permiten ejecutar **Linux en hardware extremadamente compacto**, lo que los hace ideales para laboratorios, automatización o experimentación con sistemas embebidos.

En este caso se utilizó la placa:

- [Luckfox Pico RV1103 Micro Linux](https://www.amazon.com/dp/B0DPM4452B?ref=ppx_yo2ov_dt_b_fed_asin_title)

Este dispositivo ha sido utilizado para diversos laboratorios personales.

No se explicará el proceso de **flasheo del sistema operativo**, ya que el fabricante lo documenta adecuadamente en su wiki oficial:

https://wiki.luckfox.com/Luckfox-Pico-Plus-Mini/Flash-image

El objetivo de este artículo es explicar **cómo configurar un servidor DHCP en la interfaz USB de la placa**.

---

# Problema

Una vez que se accede a la placa mediante **SSH**, es necesario instalar algunos paquetes adicionales. Sin embargo, inicialmente el dispositivo **no tiene acceso a Internet**, por lo que primero se debe compartir la conexión del equipo host.

Posteriormente se configurará el dispositivo para que funcione como **servidor DHCP en la interfaz usb0**.

---

# Compartir Internet desde Windows

El primer paso consiste en compartir la conexión a Internet desde el equipo host (Windows).

1. Abrir la configuración de redes:

```
inicio → ejecutar → ncpa.cpl
```

2. Identificar la interfaz de red que tiene acceso a Internet.

3. Hacer clic derecho → **Propiedades**

4. En la pestaña **Compartir**, habilitar la opción para compartir la conexión y seleccionar la interfaz de red correspondiente al dispositivo **Luckfox**.

![Propiedades de Conexión](images/luckfox_shareinternet.png)

Es posible que Windows muestre el siguiente mensaje:

> La dirección IP de la interfaz será cambiada automáticamente a **192.168.137.1**

Este comportamiento es esperado y se debe aceptar.

---

# Reconexión SSH

Debido a que Windows cambia la IP de la interfaz, será necesario restaurar temporalmente la configuración anterior para poder conectarse nuevamente al dispositivo.

Ejemplo de conexión SSH:

```bash
ssh pico@172.32.0.93
```

---

# Configurar conectividad a Internet en Luckfox

Ahora se debe configurar la interfaz `usb0` dentro del dispositivo para que utilice la red compartida por Windows.

```bash
ifconfig usb0 192.168.137.100 netmask 255.255.255.0 up
```

Posteriormente se puede restablecer la configuración de red en el host y conectarse nuevamente por SSH.

---

# Configurar gateway y DNS

Una vez que la interfaz tenga conectividad con la red compartida, se deben configurar el **gateway** y el **servidor DNS**.

```bash
route add default gw 192.168.137.1
echo "nameserver 8.8.8.8" > /etc/resolv.conf
```

Para verificar la conectividad:

```bash
ping 8.8.8.8
```

Si la prueba es exitosa, el dispositivo ya tiene acceso a Internet.

---

# Instalación de dnsmasq

Para implementar el servidor DHCP se utilizará **dnsmasq**, una solución ligera ampliamente utilizada en dispositivos embebidos.

> Tip: No se recomienda utilizar `isc-dhcp-server` en este tipo de dispositivos, ya que consume más recursos.

Instalación:

```bash
apt update
apt install -y dnsmasq
```

---

# Configuración del servidor DHCP

Editar el archivo:

```
/etc/dnsmasq.conf
```

Configuración utilizada:

```bash
interface=usb0
bind-interfaces

dhcp-range=172.16.100.2,172.16.100.10,255.255.255.0,12h
dhcp-option=3,172.16.100.1
dhcp-option=6,8.8.8.8,8.8.4.4
```

Explicación de los parámetros principales:

- **dhcp-range** → rango de direcciones IP asignadas
- **option 3** → gateway entregado a los clientes
- **option 6** → servidores DNS

---

# Configuración de IP estática en la interfaz USB

Esta placa ejecuta un **servicio de inicialización personalizado** que configura las interfaces de red durante el arranque. Por lo tanto, es necesario modificar dicho servicio para establecer la IP estática y reiniciar `dnsmasq`.

Editar el archivo:

```
/etc/init.d/S50usbdevice
```

Buscar la línea:

```bash
ifconfig usb0 172.32.0.70
```

y reemplazarla por:

```bash
ifconfig usb0 172.16.100.1 netmask 255.255.255.0
ifconfig usb0 up
systemctl restart dnsmasq
```

La instrucción `netmask` no está definida originalmente, pero se recomienda agregarla para evitar advertencias o comportamientos inesperados.

Además, el servicio `dnsmasq` se reinicia en este punto porque **la interfaz usb0 ya existe**. Si el servicio se inicia antes, puede generar errores al no encontrar la interfaz.

![S50usbdevice](images/luckfox_customserviceconfig.png)

---

# Resultado

Después de reiniciar el dispositivo, la configuración quedará de la siguiente forma:

- `usb0` tendrá la IP **172.16.100.1**
- `dnsmasq` entregará direcciones en el rango **172.16.100.2 – 172.16.100.10**
- Los clientes recibirán gateway y DNS automáticamente

---

# Conclusiones

Las placas **Luckfox Pico** permiten construir laboratorios muy compactos basados en Linux. Gracias a herramientas ligeras como **dnsmasq**, es posible implementar servicios de red completos incluso en hardware con recursos limitados.

Con esta configuración, la placa puede actuar como **servidor DHCP para dispositivos conectados por USB**, lo que facilita la creación de entornos de pruebas, automatización o análisis de red.