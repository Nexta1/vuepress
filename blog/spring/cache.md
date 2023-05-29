---
sidebarDepth: 3
---

# Spring Cache

## 介绍

缓存抽象的核心是将缓存应用于 Java

方法，从而减少基于缓存中可用信息的执行次数。

也就是说，每次调用目标方法时，抽象都会应用缓存行为来检查是否已经为给定参数调用了该方法。如果它已被调用，则无需调用实际方法即可返回缓存的结果。如果该方法尚未被调用，则调用它，并将结果缓存并返回给用户，以便下次调用该方法时，返回缓存的结果。

这样，对于给定的一组参数，昂贵的方法（无论是
CPU 绑定还是 IO 绑定）只能调用一次，并且无需再次实际调用该方法即可重用结果

```xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

## 常用注解

### @EnableCaching

```java

@Configuration
@EnableCaching
public class AppConfig {
}
```

### @Cacheable

@Cacheable注解表示这个方法有了缓存的功能，方法的返回值会被缓存下来，下一次调用该方法前，会去检查是否缓存中已经有值，如果有就直接返回，不调用方法。如果没有，就调用方法，然后把结果缓存起来。这个注解一般用在查询方法上。

缓存抽象使用一个简单的方法CacheResolver来检索在操作级别定义的缓存，方法是使用已配置的 CacheManager
要提供不同的默认缓存解析器，您需要实现该 org.springframework.cache.interceptor.CacheResolver接口。

[SpEL表达式](https://docs.spring.io/spring-framework/reference/integration/cache/strategies.html)

```java
@Cacheable("books")
public Book findBook(ISBN isbn){...}

@Cacheable(cacheNames = "books", cacheManager = "anotherCacheManager")
public Book findBook(ISBN isbn){...}

@Cacheable(cacheResolver = "runtimeCacheResolver")
public Book findBook(ISBN isbn){...}

// sync属性来指示底层缓存提供程序在计算值时锁定缓存条目
@Cacheable(cacheNames = "foos", sync = true)
public Foo executeExpensiveOperation(String id){...}

// 仅当参数的长度小于 32 时才缓存以下方法
// unless属性用于指定一个SpEL，用于定义在何种情况下不缓存方法的返回结果。在给定的表达式求值为true时，不会将方法的返回值缓存起来。
@Cacheable(cacheNames = "book", condition = "#name.length() < 32", unless = "#result.hardback")
public Book findBook(String name)
```

### @CachePut

加了@CachePut注解的方法，会把方法的返回值put到缓存里面缓存起来，供其它地方使用。它通常用在新增方法上。

```java
@CachePut(cacheNames = "book", key = "#isbn")
public Book updateBook(ISBN isbn,BookDescriptor descriptor)
```

### @CacheEvict

使用了CacheEvict注解的方法，会清空指定缓存。一般用在更新或者删除的方法上。

```java
@CacheEvict(cacheNames = "books", allEntries = true)
public void loadBooks(InputStream batch)
```

### @Caching

Java注解的机制决定了，一个方法上只能有一个相同的注解生效。组合要应用于方法的多个缓存操作 。

```java
@Caching(evict = {@CacheEvict("primary"), @CacheEvict(cacheNames = "secondary", key = "#p0")})
public Book importBooks(String deposit,Date date)
```

### @CacheConfig

```java

@CacheConfig("books")
public class BookRepositoryImpl implements BookRepository {

    @Cacheable
    public Book findBook(ISBN isbn) {...}
}
```

@CacheConfig是一个类级注释，允许共享缓存名称、 custom KeyGenerator、 customCacheManager和 custom
CacheResolver。将此注释放在类上不会打开任何缓存操作。

## 配置缓存存储

### CachingConfigurer

CachingConfigurerSupport是Spring提供的一个方便的基类，用于配置缓存相关的设置。它实现了CachingConfigurer接口，并提供了默认的空实现方法，使得我们可以只关注需要定制的方法，而无需实现所有的接口方法。
通过继承CachingConfigurerSupport，我们可以重写其中的方法来自定义缓存的配置。以下是一些常用的方法：

1. cacheManager(): 用于配置缓存管理器。可以返回一个CacheManager对象，用于管理缓存的创建、获取和清理等操作。需要注意的是，如果你自定义了这个方法，你需要确保返回一个有效的CacheManager对象。
2. cacheResolver(): 用于配置缓存解析器。可以返回一个CacheResolver对象，用于解析在操作级别定义的缓存，确定要使用哪个缓存来存储或检索数据。通过自定义缓存解析器，你可以根据需要的逻辑来决定使用哪些缓存。
3. keyGenerator(): 用于配置缓存键生成器。可以返回一个KeyGenerator对象，用于生成缓存的键。缓存的键在缓存中用于唯一标识缓存项，根据键来获取或存储缓存数据。
4. errorHandler(): 用于配置缓存异常处理器。可以返回一个CacheErrorHandler对象，用于处理在缓存操作过程中发生的异常。通过自定义异常处理器，你可以针对不同的缓存异常进行特定的处理逻辑。

## JVM缓存

### GuavaCache

[文档](https://wizardforcel.gitbooks.io/guava-tutorial/content/1.html)

```xml
<!-- https://mvnrepository.com/artifact/com.google.guava/guava -->
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>31.1-jre</version>
</dependency>

```

```java

@Slf4j
public abstract class AbstractGuavaCacheDao<T> {

    private final LoadingCache<String, Optional<T>> guavaCache = CacheBuilder.newBuilder()
            // 基于容量回收。缓存的最大数量。超过就取MAXIMUM_CAPACITY = 1 << 30。依靠LRU队列recencyQueue来进行容量淘汰
            .maximumSize(1024)
            .refreshAfterWrite(5L, TimeUnit.MINUTES)
            // 移除监听事件
            .removalListener(removal -> {
                // 可做一些删除后动作，比如上报删除数据用于统计
                log.info("触发删除动作，删除的key={}, value={}", removal.getKey(), removal.getValue());
            })
            // 并行等级。决定segment数量的参数，concurrencyLevel与maxWeight共同决定
            .concurrencyLevel(16)
            // 开启缓存统计。比如命中次数、未命中次数等
            .recordStats()
            // 所有segment的初始总容量大小
            .initialCapacity(128)
            .build(new CacheLoader<String, Optional<T>>() {
                @NotNull
                @Override
                public Optional<T> load(@NotNull String key) {
                    T cacheObject = getObjectFromDb(key);
                    log.debug("find the local guava cache of key: {}  is {}", key, cacheObject);
                    return Optional.ofNullable(cacheObject);
                }
            });

    //    从LoadingCache查询的正规方式是使用get(K)方法。这个方法要么返回已经缓存的值，要么使用CacheLoader向缓存原子地加载新值。
    public T get(String key) {
        try {
            log.info("{}", guavaCache.get(key));
            return guavaCache.get(key).orElse(null);
        } catch (ExecutionException e) {
            log.error("get cache object from guava cache failed.");
            e.printStackTrace();
            return null;
        }
    }


    public void invalidate(String key) {
        if (StrUtil.isEmpty(key)) {
            return;
        }
        guavaCache.invalidate(key);
    }

    /**
     * Description:
     * 清除Key
     *
     * @author nexta1
     * @date 2023/5/3 12:16
     */
    public void invalidateAll() {
        guavaCache.invalidateAll();
    }

    /**
     * 从数据库加载数据
     *
     * @param id
     * @return
     */
    public abstract T getObjectFromDb(Object id);

}
```

### Caffeine
