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