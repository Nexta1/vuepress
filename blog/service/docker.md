---
sidebar: auto
---

# Docker

## 核心概念

### 查看日志

```shell
#类似于 tail -f
docker logs -f <container_name_or_id>
docker logs --since "2023-01-01" --until "2023-02-01" <container_name_or_id>
docker logs <container_name_or_id> | grep "error"
docker logs <container_name_or_id> | awk '{print $2}'
docker logs <container_name_or_id> > container.log

```

## 网络

## 数据卷

在 Docker 中，有两个相关的概念：容器卷（Container Volume）和宿主机目录（Host Directory）。

容器卷是在容器内部创建的目录或文件，它用于在容器之间传递数据或持久化存储数据。容器卷是由 Docker
管理的，并且在容器的生命周期内持续存在。容器卷可以在容器创建时指定挂载到容器的特定路径上，容器内的操作可以直接影响到容器卷，同时容器卷的变化也会对其他挂载它的容器可见。容器卷通常是在容器内部进行数据交换或持久化存储的首选方式。

宿主机目录是指宿主机操作系统上的目录或文件，它可以通过挂载的方式与容器进行共享。通过将宿主机目录挂载到容器中，容器可以直接读取和写入宿主机上的文件系统。宿主机目录可以在容器启动时通过`-v`
或`--mount`选项指定挂载到容器的特定路径上。宿主机目录的内容对于容器来说是可见的，但它们在容器之间并不共享数据。

数据卷容器是一种将数据卷用作独立容器的方法。数据卷容器本身并不运行应用程序，而是专门用于持久化存储和共享数据。数据卷容器通过将数据卷挂载到容器的路径上，使得其他容器可以方便地与数据卷进行交互。使用数据卷容器的方式可以实现数据的持久性和共享，而不受容器的生命周期影响。

在选择使用容器卷还是宿主机目录时，可以考虑以下几点：

- 如果需要在容器之间共享数据或持久化存储数据，那么容器卷是更合适的选择。
- 如果需要与主机上的文件系统进行交互或访问特定主机目录，那么可以考虑使用宿主机目录挂载。
- 如果需要独立于容器的生命周期而存在的持久化数据存储，可以考虑使用数据卷容器。

选择使用哪种方式主要取决于你的具体需求和使用场景。需要根据实际情况权衡各自的优势和限制。

```shell
docker volume -h
```

## 容器

## 镜像

## 常用配置

### mysql

```shell
docker run -d \
  --name mysql8  -d \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v /docker/mysql8/conf:/etc/mysql/conf.d \
  -v /docker/mysql8/data:/var/lib/mysql \
  -v /docker/mysql8/logs:/var/log/mysql \
  mysql
```

### redis

```shell
docker run -d \
  --name redis \
  -p 6379:6379 \
  -v /docker/redis/data:/data \
  -v /docker/redis/conf/redis.conf:/etc/redis/redis.conf \
  redis redis-server /etc/redis/redis.conf
```

```shell
docker run -d \
  --name redis \
  -p 6379:6379 \
  -v ~/docker/redis/data:/data \
  -v ~/docker/redis/conf/redis.conf:/etc/redis/redis.conf \
  redis redis-server /etc/redis/redis.conf
```

## Compose

## File