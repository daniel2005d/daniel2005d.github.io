require 'jekyll'
require 'nokogiri'

module Jekyll
  class BlockquoteToAlertConverter < Converter
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

      # Process each blockquote element
      doc.css('blockquote').each do |blockquote|
        # Get the inner HTML of the blockquote
        blockquote_content = blockquote.inner_html.strip
        # Replace blockquote with custom alert HTML structure
        blockquote.replace(build_custom_alert(blockquote_content))
      end

      # Return the modified HTML content
      doc.to_html(save_with: Nokogiri::XML::Node::SaveOptions::NO_EMPTY_TAGS | Nokogiri::XML::Node::SaveOptions::FORMAT)
    end

    def build_custom_alert(content)
      # Escape special characters
    #   content = CGI.escapeHTML(content)
    #   # Replace new lines with <br> tags
    #   content = content.gsub("\n", "<br>")
      # Build the custom HTML structure for the alert
      Nokogiri::HTML.fragment(<<-HTML.strip)
        <div class="alert alert-success" role="alert">
          #{content}
        </div>
      HTML
    end
  end
end
