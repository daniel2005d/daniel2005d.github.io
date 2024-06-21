require 'nokogiri'

module Jekyll
  module HeaderStylePlugin
    class HeaderConverter < Converter
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

        # Process each header element
        doc.css('h1').each do |header|
          # Apply custom styling
          header['class'] = 'custom-header'
        end

        doc.to_html
      end
    end
  end
end
