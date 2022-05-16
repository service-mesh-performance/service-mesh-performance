build:
	protoc -I=./ --go_out=./ ./protos/service_mesh_performance.proto ./protos/service_mesh.proto ./protos/metadata.proto

site:
	cd docs; \
	make site;
