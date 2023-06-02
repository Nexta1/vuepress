---
sidebar: auto
---

# Mysql

## 用户和权限

MySQL的用户认证形式是: 用户名+主机。

```shell
mysql -u root -p123456
#查看权限和用户
SELECT User, Host FROM mysql.user;
SELECT user, host, authentication_string FROM mysql.user;

CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
DROP USER 'username'@'localhost';
```

### 权限分类

数据权限分为：库、表和字段三种级别
管理权限：主要是管理员要使用到的权限，包括：数据库创建，临时表创建、主从部署、进程管理等
程序权限：主要是触发器、存储过程、函数等权限。

```shell
SHOW GRANTS FOR 'root'@'localhost';
#mysql5.7
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' IDENTIFIED BY '123456';
#mysql8
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

REVOKE privileges ON database_name.table_name FROM 'username'@'localhost';
```

## 日志

MySQL 提供了多种类型的日志，用于记录数据库服务器的活动和错误信息。下面是几种常见的 MySQL 日志类型及其介绍：

1. 错误日志（Error Log）：
   错误日志记录了 MySQL 服务器在运行过程中发生的错误和警告信息，包括启动和关闭过程中的错误、查询执行错误、连接问题等。错误日志对于排查和解决数据库故障非常重要。
2. 查询日志（General Query Log）：
   查询日志记录了所有的客户端查询语句，包括 SELECT、INSERT、UPDATE、DELETE 等语句。查询日志可以用于分析和优化查询性能，但需要注意，启用查询日志会对数据库性能产生一定的影响。
3. 慢查询日志（Slow Query Log）：
   慢查询日志记录了执行时间超过预设阈值的查询语句，通常用来识别数据库中执行时间较长的查询语句。慢查询日志对于优化数据库性能非常有用，可以帮助开发人员找出需要优化的查询。
4. 二进制日志（Binary Log）：
   二进制日志记录了对数据库进行的所有更改操作，如插入、更新、删除等，以二进制格式保存。二进制日志可以用于数据复制、灾难恢复和故障恢复等操作。
5. 事务日志（Transaction Log）：
   事务日志（也称为重做日志或事务日志）记录了对数据库进行的事务操作，以确保数据的一致性和持久性。事务日志可以在数据库崩溃或断电后恢复数据的完整性。
6. 慢查询日志（Slow Query Log）：
   慢查询日志记录了执行时间超过预设阈值的查询语句，通常用来识别数据库中执行时间较长的查询语句。慢查询日志对于优化数据库性能非常有用，可以帮助开发人员找出需要优化的查询。
   这些日志可以通过 MySQL 配置文件中的相应参数进行启用或配置。每个日志类型都有其特定的用途，可以根据需求选择启用并分析相应的日志内容。

```shell
 show variables like '%general%'

```

```shell
log_error=/var/log/mysql/error.log
log_error_verbosity=3
#查询日志
general_log=ON
general_log_file=/var/log/mysql/general.log
#慢查询
slow_query_log=ON
slow_query_log_file=/var/log/mysql/slow.log
long_query_time=5
#二进制
log-bin=mysql-bin
binlog_stmt_cache_size = 1M
max_binlog_size = 128M
```

## mysqladmin

`mysqladmin` 是 MySQL 提供的一个管理工具，用于执行各种管理任务和操作。除了一些常见的管理任务外，`mysqladmin`
还提供了许多其他有用的选项和功能。以下是一些常用的 `mysqladmin` 命令：

1. `mysqladmin ping`：检查与 MySQL 服务器的连接是否正常。
2. `mysqladmin status`：显示 MySQL 服务器的当前状态，包括运行时间、连接数、线程信息等。
3. `mysqladmin processlist`：显示当前正在运行的 MySQL 进程列表。
4. `mysqladmin shutdown`：关闭 MySQL 服务器。
5. `mysqladmin create database_name`：创建一个新的数据库。
6. `mysqladmin drop database_name`：删除指定的数据库。
7. `mysqladmin reload`：重新加载 MySQL 配置文件，使新的配置生效。
8. `mysqladmin variables`：显示 MySQL 服务器的当前配置变量。
9. `mysqladmin extended-status`：显示 MySQL 服务器的详细状态信息，包括各种计数器和指标。
10. `mysqladmin flush-xxx`：执行不同类型的刷新操作，如 `flush-logs`、`flush-privileges`、`flush-tables` 等。
    这只是一些常见的 `mysqladmin` 命令示例，`mysqladmin` 支持许多其他选项和功能，你可以通过运行 `mysqladmin --help` 或参考
    MySQL 官方文档以获取更多详细信息和用法示例。

## 对比

MySQL 8与MySQL 5.7相比有以下几个区别和改进：

1. 认证方式：
   MySQL 8引入了更加安全的认证方式，默认使用了caching_sha2_password插件，取代了MySQL
   5.7中的mysql_native_password插件。caching_sha2_password支持更强的密码加密算法，提供更好的安全性。
2. JSON支持：
   MySQL 8在JSON数据类型上有了更多的支持。它引入了新的JSON函数和操作符，以便在JSON数据中进行更复杂的查询和操作。
3. 窗口函数：
   MySQL 8引入了窗口函数，这是一种强大的分析函数，可在查询结果集内执行计算和聚合操作。窗口函数允许在不使用GROUP
   BY子句的情况下对结果进行分组、排序和分析。
4. 增强的查询优化器：
   MySQL 8改进了查询优化器，使其更加智能和高效。它引入了更多的查询优化技术和算法，可以提高查询性能和执行效率。
5. 改进的索引：
   MySQL 8引入了更多的索引类型和改进，包括全文索引的改进和新增的空间索引类型。这些改进可以提高查询性能和灵活性。
6. 改进的并行查询：
   MySQL 8引入了并行查询执行功能，可以在多个CPU核心上同时执行查询，提高查询性能和响应时间。
7. 改进的故障恢复：
   MySQL 8引入了更好的故障恢复机制，包括原子性和一致性日志文件刷新等改进，以提高数据恢复的可靠性和效率。
   这些是MySQL 8相对于MySQL 5.7的一些主要区别和改进。根据具体的使用情况和需求，选择适合的MySQL版本可以获得更好的性能、功能和安全性。