build:
	protoc -I=./ --go_out=./ ./smps.proto sm.proto metadata.proto