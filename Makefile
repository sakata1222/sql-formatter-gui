
PHONY: docker-build

docker-build:
	rm -rf docker_build
	mkdir -p docker_build
	rsync -a ./ docker_build --exclude "docker_build" --exclude "node_modules" --exclude "build"
	docker build docker_build -t sql-formatter
