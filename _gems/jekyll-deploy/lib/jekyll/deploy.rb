class Deploy < Jekyll::Command
  class << self
    def init_with_program(prog)
      prog.command(:deploy) do |c|
        c.syntax "deploy"
        c.description 'Deploy site using s3_website'

        c.action do |args, options|
          Jekyll::Commands::Build.process({})

          if `tidy --version` =~ /HTML5/
            puts "Tidying HTML..."
            system("find _site/ -name '*.html' -exec tidy -config _config/tidy.conf {} \\;")
          end

          system("bundle exec s3_website push", out: $stdout)
        end
      end
    end
  end
end
