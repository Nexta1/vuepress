---
sidebar: auto
---

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