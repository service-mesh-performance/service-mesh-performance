jekyll=bundle exec jekyll

site:
	$(jekyll) serve --drafts --livereload 

# With Jekyll Manager interface
site-admin:
	ADMIN=on $(jekyll) serve --drafts --livereload 

build:
	$(jekyll) build --drafts 

setup:
	ADMIN=on bundle install

docker:
	docker run --name smp --rm -p 4000:4000 -v `pwd`:"/srv/jekyll" jekyll/jekyll:4.1.1 bash -c "bundle install; jekyll serve --drafts --livereload"
