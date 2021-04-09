# ERB
compile "/**/*.erb" do
  filter :erb, trim_mode: "<>"
  layout "/default.*"
  write item.identifier.without_ext + "/index.html"
end
