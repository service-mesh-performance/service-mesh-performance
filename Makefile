build:
	protoc -I=./ --go_out=./ ./smps.proto