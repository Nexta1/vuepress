# 时间类

## Date

java.util.Date：Date类是Java早期用于表示日期和时间的类，但它已经过时了，并且在Java 8及更高版本中不推荐使用。

java.util.Calendar：Calendar类提供了对日期和时间进行操作的方法。它可以用于获取和设置年、月、日、时、分、秒等各个时间字段的值。

## Java8

java.time.LocalDate：LocalDate类表示一个日期，只包含年、月、日的信息，没有时间和时区。

java.time.LocalTime：LocalTime类表示一个时间，只包含时、分、秒的信息，没有日期和时区。

java.time.LocalDateTime：LocalDateTime类表示日期和时间，包含年、月、日、时、分、秒的信息，但没有时区。

```java
public class DateTimeExample {

    // 仅表示日期
    LocalDate date = LocalDate.now();
    // 仅表示时间
    LocalTime time = LocalTime.now();
    // 同时表示日期和时间
    LocalDateTime dateTime = LocalDateTime.now();
    // 表示带有时区的日期和时间
    ZonedDateTime zonedDateTime = ZonedDateTime.now();
    // 格式化日期和时间
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String formattedDateTime = dateTime.format(formatter);
    // 解析字符串为日期和时间
    String strDateTime = "2022-05-31 14:30:00";
    LocalDateTime parsedDateTime = LocalDateTime.parse(strDateTime, formatter);

}
```

java.time.ZonedDateTime：ZonedDateTime类表示带有时区的日期和时间。

java.time.Instant：Instant类表示时间戳，表示从Java纪元（1970年1月1日午夜UTC）开始的秒数。

java.time.Duration：Duration类用于表示时间的持续时间，例如两个时间点之间的时间间隔。

java.time.Period：Period类用于表示日期的持续时间，例如两个日期之间的天数、月数、年数。

## 获取时间戳

```java
class TimeStamp() {
    long timestamp = new Date().getTime();
    long timestamp = System.currentTimeMillis();


    long timestamp = Instant.now().toEpochMilli();
    // 指定时间
    LocalDateTime dateTime = LocalDateTime.of(2023, 5, 1, 12, 0, 0);
    // 转换为时间戳
    long timestamp = dateTime.toInstant(ZoneOffset.UTC).toEpochMilli();
}
```

## 时间戳转化

```java
class Time() {
    long timestamp = 1622125678000L; // 示例时间戳

    Date date = new Date(timestamp);
    // 使用 SimpleDateFormat 格式化日期时间
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String formattedDateTime = sdf.format(date);

    // java 8
    Instant instant = Instant.ofEpochMilli(timestamp);
    // 使用 DateTimeFormatter 格式化日期时间
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String formattedDateTime = formatter.format(instant);
}
```

## 时间格式化

```java
public class DateTimeFormattingExample {

    Date date = new Date();

    SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
    String formattedDate = sdf1.format(date);


    SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm:ss");
    String formattedTime = sdf2.format(date);


    SimpleDateFormat sdf3 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String formattedDateTime = sdf3.format(date);

    // Java8
    LocalDateTime dateTime = LocalDateTime.now();

    DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    String formattedDate = dateTime.format(formatter1);


    DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("HH:mm:ss");
    String formattedTime = dateTime.format(formatter2);


    DateTimeFormatter formatter3 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String formattedDateTime = dateTime.format(formatter3);


}

```

