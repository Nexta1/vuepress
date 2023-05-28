---
sidebar: auto
---

# Jackson

## ObjectMapper

`ObjectMapper`是Jackson库中的核心类之一，用于将Java对象（如POJO、Map、List等）与JSON之间进行序列化和反序列化。

以下是一些`ObjectMapper`的重要功能和用法：

### 1. 序列化

使用`writeValue()`系列方法可以将Java对象序列化为JSON字符串。可以将对象、Map、List等数据结构序列化为对应的JSON表示。

```java
ObjectMapper objectMapper=new ObjectMapper();
        String json=objectMapper.writeValueAsString(obj);
```

### 2. 反序列化

使用`readValue()`系列方法可以将JSON字符串反序列化为Java对象。可以将JSON字符串转换为POJO、Map、List等类型的对象。

```java
ObjectMapper objectMapper=new ObjectMapper();
        MyObject obj=objectMapper.readValue(json,MyObject.class);¬
```

### 3. 自定义配置

`ObjectMapper`提供了许多配置选项，可以根据需要进行自定义。可以通过方法调用或使用注解来配置日期格式、空值处理、属性排序等。例如：

```yaml
spring:
  jackson:
    constructor-detector: # 自动检测构造函数的策略
    date-format: yyyy-MM-dd HH:mm:ss
    default-leniency: false
    default-property-inclusion: # 序列化过程中属性的包含策略
    deserialization: # 反序列化的开关功能
    generator: # 生成器的开关功能
    locale: # 用于格式化的Locale
    mapper: # 通用开关功能
    parser: # 解析器的开关功能
    property-naming-strategy: # 属性命名策略
    serialization: # 序列化的开关功能
    time-zone: # 格式化日期时使用的时区
    visibility: # 可见性阈值
```

```java

@Configuration
public class JacksonConfig {
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        // 自定义配置

        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true); //启用输出的缩进，使JSON格式更易读。
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false); //当序列化空对象时是否抛出异常。

        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, true); //启用根值解包功能，允许从包装的根对象中提取属性。
        objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true); //允许将单个值反序列化为数组，即使它不是数组格式。
        objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true); //在反序列化时接受属性名称的大小写不敏感。

        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);//设置在序列化过程中包含非空值的属性。
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        return objectMapper;
    }
}

```

### 4. 注解支持

`ObjectMapper`支持使用Jackson提供的注解（如`@JsonProperty`、`@JsonInclude`、`@JsonIgnore`
等）来控制对象与JSON之间的映射关系。可以使用注解来自定义属性名、忽略某些属性等。

### 5. 序列化器和反序列化器

`ObjectMapper`
允许注册自定义的序列化器和反序列化器，以实现对特定类型或特定场景的定制。可以实现`JsonSerializer`和`JsonDeserializer`
接口，并将其注册到`ObjectMapper`中。

```java
ObjectMapper objectMapper=new ObjectMapper();
        SimpleModule module =new SimpleModule();
        module.addSerializer(MyCustomType.class,new MyCustomSerializer());
        module.addDeserializer(MyCustomType.class,new MyCustomDeserializer());
        objectMapper.registerModule(module);
```

6. 其他功能：`ObjectMapper`还提供了其他一些功能，如树模型操作（使用`JsonNode`）、JSON生成器（使用`JsonGenerator`
   ）、JSON解析器（使用`JsonParser`）等。
   ::: tip
   [官方文档](https://github.com/FasterXML/jackson-docs)
   :::

## 常用注解

Jackson库提供了一系列的注解，用于控制对象与JSON之间的映射关系和序列化/反序列化行为。以下是一些常用的Jackson注解及其用途：

### 1. `@JsonProperty`

用于指定属性在JSON中的名称。可以用于属性的序列化和反序列化。

```java
@JsonProperty("username")
private String name;
```

### 2. `@JsonAlias`

用于指定属性的别名，允许使用多个名称来映射同一个属性。

```java
@JsonAlias({"name", "fullName"})
private String username;
```

### 3. `@JsonIgnore`

用于忽略属性，使其在序列化和反序列化过程中被忽略。

```java
@JsonIgnore
private String password;
```

### 4. `@JsonFormat`

用于指定属性的格式化方式，例如日期格式、数值格式等。

```java
@JsonFormat(pattern = "yyyy-MM-dd")
private Date birthDate;
```

### 5. `@JsonInclude`

用于控制序列化时是否包含属性，可以指定包含非空值的属性、非默认值的属性等。

```java
@JsonInclude(Include.NON_NULL)
private String email;
```

### 6. `@JsonCreator`

用于在反序列化过程中指定一个自定义的构造函数或静态工厂方法。

```java
@JsonCreator
public User(@JsonProperty("username") String username,@JsonProperty("password") String password){
        // constructor logic
        }
```

### 7. `@JsonGetter` / `@JsonSetter`

用于指定属性的自定义getter和setter方法，用于序列化和反序列化。

```java
@JsonGetter("username")
public String getName(){
        return this.username;
        }

@JsonSetter("username")
public void setName(String name){
        this.username=name;
        }
```

**Jackson库还提供了一些用于控制整个类的注解，用于定义序列化和反序列化的行为。**

### `@JsonIgnoreProperties`

用于指定在序列化和反序列化过程中要忽略的属性列表。

```java

@JsonIgnoreProperties({"id", "createdAt"})
public class User {
    // class definition
}
```

### `@JsonAutoDetect`

用于指定类的可见性和字段的可见性，控制哪些属性会被序列化和反序列化。

```java

@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE)
public class User {
    // class definition
}
```

### `@JsonRootName`

用于指定序列化和反序列化时的根元素名称。

```java

@JsonRootName("user")
public class User {
    // class definition
}
```

### `@JsonTypeInfo`

用于指定多态类型的处理方式，允许在序列化和反序列化过程中保留对象的类型信息。

```java

@JsonTypeInfo(use = Id.NAME, include = As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Dog.class, name = "dog"),
        @JsonSubTypes.Type(value = Cat.class, name = "cat")
})
public abstract class Animal {
    // class definition
}
```

这些类级别的注解提供了更细粒度的控制，允许你定义整个类的序列化和反序列化行为。你可以根据需要选择适合的注解来控制类级别的行为。