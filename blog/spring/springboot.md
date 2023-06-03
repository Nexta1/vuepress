---
sidebar: auto
---

## 生命周期

除了 `CommandLineRunner`，Spring Boot 还提供了其他一些注解来定义在特定时间点执行的方法。这些注解用于定义特定的生命周期事件，当事件发生时，对应的方法会被自动调用。

以下是一些常见的方法注解：

1. `@PostConstruct`：用于标记在构造函数执行完毕后立即调用的方法。通常用于初始化操作。
2. `@PreDestroy`：用于标记在 bean 销毁之前调用的方法。通常用于释放资源等清理操作。
3. `@EventListener`：用于标记事件监听器方法。当指定的事件发生时，对应的方法会被触发。
4. `@Scheduled`：用于标记定时任务方法。指定方法在特定时间间隔内定期执行。
   这些注解可以直接应用于方法上，通过标记相应的注解，Spring Boot 会在适当的时间调用对应的方法。
   注意：这些注解通常是与 Spring Framework 相关的注解，并且可以与 Spring Boot
   一起使用。它们提供了灵活的方式来定义初始化、销毁、事件监听和定时任务等操作，以满足特定的业务需求。

## 事务

在Spring框架中使用事务可以通过以下步骤进行配置和实现：

1. 配置数据源：首先需要配置数据库连接和数据源，可以使用Spring的数据访问技术，如Spring JDBC或Spring Data
   JPA， `EnableTransactionManagement`开启事务
2. 配置事务管理器：在Spring中，事务是通过事务管理器来管理的。你需要配置一个事务管理器，以便在需要的时候启用事务管理。Spring提供了多个事务管理器的实现，例如JDBC事务管理器、Hibernate事务管理器等。
3. 配置事务通知：在需要应用事务的方法上，使用Spring的事务注解进行标记。常用的事务注解包括`@Transactional`
   注解。将`@Transactional`注解放置在方法上，表示该方法需要应用事务。你可以在注解中指定事务的属性，如事务的隔离级别、传播行为、回滚条件等。
4. 启用事务支持：在Spring的配置文件中，启用事务支持，以便Spring能够识别和处理事务。

通过以上步骤，你可以在Spring中成功使用事务。当调用标记有`@Transactional`
注解的方法时，Spring会自动为其开启事务，并在方法执行结束后进行事务的提交或回滚。如果在方法执行过程中出现异常，事务管理器会回滚事务，保证数据的一致性和完整性。
需要注意的是，在使用Spring的事务管理时，确保使用的是受Spring管理的Bean，以便Spring能够拦截方法调用并应用事务管理。另外，要确保事务管理器和数据源的配置正确，并在需要应用事务的方法上使用适当的事务注解。

## 异常处理

Exception 类是 Throwable 类的子类。除了Exception类外，Throwable还有一个子类Error
`Exception` 是一个表示异常情况的基类。它是所有异常类的父类，用于处理程序执行过程中可能发生的异常情况。
`Exception` 类位于 `java.lang` 包中，是一个受检查异常（Checked
Exception），意味着在方法签名中必须声明该异常或在方法体内进行捕获和处理。`Exception`
及其子类主要用于表示程序执行过程中的可预见异常，如输入错误、网络连接问题、文件访问错误等。

`Exception` 类提供了一些常用方法和属性，包括：

- `getMessage()`：获取异常的详细描述信息。
- `getCause()`：获取引起该异常的原因（即异常链中的上一个异常）。
- `printStackTrace()`：打印异常的堆栈跟踪信息，包括异常发生的位置和调用栈信息。

除了 `Exception` 类，Java 还提供了许多其他的异常类，包括：

- `RuntimeException`：表示运行时异常，它是 `Exception` 的子类，不需要在方法签名中声明或捕获，通常由程序逻辑错误引起，如空指针异常、数组越界异常等。
- `IOException`：表示输入输出异常，用于处理与输入输出相关的异常情况，如文件操作异常、网络通信异常等。
- `NullPointerException`：表示空指针异常，当对一个空引用进行操作时抛出。
- `FileNotFoundException`：表示文件未找到异常，当尝试访问一个不存在的文件时抛出。
- `ArithmeticException`：表示算术异常，如除零操作导致的异常。

在处理异常时，通常使用 `try-catch` 块来捕获和处理异常。在 `try` 块中放置可能抛出异常的代码，而在 `catch`
块中捕获并处理异常。如果无法处理异常，可以将异常继续抛出或进行其他处理操作。

下面是一个简单的示例，演示了如何使用 `try-catch` 块来捕获和处理异常：

```java
try{
        // 可能抛出异常的代码
        int result=divide(10,0); // 除零操作，会抛出 ArithmeticException
        System.out.println("Result: "+result);
        }catch(ArithmeticException e){
        // 捕获并处理异常
        System.out.println("An arithmetic exception occurred: "+e.getMessage());
        }
```

在上述示例中，`divide` 方法可能会抛出 `ArithmeticException`，在 `catch` 块中捕获该异常并进行处理。

总结来说，`Exception` 是 Java 中表示异常情况的基类，它的子类用于表示具体的异常类型。通过 `try-catch`
块可以捕获和处理异常，保证程序的健壮性和可靠性。

```java

@EqualsAndHashCode(callSuper = true)
public class ApiException extends RuntimeException {

    @Getter
    protected String message;
    @Getter
    protected ErrorInterface error;

    protected Object[] args;


    public ApiException(Throwable e, ErrorInterface error, Object... args) {
//        自定义异常类中，使用 super(e) 调用父类的构造方法是为了将异常的原因（Throwable）传递给父类的构造方法进行处理。
//        在异常类的层级结构中，每个异常类都继承自其他异常类，直到最终继承自Throwable。通过调用父类的构造方法，可以将异常的原因传递给更高级别的异常类进行处理或记录。这样可以保留原始异常的信息，帮助定位和调试问题。
        super(e);
        this.error = error;
        this.message = StrUtil.format(error.getMsg(), args);
    }

    public ApiException(ErrorInterface error) {
        this.error = error;
        this.message = StrUtil.format(error.getMsg());
    }

    public ApiException(ErrorInterface error, Object... args) {
        this.error = error;
        this.message = StrUtil.format(error.getMsg(), args);
    }
}
```

## 附录

[yml配置类](https://springdoc.cn/spring-boot/application-properties.html#application-properties.json.spring.gson.date-format)