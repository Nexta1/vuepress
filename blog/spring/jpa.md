---
sidebar: auto
---

# JPA

## 核心概念

### 实体类（Entity）

实体类是在 Java 中表示数据库表的一种对象，也称为持久化类（POJO，Plain Old Java
Object）。在关系型数据库中，表的每一行对应于实体类的一个实例，表的每一列对应于实体类的一个属性。
实体类通常使用 Java
类来表示应用程序中的业务实体或领域对象。它们包含了与数据库表中的列相对应的属性，这些属性用于存储和表示表中的数据。实体类的属性通常使用私有字段和公共的访问方法（getter
和 setter）来封装。

### 数据访问对象（Repository）

数据访问对象（Repository）是 Spring
框架中的一个设计模式，用于封装对数据存储的访问和操作。在 Spring Data 中，Repository
是对数据访问的抽象，用于提供一组用于查询、插入、更新和删除实体对象的方法。 在 Spring
Data 中，Repository
是一个接口，定义了一系列操作数据库的方法。开发人员可以通过定义自己的 Repository
接口，并继承 Spring Data 提供的基础 Repository
接口，来使用这些预定义的方法进行数据访问。 Repository
接口通常与实体类相关联，并提供对该实体类的持久化操作。它提供了常见的
CRUD（创建、读取、更新、删除）方法，如保存实体、根据主键查询实体、删除实体等。此外，Repository
还可以定义自定义查询方法，通过方法名约定或使用注解进行查询方法的定义。

### 持久化上下文（Persistence Context）

用于管理实体对象的持久化状态和数据库的交互。它是一个类似于缓存的上下文环境，用于跟踪和管理实体对象的变化，并将这些变化同步到数据库。
持久化上下文具有以下特性和功能：

1. 实体对象的管理：持久化上下文负责管理实体对象的生命周期。当实体对象被加载到持久化上下文中时，它们处于托管状态，持久化上下文会跟踪对象的变化。对托管对象进行的更改会在适当的时机自动同步到数据库。
2. 缓存：持久化上下文在内部维护了一个对象缓存，用于提高数据访问性能。当从数据库中检索实体对象时，持久化上下文会将对象缓存在内存中，以便后续的访问可以更快地从缓存中获取。
3. 脏检查（Dirty
   Checking）：持久化上下文通过脏检查机制来检测实体对象的更改。当对象的属性被修改时，持久化上下文会自动检测到变化，并在适当的时候将这些变化同步到数据库。
4. 事务管理：持久化上下文与事务管理密切相关。在事务的范围内，持久化上下文会保持打开状态，并在事务提交时将所有的更改一起同步到数据库。如果事务回滚，持久化上下文会丢弃所有未提交的更改。
5. 延迟加载（Lazy
   Loading）：持久化上下文支持延迟加载机制，以提高性能。当访问实体对象的关联对象时，持久化上下文可以延迟加载相关对象的数据，直到实际需要时才执行数据库查询。
   持久化上下文是 ORM
   框架中的一个关键组件，它简化了对实体对象的管理和与数据库的交互。通过使用持久化上下文，开发人员可以以面向对象的方式操作数据，而不需要编写大量的
   SQL 语句和手动管理数据库连接。

### 查询方法（Query Methods）

Spring Data JPA
支持使用方法名约定来定义查询方法。通过在数据访问对象接口中定义方法，并遵循一定的命名规则，Spring
Data JPA 可以根据方法名自动生成查询。开发人员可以使用预定义的关键字（如
findBy、deleteBy）以及属性表达式来构建查询方法。

## 基本使用

```xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

### 配置

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/database
    username: root
    password: password
  jpa:
    database-platform: org.hibernate.dialect.MySQL8Dialect
    hibernate:
      ddl-auto: update
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    show-sql: true
    scan-package: com.example.domain
```

#### ddl-auto

1. create： 服务程序重启后，加载 hibernate
   时都会删除上一次服务生成的表，然后根据服务程序中的
   model（entity）类再重新生成表，这个值慎用，会导致数据库中原表数据丢失。
2. create-drop ：服务服务程序重启后，加载 hibernate 时根据
   model（entity）类生成表，当 sessionFactory 关闭时，创建的表就自动删除。
