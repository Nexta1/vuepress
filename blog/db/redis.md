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

## Redis replication

Redis Replication的主要作用和需要如下：

1. 数据备份和高可用性：通过将数据复制到多个从节点，Redis Replication提供了数据备份的能力。如果主节点发生故障，可以将一个从节点升级为新的主节点，确保系统的高可用性。

2. 读写分离和负载均衡：通过将读操作分发给从节点处理，可以实现读写分离，提高系统的读取性能和并发处理能力。主节点负责处理写操作，而从节点负责处理读操作，从而分担了主节点的负载，实现负载均衡。

3. 扩展性：通过增加从节点，可以扩展Redis的读容量和处理能力。每个从节点都可以处理客户端的读请求，从而提供更高的并发性能。

4. 容灾恢复：当主节点发生故障时，可以通过从节点提升为新的主节点，实现容灾恢复。这样可以避免系统停机时间，并快速恢复服务。

5. 集群拓扑调整：通过配置和管理复制集群，可以灵活地调整集群的拓扑结构，增加或移除节点，以适应不同的业务需求和数据规模。

需要Redis Replication的原因包括：

- 数据可靠性和备份：通过复制数据到多个节点，可以确保数据的持久性和可靠性。即使主节点发生故障，数据仍然可以从从节点中恢复。
- 高可用性和容错性：通过将从节点升级为新的主节点，可以实现快速的故障恢复，提高系统的可用性和容错性。
- 读写分离和负载均衡：通过将读操作分发到从节点，可以减轻主节点的负载，提高系统的读取性能和并发处理能力。
- 扩展性和性能提升：通过增加从节点，可以扩展Redis的读容量和处理能力，以满足高并发的需求。

总的来说，Redis Replication提供了数据备份、高可用性、读写分离和扩展性等重要功能，使得Redis在大规模和高性能的应用场景下更加可靠和强大。

### 配置

配置基本的 Redis 复制很简单：只需将以下行添加到副本配置文件中：

```shell
daemonize yes
appendonly yes

# Redis 版本 5.0.0 开始， SLAVEOF 此命令被视为已弃用
replicaof 192.168.1.1 6379
replica-read-only on
```

当然，您需要将 192.168.1.1 6379 替换为您的主 IP 地址（或主机名）和端口。或者，您可以调用该REPLICAOF命令，主控主机将开始与副本同步。

可以使用repl-diskless-sync配置参数启用无盘复制。在第一个副本之后开始传输以等待更多副本到达的延迟由参数控制repl-diskless-sync-delay

## Redis persistence

持久性是指将数据写入持久存储，例如固态磁盘 (SSD)。Redis 提供了一系列持久化选项。这些包括：

### RDB（Redis 数据库）

RDB 持久化以指定的时间间隔执行数据集的快照。
父进程fork创建子线程

### AOF（Append Only File）

AOF 持久化记录服务器收到的每一个写操作。然后可以在服务器启动时再次重放这些操作，重建原始数据集。
使用与Redis 协议本身相同的格式记录命令。
AOF重写最小命令集

RDB + AOF：您还可以在同一个实例中组合使用 AOF 和 RDB。
要使用Redis的持久化功能，你可以按照以下步骤进行配置和操作：

### 配置方式

1. 配置持久化方式：
    - 打开Redis的配置文件(redis.conf)。
    - 找到以下两个配置项，根据需求进行配置：
        - `save <seconds> <changes>`：配置自动快照（RDB）的规则。例如，`save 900 1`表示在900秒（15分钟）内如果至少有1个键被修改，Redis会执行一次自动快照。
        - `appendonly yes`：启用AOF持久化。将该配置项的值设置为"yes"，表示开启AOF持久化功能。
        - `appendfsync everysec`：每秒
2. 执行手动快照（可选）：
    - 如果配置了自动快照规则，Redis将会根据规则自动执行快照。但你也可以随时执行手动快照。
    - 执行手动快照有两种方法：
        - 执行`SAVE`命令：该命令将会阻塞Redis服务器，直到快照过程完成。在这期间，Redis无法响应其他命令。
        - 执行`BGSAVE`命令：该命令会在后台执行快照，不会阻塞Redis服务器的正常操作。你可以继续执行其他命令。

3. 数据恢复：
    - 当Redis重新启动时，如果启用了RDB持久化，它会自动加载最近的RDB文件，将数据恢复到内存中。
    - 如果启用了AOF持久化，在Redis重新启动时，它会自动读取AOF文件并重放其中的写操作，将数据恢复到内存中。

需要注意以下几点：

- 在进行持久化配置和操作时，确保对数据的重要性和一致性有清晰的了解，并做好相应的备份措施。
- 根据实际需求，可以灵活选择使用RDB持久化、AOF持久化，或同时启用两者。
- 持久化会对Redis的性能产生一定影响，特别是在执行快照或AOF重放的过程中。因此，需要根据应用场景和硬件配置进行权衡和调优。

使用持久化功能可以帮助确保Redis数据的持久性和可靠性，防止数据丢失，同时提供容灾恢复和数据备份的能力。

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

