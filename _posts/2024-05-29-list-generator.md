---
layout: app
title: "List Generators"
tags: ["usernames","passwords","credentials","swaks","listst", "generator","crunch"]
---

# Username Anarchy
[https://github.com/urbanadventurer/username-anarchy](https://github.com/urbanadventurer/username-anarchy)


# namemash.py

> Create a usernames list for brute force attacks

[https://gist.github.com/superkojiman/11076951](https://gist.github.com/superkojiman/11076951)

```python    
python namemash.py

**fileformat**: names lastnames, separate by spaces
```

    

# crunch

```bash
  @ lowercase
  , uppercase
  % numbers
  ^ symbols
```

## Pemutations
   
```bash
  crunch 7 8 abc123  
```

## Charset

```bash
  crunch 7 7 abc%%%%
```

## Multiple Words

Create a single word merging this words

```bash
  crunch 1 1 -p dog cat bird
```

Combine all letter of words, using **#number_of_chars!** = *[n]x[n-1]x[n-2]x1*
```bash
  crunch 1 1 -p dog
```
*...OUTPUT...*
```bash
dgo
dog
gdo
god
odg
ogd
```

*Result*= 3x2x1 = 6 = [dog]!

## Charset with words list 

```bash
  crunch 5 5 -t ddd%% -p dog cat bird
```

Change each word (dog, cat and bird) instead of the **d** character

## All Combine

```bash
  crunch 5 5 aADE -t ddd@@ -p dog cat bird
```

Replace the symbol of each character (@) with the defined letters (aADE) and add them to the end of each word