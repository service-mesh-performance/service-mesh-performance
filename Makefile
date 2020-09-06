build:
	protoc -I=./ --go_out=./ ./smp.proto sm.proto metadata.proto traffic_metadata.proto