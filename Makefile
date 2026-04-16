build:
	protoc -I=./ --go_out=./ ./protos/service_mesh_performance.proto ./protos/service_mesh.proto ./protos/metadata.proto

site:
	cd docs; \
	make site;

site-setup:
	$(MAKE) -C docs setup

site-build:
	$(MAKE) -C docs build

site-build-preview:
	$(MAKE) -C docs build-preview BASEURL="$(BASEURL)" SITE_URL="$(SITE_URL)"
