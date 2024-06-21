require 'jekyll'
require 'nokogiri'

module Jekyll
  class CodeBlockConverter < Converter
    safe true
    priority :low

    def matches(ext)
      ext =~ /^\.md$/i
    end

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      # Use the default markdown converter to convert content to HTML
      converter = Jekyll::Converters::Markdown.new(@config)
      html_content = converter.convert(content)

      # Parse the HTML content
      doc = Nokogiri::HTML::DocumentFragment.parse(html_content)

      # Process each code block element
      doc.css('pre code').each do |code_block|
        # Get the parent of the code block
        parent_element = code_block.parent
        # Replace parent element with custom HTML structure
        parent_element.replace(build_custom_code_block(code_block.text.strip))
      end

      # Return the modified HTML content
      doc.to_html(save_with:  Nokogiri::XML::Node::SaveOptions::NO_EMPTY_TAGS | Nokogiri::XML::Node::SaveOptions::FORMAT | Nokogiri::XML::Node::SaveOptions::AS_HTML)
    end

    def build_custom_code_block(code_content)
      # Escape special characters
      code_content = CGI.escapeHTML(code_content)
      # Replace new lines with <br> tags
      code_content = code_content.gsub("\n", "<br>")
      # code_content = code_content.gsub("\n", "<br>")
      
      # Build the custom HTML structure for the code block
      Nokogiri::HTML.fragment(<<-HTML.strip)
        <div class="window">
          <div class="title-bar">
            <div>
              <!-- <span class="window_dot language-python"></span> -->
              <span class="window_dot bg-danger"></span>
              <span class="window_dot bg-warning"></span>
              <span class="window_dot bg-success"></span>
            </div>
          </div>
          <div class="content code-content">
            #{code_content}
          </div>
        </div>
      HTML
    end
  end
end
