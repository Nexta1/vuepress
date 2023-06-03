---
sidebar: auto
---

# Mysql

## 使用

### 事务

1. 原子性：一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。
2. 一致性：在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。
3. 隔离性：数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read
   uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。
4. 持久性：事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。

> **在MySQL中，可以使用以下语句来定义和管理事务：**

* 开始事务：START TRANSACTION 或 BEGIN
* 提交事务：COMMIT
* 回滚事务：ROLLBACK
* 设置保存点：SAVEPOINT savepoint_name
* 回滚到保存点：ROLLBACK TO SAVEPOINT savepoint_name

```sql
START TRANSACTION;

-- 执行一系列数据库操作

-- 检查是否有错误或异常情况

IF <条件> THEN
ROLLBACK;
ELSE
COMMIT;
END IF;

# 保存点
START TRANSACTION;

-- 执行一系列数据库操作

SAVEPOINT savepoint_name;

-- 执行更多数据库操作

IF <条件> THEN
ROLLBACK TO SAVEPOINT savepoint_name;
ELSE
COMMIT;
END IF;

```

> **MySQL提供了四个隔离级别来控制并发事务的隔离程度，每个级别都具有不同的特点和权衡。以下是对每个隔离级别的详细介绍：**

1. 读未提交（Read Uncommitted）：
    - 最低的隔离级别，允许一个事务读取另一个事务未提交的数据。
    - 可能导致脏读（Dirty Read），即读取到未提交的数据，可能是无效或错误的数据。
    - 不提供任何并发控制，可能导致幻读（Phantom Read）和不可重复读（Non-repeatable Read）问题。

2. 读提交（Read Committed）：
    - 默认隔离级别，在每个SQL语句开始时获取一致性读取快照。
    - 保证了事务只能读取到已提交的数据，避免了脏读。
    - 但是，在同一个事务内，不同的查询可能返回不一致的结果，因为其他事务可能会修改已读取的数据。

3. 可重复读（Repeatable Read）：
    - 在事务开始时获取一致性读取快照，并在整个事务期间保持一致。
    - 保证了同一个事务内多次读取相同的数据将得到相同的结果即不可修改删除现有的数据，避免了不可重复读。
    - 但是，可能会遇到幻读问题，即在同一个事务内多次查询返回不同的行，针对插入而言。

4. 串行化（Serializable）：
    - 最高的隔离级别，确保了事务串行执行，避免了脏读、不可重复读和幻读问题。
    - 使用锁来保证事务的隔离，所有并发事务将按照顺序依次执行。
    - 可能导致并发性能下降，因为事务需要等待其他事务释放锁。

可以使用以下语句来设置MySQL中的隔离级别：

```
SET TRANSACTION ISOLATION LEVEL <隔离级别>;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

需要注意的是，隔离级别的选择应该根据应用程序的需求和特定情况来进行权衡。更高的隔离级别通常提供更好的数据一致性，但也可能导致并发性能下降。因此，选择适当的隔离级别是根据应用程序的要求和并发访问的特点进行的决策。

### 锁

> 使用锁是为了实现并发事务的隔离和控制对数据的访问

1. 实现并发控制：当多个事务同时访问数据库时，使用锁可以确保数据的一致性和完整性。锁可以防止不同事务之间的数据冲突，避免脏读、不可重复读和幻读等问题。
2. 保证数据完整性：锁可以防止并发事务对同一数据进行并发修改，保证数据的完整性。只有获取了合适的锁的事务才能对数据进行读取或写入操作。
3. 避免并发问题：并发访问可能导致竞争条件和资源争用问题。使用锁可以控制对共享资源的访问，避免多个事务同时修改同一数据，从而避免并发问题。

下面是一些使用锁的指导：

1. 选择合适的锁粒度：根据业务需求和数据访问模式，选择合适的锁粒度，如行级锁、表级锁或页级锁。更细粒度的锁可以提高并发性能，但也会增加锁开销。
2. 选择合适的隔离级别：根据应用程序的需求，选择适当的隔离级别来控制事务之间的隔离程度。不同的隔离级别提供不同的并发控制和数据一致性保证。
3. 显式锁定：对于需要精确控制的操作，可以使用显式锁定语句（如`LOCK TABLES`语句）来锁定需要的资源。这样可以确保其他事务无法访问锁定的资源。
4. 使用事务：将相关操作放入事务中，并根据需要设置适当的隔离级别。事务可以确保一组操作作为一个原子操作执行，并提供了更好的并发控制和数据一致性。
5. 避免长时间持有锁：为了避免锁竞争和提高并发性能，尽量减少长时间持有锁的情况。在完成操作后及时释放锁，尽量缩小锁的范围。

需要注意的是，锁的使用需要谨慎，过度的锁使用可能导致性能问题和并发性能下降。正确地选择锁粒度、隔离级别以及合理地管理锁的获取和释放是实现并发控制的关键。在设计和实施锁策略时，需要根据具体的应用程序需求和并发访问模式进行

评估和测试。

### 索引

## 设计

## 管理

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

:::warning
如果配置文件不生效， `mysqladmin reload` 可以排查

`chmod -R 655 /docker/mysql8/conf/` 群组要有写的权限，否则无法写入配置不生效
:::

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