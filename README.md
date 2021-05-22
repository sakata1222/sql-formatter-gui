# SQL formatter GUI

[![docker-build](https://img.shields.io/docker/cloud/build/sakata1222/sql-formatter.svg)](https://hub.docker.com/r/sakata1222/sql-formatter)
[![docker-automated](https://img.shields.io/docker/cloud/automated/sakata1222/sql-formatter.svg)](https://hub.docker.com/r/sakata1222/sql-formatter)
[![docker-pulls](https://img.shields.io/docker/stars/sakata1222/sql-formatter.svg)](https://hub.docker.com/r/sakata1222/sql-formatter)
[![docker-pulls](https://img.shields.io/docker/pulls/sakata1222/sql-formatter.svg)](https://hub.docker.com/r/sakata1222/sql-formatter)

![image](https://raw.githubusercontent.com/sakata1222/sql-formatter-gui/master/demo_images/demo.gif)

## How to run

### [Docker Hub](https://hub.docker.com/r/sakata1222/sql-formatter)

```bash
docker run --rm -p <your-port>:5000 sakata1222/sql-formatter
```

Access to `http://<your-host>:<your-port>`

### Build yourself

#### Container

build a image

```bash
make
```

run as a container

```bash
docker run --rm -p <your-port>:5000 sql-formatter
```

#### Production mode

```bash
yarn start
```

If you have already built the sources, you can start the service as follows:

```bash
yarn serve
```

#### Development mode

```bash
yarn start:dev
```
