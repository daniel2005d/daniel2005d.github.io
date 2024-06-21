function setSyntaxis(element){
    var palabras = [
        {"text": "dig","replace": "<span class='code-command'>dig</span>"},
        {"text": "jq","replace": "<span class='code-command'>jq</span>"},
        {"text": "select","replace": "<span class='code-select'>select</span>"},
        {"text": "exiftool","replace": "<span class='code-command'>exiftool</span>"},
        {"text": "php","replace": "<span class='code-php'>php</span>"}

        
      ];
    
      text = element.innerHTML;
      
    
      palabras.forEach(function(palabra) {
        var regex = new RegExp("\\b" + palabra.text + "\\b", "gi");
        var regexoptional = /\[([^\]]+)\]/g;
        //text = text.replace(/^-([a-zA-Z])/g, '<span>-$1</span>');
        text = text.replace(regex, palabra.replace)
        text = text.replace(regexoptional, '<span class="code-optional-args">[$1]</span>')
        
        
        element.innerHTML = text
      });
}

var codes = document.getElementsByClassName('code-content');

for(var i=0;i<=codes.length-1;i++){
    setSyntaxis(codes[i])
}
