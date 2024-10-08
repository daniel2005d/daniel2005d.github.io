module Jekyll
  class WrapCodeBlocks < Generator
    def generate(site)
      site.posts.docs.each do |post|
        #puts "Procesando post #{post.title}"
        post.content = wrap_code(post.content)
      end
    end

    private

    def wrap_code(content)
      # Utiliza una expresión regular para encontrar bloques de código
      content.gsub(/(```.*?[\r\n])(.*?)(\n```)/m) do |match|
        language = $1.strip # Guarda el lenguaje del bloque de código
        
        code = $2.strip.gsub("&", "&amp;").gsub("<", "&lt;").gsub(">", "&gt;") # Escapa el código
        "<ul class='code-block'><li><pre><code class='#{language}'>#{code}</code></pre></li></ul>"
        
      end
    end
  end
end
