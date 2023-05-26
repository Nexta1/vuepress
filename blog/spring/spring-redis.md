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

RedisTemplate它的大部分操作都使用基于 Java 的序列化程序。这意味着模板写入或读取的任何对象都通过 Java 进行序列化和反序列化

```java

@Configuration
class MyConfig {

    @Bean
    LettuceConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory();
    }

    @Bean
    RedisTemplate<String, String> redisTemplate(RedisConnectionFactory redisConnectionFactory) {

        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        return template;
    }
}


```

## 序列化

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