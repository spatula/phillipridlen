# Markdown
compile "/**/*.md" do
  filter :erb, trim_mode: "<>"
  filter :kramdown
  filter :colorize_syntax, default_colorizer: :rouge

  layout "/default.*"
  filter :typogruby

  write item.identifier.without_ext + "/index.html"
end
