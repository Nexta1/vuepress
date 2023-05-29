# Spring Data Redis

```xml

<dependencies>

    <!-- other dependency elements omitted -->

    <dependency>
        <groupId>org.springframework.data</groupId>
        <artifactId>spring-data-redis</artifactId>
        <version>3.1.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-pool2</artifactId>
    </dependency>

</dependencies>

```

## 配置

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

## RedisTemplate

RedisTemplate它的大部分操作都使用基于 Java 的序列化程序。这意味着模板写入或读取的任何对象都通过 Java 进行序列化和反序列化。

如果你没有显式配置 RedisTemplate，Spring 会尝试自动配置一个默认的 RedisTemplate。默认情况下，Spring Boot 会自动配置一个
RedisTemplate，并将其使用的序列化器设置为`JdkSerializationRedisSerializer`。

然而，如果你需要自定义序列化器、连接工厂或其他 RedisTemplate 的属性，那么你需要显式配置 RedisTemplate，并将其注入到 Spring
容器中。这样可以确保 RedisTemplate 按照你的需求进行配置和使用。

```java  

@Configuration
public class RedisConfig implements CachingConfigurer {

    @Bean
    RedisTemplate<String, String> redisTemplate(RedisConnectionFactory redisConnectionFactory) {

        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());


        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());

        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }
}


```

## 序列化

基于RedisSerializer
在 Redis 中，可以使用多种序列化方式对数据进行序列化和反序列化。以下是一些常见的序列化方式：

1. StringRedisSerializer：将对象序列化为字符串，适用于存储简单的字符串类型数据。

2. GenericJackson2JsonRedisSerializer：使用 Jackson 库将对象序列化为 JSON 字符串，适用于存储复杂的对象和数据结构。它支持多种数据类型，具有良好的可读性和可扩展性。

3. JdkSerializationRedisSerializer：使用 Java 原生的序列化机制将对象序列化为字节数组，适用于存储 Java
   对象。但它的序列化结果比较庞大，效率相对较低。

4. OxmSerializer：用于对象与 XML 之间的序列化，使用 Spring 的 O/X Mapping（OXM）模块实现。

可以根据需求选择适当的序列化方式。通常情况下，推荐使用 JSON
序列化方式，如GenericJackson2JsonRedisSerializer，因为它支持多种数据类型，并且具有较好的可读性和可扩展性。

## Redis Sentinel

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