3. update：默认常用属性，第一次加载 hibernate 时根据
   model（entity）类会自动建立表结构，后面服务程序重启时，加载 hibernate 会根据
   model（entity）类自动更新表结构，如果表结构改变了，但是表行仍然存在，不会删除以前的行（对于表结构行只增不减）。
4. validate ：服务程序重启后，每次加载 hibernate
   时，验证创建数据库表结构，只会和数据库中的表进行比较，如果不同，就会报错。不会创建新表，但是会插入新值。
5. none : 什么也不做。

### Entity

CrudRepository.save(…)。它通过使用底层 JPA 来持久化或合并给定的实体EntityManager。如果实体尚未持久化，Spring Data JPA
会通过调用方法来保存实体entityManager.persist(…)。否则，它调用该entityManager.merge(…)方法
当Java EE（现为Jakarta EE）中的`javax.persistence`包中常用的注解标注实体类时，可以使用Markdown表格形式总结如下：

| 注解                    | 描述                                |
|-----------------------|-----------------------------------|
| `@Entity`             | 将类标记为一个实体类                        |
| `@Table`              | 指定实体类对应的数据库表的名称和其他表相关的属性          |
| `@Id`                 | 指定一个属性作为实体类的主键                    |
| `@GeneratedValue`     | 指定主键的生成策略，如自增、UUID、序列等            |
| `@Column`             | 指定属性与数据库表列之间的映射关系，包括列名称、长度、是否可为空等 |
| `@Basic`              | 指定属性的基本映射选项，如是否懒加载、可选性等           |
| `@Transient`          | 指定一个属性不参与持久化，不与数据库表列映射            |
| `@OneToOne`           | 指定实体之间的一对一关系                      |
| `@OneToMany`          | 指定实体之间的一对多关系                      |
| `@ManyToOne`          | 指定实体之间的多对一关系                      |
| `@ManyToMany`         | 指定实体之间的多对多关系                      |
| `@JoinColumn`         | 指定实体之间关系的外键列的映射                   |
| `@JoinTable`          | 定义多对多关系的中间表的映射信息                  |
| `@Embedded`           | 指定实体属性为嵌入式对象，将嵌入式对象的属性映射到同一张表     |
| `@Embeddable`         | 标记一个类作为嵌入式对象，可嵌入到其他实体类中           |
| `@Enumerated`         | 指定枚举类型属性的映射方式                     |
| `@Temporal`           | 指定日期或时间类型属性的映射方式                  |
| `@Lob`                | 指定大型对象（如大文本或二进制数据）的映射方式           |
| `@Version`            | 标记一个属性作为实体的版本属性，用于乐观锁机制           |
| `@SequenceGenerator`  | 定义序列生成器的属性                        |
| `@TableGenerator`     | 定义表生成器的属性                         |
| `@NamedQuery`         | 定义命名查询，用于在实体类上声明自定义查询语句           |
| `@NamedQueries`       | 用于在实体类上定义多个命名查询                   |
| `@NamedNativeQuery`   | 定义命名本地查询，用于在实体类上声明自定义的本地查询语句      |
| `@NamedNativeQueries` | 用于在实体类上定义多个命名本地查询                 |

除了 `@PrePersist` 和 `@PreUpdate` 注解，JPA 还提供了其他一些常用的生命周期回调注解，用于在实体对象的生命周期中执行自定义操作。以下是一些常用的注解：

| 注解               | 描述                                                           |
|------------------|--------------------------------------------------------------|
| `@PostLoad`      | 标记一个方法，在从数据库加载实体对象后自动调用该方法。可以在该方法中执行一些后处理操作，如数据转换、计算等。       |
| `@PostPersist`   | 标记一个方法，在将实体对象持久化到数据库后自动调用该方法。可以在该方法中执行一些后处理操作，如发送通知、执行其他操作等。 |
| `@PostUpdate`    | 标记一个方法，在更新实体对象到数据库后自动调用该方法。可以在该方法中执行一些后处理操作，如发送通知、执行其他操作等。   |
| `@PostRemove`    | 标记一个方法，在从数据库删除实体对象后自动调用该方法。可以在该方法中执行一些后处理操作，如发送通知、执行其他操作等。   |
| `@PreRemove`     | 标记一个方法，在删除实体对象之前自动调用该方法。可以在该方法中执行一些预处理操作，如释放资源、执行其他操作等。      |
| `@PostConstruct` | 标记一个方法，在实例化实体对象后自动调用该方法。可以在该方法中执行一些初始化操作。                    |
| `@PreDestroy`    | 标记一个方法，在销毁实体对象之前自动调用该方法。可以在该方法中执行一些清理操作。                     |

