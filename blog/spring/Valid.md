---
sidebar: auto
---

# Valid

## 基本使用

```java
public class UserDTO {
    @NotBlank(message = "用户名不能为空")
    private String username;

    @NotBlank(message = "密码不能为空")
    @Size(min = 6, max = 20, message = "密码长度必须在6到20个字符之间")
    private String password;

    // Getters and setters
}
```

```java

@Validated
public class SysUserController {

    @GetMapping("/add")
    public ResponseDTO<Void> add(@Valid UserAddCommand command) {
        userApplicationService.addUser(command);
        return ResponseDTO.ok();
    }
}

```

### `@Validated`和`@Valid`

`@Validated`和`@Valid`是Spring框架中用于参数验证的注解，它们的作用有些不同。

- `@Validated`是Spring框架提供的注解，用于在控制器类或方法上启用参数验证。它提供了更多的功能和特性，例如分组验证（Group
  Validation）和级联验证（Cascade Validation）。

示例用法：

```java
@PostMapping("/users")
@Validated
public ResponseEntity<String> createUser(@RequestBody @Validated(UserDTO.Create.class) UserDTO userDTO){
        // 执行创建用户的逻辑
        return ResponseEntity.ok("User created successfully");
        }
```

在上述示例中，`@Validated`注解用于启用参数验证，`@Validated(UserDTO.Create.class)`指定了只对`UserDTO`
对象中使用`UserDTO.Create`分组进行验证。

- `@Valid`是Java标准库（javax.validation）中的注解，也可以用于参数验证。它提供了基本的验证功能，例如非空性、长度、范围等，但不支持分组验证和级联验证。

示例用法：

```java
@PostMapping("/users")
public ResponseEntity<String> createUser(@RequestBody @Valid UserDTO userDTO){
        // 执行创建用户的逻辑
        return ResponseEntity.ok("User created successfully");
        }
```

在上述示例中，`@Valid`注解用于启用参数验证，对`UserDTO`对象进行基本的验证。

总结：

- 如果你需要更多高级的功能，如分组验证和级联验证，可以使用`@Validated`注解。
- 如果你只需要进行基本的参数验证，可以使用`@Valid`注解。

### 常用校验

当你在使用Spring框架中进行参数验证时，可以使用常用的验证注解。以下是一些常见的验证注解示例，以Markdown表格的形式展示：

| 注解          | 描述                        | 示例                                                                                                             |
|-------------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| `@NotNull`  | 验证值不能为null                | `@RequestParam @NotNull private String name;`                                                                  |
| `@NotBlank` | 验证字符串值不能为空，且长度必须大于0       | `@RequestParam @NotBlank private String email;`                                                                |
| `@NotEmpty` | 验证集合、数组或Map值不能为空，且大小必须大于0 | `@RequestParam @NotEmpty private List<String> roles;`                                                          |
| `@Min`      | 验证值必须大于等于指定的最小值           | `@RequestParam @Min(18) private int age;`                                                                      |
| `@Max`      | 验证值必须小于等于指定的最大值           | `@RequestParam @Max(100) private int quantity;`                                                                |
| `@Size`     | 验证集合、数组或字符串的大小必须在指定范围内    | `@RequestParam @Size(min = 2, max = 10) private String username;`                                              |
| `@Pattern`  | 验证字符串值必须符合指定的正则表达式        | `@RequestParam @Pattern(regexp = "[A-Za-z0-9]+") private String password;`                                     |
| `@Email`    | 验证字符串值必须是有效的电子邮件地址        | `@RequestParam @Email private String email;`                                                                   |
| `@Valid`    | 标记需要进行嵌套验证的对象或集合          | `@PostMapping("/users") public ResponseEntity<String> createUser(@Valid @RequestBody UserDTO userDTO) { ... }` |

这个Markdown表格展示了常用的验证注解，以及它们的描述和示例用法。你可以根据自己的需求，在代码中使用适当的验证注解来实现参数验证。

## 进阶用法

### 分组校验

### 自定义校验

## 处理错误

```java

@RestControllerAdvice
@Slf4j
public class GlobalExceptionInterceptor {
    /**
     * 处理所有RequestBody注解参数验证异常
     */
    @ExceptionHandler(BindException.class)
    public ResponseDTO<?> handleBindException(BindException e) {
        log.error(e.getMessage(), e);
        String message = e.getAllErrors().get(0).getDefaultMessage();
        return ResponseDTO.fail(ErrorCodeMsg.Client.COMMON_REQUEST_PARAMETERS_INVALID, message);
    }

    /**
     * 处理所有RequestParam注解数据验证异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseDTO<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error(e.getMessage());
        String message = Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage();
        return ResponseDTO.fail(ErrorCodeMsg.Client.COMMON_REQUEST_PARAMETERS_INVALID, message);
    }
}
```


