build:
	protoc -I=./ --go_out=./ ./smps.proto service-meshes.proto