这些注解可以用于实体类中的方法上，以定义在特定的生命周期阶段自动调用的自定义操作。你可以根据需求选择适合的注解来处理相应的业务逻辑。

```java

@MappedSuperclass
@Getter
@Setter
public class BaseEntity {

    @Column(columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt;
    @Column(columnDefinition = "DATETIME(0)")
    private LocalDateTime updatedAt;
    private Long createId;
    private Long updateId;
    private Boolean deleted;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        createId = getUserIdSafely();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        updateId = getUserIdSafely();
    }

    @Transient
    protected Long getUserIdSafely() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getId();
    }
}

```

### Repository

| 接口                         | 继承关系                            | 主要功能       | 示例方法                                                             |
|:---------------------------|---------------------------------|:-----------|------------------------------------------------------------------|
| CrudRepository             | 继承自`Repository`                 | 基本的CRUD操作  | `save(entity)`, `findById(id)`, `findAll()`, `delete(entity)`, 等 |
| PagingAndSortingRepository | 继承自`CrudRepository`             | 分页和排序查询    | `findAll(Pageable pageable)`, `findAll(Sort sort)`, 等            |
| JpaRepository              | 继承自`PagingAndSortingRepository` | 批量操作、刷新缓存等 | `saveAll(entities)`, `deleteAll()`, `flush()`, 等                 |

### Query

#### 1. 通过直接从方法名称派生查询。

```java 
// Query creation from method names
interface PersonRepository extends Repository<Person, Long> {

    List<Person> findByEmailAddressAndLastname(EmailAddress emailAddress, String lastname);

    // Enables the distinct flag for the query
    List<Person> findDistinctPeopleByLastnameOrFirstname(String lastname, String firstname);

    List<Person> findPeopleDistinctByLastnameOrFirstname(String lastname, String firstname);

    // Enabling ignoring case for an individual property
    List<Person> findByLastnameIgnoreCase(String lastname);

    // Enabling ignoring case for all suitable properties
    List<Person> findByLastnameAndFirstnameAllIgnoreCase(String lastname, String firstname);

    // Enabling static ORDER BY for a query
    List<Person> findByLastnameOrderByFirstnameAsc(String lastname);

    List<Person> findByLastnameOrderByFirstnameDesc(String lastname);
}
```

###### 1.1 分页和排序

```java

class PageOrSort {
    public void query() {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("username").ascending());
        Page<User> users = userRepository.findAll(pageable);

//        第一种
        Sort sort = Sort.by("firstname").ascending()
                .and(Sort.by("lastname").descending());
//        第二种
        TypedSort<Person> person = Sort.sort(Person.class);
        Sort sort = person.by(Person::getFirstname).ascending()
                .and(person.by(Person::getLastname).descending());

        List<User> users = userRepository.findAll(sort);
    }
}
```

```yaml
spring:
  data:
    web:
      pageable:
        one-indexed-parameters: true
```

::: tip
API 接受Sort并Pageable期望将非null值传递给方法。如果您不想应用任何排序或分页，请使用Sort.unsorted() Pageable.unpaged()。
:::

##### 1.2 其他方法

```java
interface PersonRepository extends Repository<Person, Long> {
    Streamable<Person> findByFirstnameContaining(String firstname);

    Streamable<Person> findByLastnameContaining(String lastname);

    @Query("select u from User u")
    Stream<User> findAllByCustomQueryAndStream();

    Stream<User> readAllByFirstnameNotNull();

    @Query("select u from User u")
    Stream<User> streamAllPaged(Pageable pageable);

    @Async
    Future<User> findByFirstname(String firstname);

    @Async
    CompletableFuture<User> findOneByFirstname(String firstname);


}


```

