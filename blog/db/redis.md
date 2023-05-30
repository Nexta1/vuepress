---
sidebar: auto
---

# Redis

## 配置

```shell
redis-cli
INFO SERVER
```

```shell
# 允许任何主机连接、访问
bind 127.0.0.1 改为 bind 0.0.0.0
 
# 关闭保护模式
protected-mode yes 改为 protected-mode no
 
# 允许启动后在后台运行，即关闭命令行窗口后仍能运行 docker -d 不用
daemonize no 改为 daemonize yes 
```

## Redis persistence

持久性是指将数据写入持久存储，例如固态磁盘 (SSD)。Redis 提供了一系列持久化选项。这些包括：

1. RDB（Redis 数据库）：RDB 持久化以指定的时间间隔执行数据集的时间点快照。
2. AOF（Append Only File）：AOF 持久化记录服务器收到的每一个写操作。然后可以在服务器启动时再次重放这些操作，重建原始数据集。使用与
   Redis 协议本身相同的格式记录命令。
3. 无持久性：您可以完全禁用持久性。这有时在缓存时使用。
4. RDB + AOF：您还可以在同一个实例中组合使用 AOF 和 RDB。

```shell
appendonly yes
```

每次 Redis 收到更改数据集的命令（例如SET）时，它都会将其附加到 AOF。当你重启 Redis 时它会重新播放 AOF 来重建状态

## Redis replication

## Redis Sentinel

Redis Sentinel 是 Redis 提供的用于在分布式环境中管理 Redis 服务器实例的高可用解决方案。它监控 Redis
服务器并自动处理故障转移和复制，确保持续可用性和数据一致性。

1. 高可用性：Redis Sentinel 允许您通过自动检测故障并从故障中恢复来设置容错 Redis 部署。如果 Redis 主节点发生故障，Sentinel
   可以提升一个合适的副本成为新的主节点，确保服务不间断。
2. 自动故障转移：当主节点发生故障时，Sentinel 会协调从可用副本中选出新主节点的过程。它监控 Redis
   实例的运行状况并自动启动故障转移，从而减少人工干预并最大限度地减少停机时间。
3. 复制管理：Sentinel 确保正确维护复制设置。它监视复制状态并将副本与主服务器同步。如果副本失败或落后，Sentinel
   可以重新配置复制拓扑并将新副本提升为主副本。
4. 配置监控：Sentinel 持续监控 Redis 配置并跟踪 Redis 服务器拓扑。它检测集群中的任何更改并确保配置在所有节点之间保持一致。

### 前置知识

1. 运行 Sentinel 时必须使用配置文件，Sentinels 默认运行侦听 TCP 端口 26379 的连接
2. 至少需要**三个** Sentinel 实例应该放置独立的计算机或虚拟机中
3. Sentinel + Redis 分布式系统不保证在故障期间保留已确认的写入，因为 Redis 使用异步复制
   ::: warning 注意
   Sentinel、Docker 或其他形式的网络地址转换或端口映射应小心混合
   :::

### 配置哨兵

```shell
sentinel monitor mymaster 127.0.0.1 6379 2
sentinel down-after-milliseconds mymaster 60000
sentinel failover-timeout mymaster 180000
sentinel parallel-syncs mymaster 1

sentinel monitor resque 192.168.1.3 6380 4
#down-after-milliseconds是以毫秒为单位的时间，对于一个开始认为它已关闭的哨兵来说，一个实例应该无法访问
sentinel down-after-milliseconds resque 10000 
sentinel failover-timeout resque 180000

sentinel parallel-syncs resque 5
#parallel-syncs设置在故障转移后可以重新配置为同时使用新主服务器的副本数量。数字越低，完成故障转移过程所需的时间就越多

```

上面的示例配置基本上监控两组 Redis 实例，每个实例由一个主实例和未定义数量的副本组成。一组实例称为mymaster，另一组实例称为resque

```shell
sentinel monitor <master-name> <ip> <port> <quorum>
# 一个哨兵需要被选为故障转移的领导者并被授权继续进行。这只会发生在大多数 Sentinel 进程的投票中，超过设定的`quorum`就会故障转移。
```

