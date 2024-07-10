---
layout: app
title: "Bambas"
image: "/assets/images/burpsuite.png"
tags: ["Bambdas"]
---

# FUZZ User Agent

```java

String useragent = requestResponse.request().headerValue("User-Agent");

if (useragent.startsWith("Fuzz"))
{
    requestResponse.annotations().setNotes("FUZZ");
    requestResponse.annotations().setHighlightColor(HighlightColor.YELLOW);
}
```

# Check if headert exists

```java

if (requestResponse.hasResponse()){
	if (requestResponse.request().hasHeader("Postman-Token"))
    {
        requestResponse.annotations().setHighlightColor(HighlightColor.PINK);
    }
}

return true;

```

# Filter by Response content Body

```java
if (requestResponse.hasResponse()){
   String body = requestResponse.response().bodyToString();
    Boolean looksLikeJson = body.startsWith("{") || body.endsWith("}");
    if (looksLikeJson)
    {
        String regex = "\"username\"\\s*:\\s*\"(.*?)\"";
        Pattern pattern = java.util.regex.Pattern.compile(regex);
        Matcher matcher = pattern.matcher(body);
        if (matcher.find()) {
            requestResponse.annotations().setNotes( matcher.group(1));

        }

    }
}

```