#### 2. 通过使用手动定义的查询。

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.username = :username")
    List<User> findByUsername(String username);

    @Query(value = "SELECT * FROM users u WHERE u.age > :age", nativeQuery = true)
    List<User> findByAgeGreaterThan(int age);

    @Query("select u from User u where u.emailAddress = ?1")
    User findByEmailAddress(String emailAddress);

    @Query("select u from User u where u.firstname like %?1")
    List<User> findByFirstnameEndsWith(String firstname);

    @Query("select u from User u where u.firstname = :firstname or u.lastname = :lastname")
    User findByLastnameOrFirstname(@Param("lastname") String lastname,
                                   @Param("firstname") String firstname);

    @Query("select u from #{#entityName} u where u.lastname = ?1")
    List<User> findByLastname(String lastname);

    @Modifying
    @Query("update User u set u.firstname = ?1 where u.lastname = ?2")
    int setFixedFirstnameFor(String firstname, String lastname);


    void deleteByRoleId(long roleId);

    @Modifying
    @Query("delete from User u where u.role.id = ?1")
    void deleteInBulkByRoleId(long roleId);
}

```

当使用手动定义查询（使用`@Query`注解）时，你需要遵守一些语法要求和约定。

1. JPQL语法要求：
    - 使用实体类和实体类属性名进行查询，而不是数据库表名和列名。
    - 使用实体类的属性名，区分大小写。
    - 使用`SELECT`关键字指定要查询的内容，可以是实体类对象、属性、聚合函数等。
    - 使用`FROM`关键字指定要查询的实体类。
    - 可以使用`WHERE`关键字指定查询条件，使用实体类的属性名作为条件。
    - 可以使用`ORDER BY`关键字指定排序规则，使用实体类的属性名进行排序。

2. SQL语法要求：
    - 当使用`nativeQuery = true`启用SQL查询时，可以使用数据库原生的SQL语句。
    - 在SQL语句中，可以使用数据库表名和列名。
    - 参数绑定可以使用`?`或命名参数（如`:param`）进行。

除了以上的语法要求，还需要注意以下几点：

- 如果使用命名参数进行参数绑定，需要在方法参数上使用`@Param`
  注解指定参数名。例如：`@Query("SELECT u FROM User u WHERE u.username = :username") List<User> findByUsername(@Param("username") String username);`
- 如果查询结果为实体类对象，需要确保实体类和查询结果的属性对应关系正确，可以使用构造函数表达式或`new`关键字进行映射。

## 事务

## 其他知识

### 错误处理

当谈论持久层错误拦截时，通常指的是在数据访问层（例如使用 JPA）捕获和处理数据库操作引起的异常。虽然在持久层进行错误拦截是一种有效的方式，但也存在一些考虑因素，导致它不被广泛推荐使用：

1. 耦合性增加：将错误拦截逻辑放在持久层中会增加持久层与业务逻辑层之间的耦合性。持久层应专注于数据访问的任务，而不应该处理与业务逻辑相关的错误逻辑。这样可以保持代码的职责清晰分离，提高代码的可维护性和可测试性。
2. 业务逻辑处理困难：持久层错误拦截通常只能提供对数据库操作异常的捕获和处理，但无法提供对业务逻辑相关的异常的完整处理。业务逻辑层可能需要更多的上下文信息和业务规则来进行错误处理和恢复操作。
   将错误处理逻辑放在业务逻辑层中更容易实现对全局业务异常的处理和错误恢复。
3. 框架支持和标准化：一些主流的应用框架已经提供了集成的异常处理机制，例如 Spring Framework 中的 `@ExceptionHandler`
   注解，它可以在业务逻辑层中捕获和处理各种类型的异常。这些框架提供了更灵活和标准化的方式来处理异常，使代码更加一致和易于维护。

基于上述考虑因素，通常推荐将错误拦截和处理逻辑放在业务逻辑层中而不是持久层中。业务逻辑层更适合处理与业务相关的异常和错误逻辑，而持久层应专注于数据访问的任务，并将底层数据库操作引起的异常传递到上层进行统一处理。这样可以保持代码的清晰性、可维护性和可测试性，并与主流框架提供的异常处理机制保持一致。

### JPA 对象的四种状态

1. 新建状态（New）：新建状态的对象是在内存中创建的，尚未与数据库关联。这个状态对于创建新的实体对象非常有用，你可以通过设置对象的属性来构建对象，并在适当的时候将其持久化到数据库。
2. 托管状态（Managed）：托管状态的对象是由 JPA
   进行管理和跟踪的。当对象处于托管状态时，任何对其属性的更改都将被自动同步到数据库，无需显式调用保存方法。这使得在事务边界内操作对象更加方便，同时也可以确保数据的一致性和完整性。
3. 游离状态（Detached）：游离状态的对象已经从 JPA 的持久化上下文中分离出来，不再受
   JPA
   的管理。这种状态对于在不同的事务中传递对象或者在应用程序的不同层之间传递对象非常有用。在游离状态下，对象可以被序列化、传输或存储，并在需要时重新附加到持久化上下文中进行进一步操作。
4. 删除状态（Removed）：删除状态的对象被标记为将被从数据库中删除。当你调用删除操作时，对象将进入这个状态。在提交事务时，JPA
   将会从数据库中删除这些被标记为删除状态的对象。

## 附录

### 查询语句

| 关键词                                                    | 描述                                                                                                |
|--------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| find…By read…By_ get…By_ query…By_ search…By_stream…By | 一般查询方法通常返回存储库类型、Collection或Streamable子类型或结果包装器（例如Page）可以用作findBy…，findMyDomainTypeBy…或与其他关键字结合使用。 |
| exists…By                                              | 存在projection，通常返回boolean结果                                                                        |
| count…By                                               | 返回数字结果的计数projection                                                                               |
| delete…By,remove…By                                    | 删除查询方法不返回任何结果 ( void) 或删除计数。                                                                      |
| …First 'number'…,…Top 'number'…                        | 将查询结果限制为第一个 'number' 结果。此关键字可以出现在主题中介于find（和其他关键字）和之间的任何位置by。                                     |
| …Distinct…                                             | 使用不同的查询只返回唯一的结果。此关键字可以出现在介于find（和其他关键字）和之间的任何位置by。                                                |

### 逻辑关键字和对应的关键字表达式

| Logical keyword     | Keyword expressions                      |
|---------------------|------------------------------------------|
| AND                 | And                                      |
| OR                  | Or                                       |
| AFTER               | After, IsAfter                           |
| BEFORE              | Before, IsBefore                         |
| CONTAINING          | Containing, IsContaining, Contains       |
| BETWEEN             | Between, IsBetween                       |
| ENDING_WITH         | EndingWith, IsEndingWith, EndsWith       |
| EXISTS              | Exists                                   |
| FALSE               | False, IsFalse                           |
| GREATER_THAN        | GreaterThan, IsGreaterThan               |
| GREATER_THAN_EQUALS | GreaterThanEqual, IsGreaterThanEqual     |
| IN                  | In, IsIn                                 |
| IS                  | Is, Equals, (or no keyword)              |
| IS_EMPTY            | IsEmpty, Empty                           |
| IS_NOT_EMPTY        | IsNotEmpty, NotEmpty                     |
| IS_NOT_NULL         | NotNull, IsNotNull                       |
| IS_NULL             | Null, IsNull                             |
| LESS_THAN           | LessThan, IsLessThan                     |
| LESS_THAN_EQUAL     | LessThanEqual, IsLessThanEqual           |
| LIKE                | Like, IsLike                             |
| NEAR                | Near, IsNear                             |
| NOT                 | Not, IsNot                               |
| NOT_IN              | NotIn, IsNotIn                           |
| NOT_LIKE            | NotLike, IsNotLike                       |
| REGEX               | Regex, MatchesRegex, Matches             |
| STARTING_WITH       | StartingWith, IsStartingWith, StartsWith |
| TRUE                | True, IsTrue                             |
| WITHIN              | Within, IsWithin                         |

### 关键字和对应的描述

| Keyword         | Description                                            |
|-----------------|--------------------------------------------------------|
| IgnoreCase      | 用于对比较进行不区分大小写的操作。                                      |
| IgnoringCase    | 用于对比较进行不区分大小写的操作。                                      |
| AllIgnoreCase   | 对所有适当的属性进行不区分大小写的操作。                                   |
| AllIgnoringCase | 对所有适当的属性进行不区分大小写的操作。                                   |
| OrderBy...      | 指定静态排序顺序，后跟属性路径和方向（例如，OrderByFirstnameAscLastnameDesc） | 










