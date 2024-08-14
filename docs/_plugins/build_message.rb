# _plugins/build_message.rb

Jekyll::Hooks.register :site, :post_write do |site|
  Jekyll.logger.info "build Message:", "Successfully built the site!"
end
