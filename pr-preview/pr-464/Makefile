jekyll=bundle exec jekyll
SITE_URL ?= https://smp-spec.io
BASEURL ?=

site:
	bundle install; $(jekyll) serve --drafts --livereload 

# With Jekyll Manager interface
site-admin:
	ADMIN=on $(jekyll) serve --drafts --livereload 

build:
	@tmp_config=$$(mktemp); \
	printf 'url: "%s"\n' "$(SITE_URL)" > "$$tmp_config"; \
	$(jekyll) build --drafts --config _config.yml,$$tmp_config --baseurl "$(BASEURL)"; \
	rm -f "$$tmp_config"

build-preview:
	@tmp_config=$$(mktemp); \
	printf 'url: "%s"\n' "$(SITE_URL)" > "$$tmp_config"; \
	JEKYLL_ENV=preview $(jekyll) build --drafts --config _config.yml,$$tmp_config --baseurl "$(BASEURL)"; \
	rm -f "$$tmp_config"

setup:
	ADMIN=on bundle install

docker:
	docker run --name smp --rm -p 4000:4000 -v `pwd`:"/srv/jekyll" jekyll/jekyll:4.1.1 bash -c "bundle install; jekyll serve --drafts --livereload"
