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
    url: jdbc:mysql://localhost:3306/mydatabase
    username: root
    password: password
  jpa:
    database-platform: org.hibernate.dialect.MySQL8Dialect
    hibernate:
      ddl-auto: update
      naming:
      #      下划线
      physical-strategy: org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy
    #      驼峰命名
    #      physical-strategy:  org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
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

## 其他知识

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










