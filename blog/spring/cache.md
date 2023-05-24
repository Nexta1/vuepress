---
sidebarDepth: 3
---

# Spring Cache

## 介绍

缓存抽象的核心是将缓存应用于 Java
方法，从而减少基于缓存中可用信息的执行次数。也就是说，每次调用目标方法时，抽象都会应用缓存行为来检查是否已经为给定参数调用了该方法。如果它已被调用，则无需调用实际方法即可返回缓存的结果。如果该方法尚未被调用，则调用它，并将结果缓存并返回给用户，以便下次调用该方法时，返回缓存的结果。这样，对于给定的一组参数，昂贵的方法（无论是
CPU 绑定还是 IO 绑定）只能调用一次，并且无需再次实际调用该方法即可重用结果
::: tip
此方法仅适用于无论调用多少次都保证为给定输入（或参数）返回相同输出（结果）的方法。
:::

```xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

## 常用注解

### @Cacheable

@Cacheble注解表示这个方法有了缓存的功能，方法的返回值会被缓存下来，下一次调用该方法前，会去检查是否缓存中已经有值，如果有就直接返回，不调用方法。如果没有，就调用方法，然后把结果缓存起来。这个注解一般用在查询方法上。

### @CachePut

加了@CachePut注解的方法，会把方法的返回值put到缓存里面缓存起来，供其它地方使用。它通常用在新增方法上。

### @CacheEvict

使用了CacheEvict注解的方法，会清空指定缓存。一般用在更新或者删除的方法上。

### @Caching

Java注解的机制决定了，一个方法上只能有一个相同的注解生效。组合要应用于方法的多个缓存操作。

####                    

## Redis

```xml

<dependencies>

    <!-- other dependency elements omitted -->

    <dependency>
        <groupId>org.springframework.data</groupId>
        <artifactId>spring-data-redis</artifactId>
        <version>3.1.0</version>
    </dependency>

</dependencies>

```

### 配置

```yaml
  redis:
    # 地址
    host: localhost
    # 端口，默认为6379
    port: 6381
    # 数据库索引
    database: 0
    # 密码
    #    password: 12345
    # 连接超时时间
    timeout: 10s
    lettuce:
      pool:
        # 连接池中的最小空闲连接
        min-idle: 0
        # 连接池中的最大空闲连接
        max-idle: 8
        # 连接池的最大数据库连接数
        max-active: 8
        # #连接池最大阻塞等待时间（使用负值表示没有限制）
        max-wait: -1ms

```

### Redis Sentinel

```java
/**
 * Lettuce
 */
@Bean
public RedisConnectionFactory lettuceConnectionFactory(){
        RedisSentinelConfiguration sentinelConfig=new RedisSentinelConfiguration()
        .master("mymaster")
        .sentinel("127.0.0.1",26379)
        .sentinel("127.0.0.1",26380);
        return new LettuceConnectionFactory(sentinelConfig);
        }

/**
 * Jedis
 */
@Bean
public RedisConnectionFactory jedisConnectionFactory(){
        RedisSentinelConfiguration sentinelConfig=new RedisSentinelConfiguration()
        .master("mymaster")
        .sentinel("127.0.0.1",26379)
        .sentinel("127.0.0.1",26380);
        return new JedisConnectionFactory(sentinelConfig);
        }


```

### RedisTemplate

RedisTemplate它的大部分操作都使用基于 Java 的序列化程序。这意味着模板写入或读取的任何对象都通过 Java 进行序列化和反序列化

### 序列化
