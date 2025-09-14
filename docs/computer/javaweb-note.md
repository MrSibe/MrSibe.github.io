---
title: 黑马程序员 | JavaWeb笔记
createTime: 2025/07/13 23:02:17
permalink: /article/javaweb-note/
---

前面关于前端的知识讲解直接跳过，进入后端技术栈部分。

## Day 4 Maven 与 Web 入门

### Maven 概述

Maven 由 Apache 基金会开发，主要是用来进行**依赖管理**的。

> 没有 Maven，就需要手动去网上下载包，放在 lib 文件夹下，很麻烦；而 Maven 就只需要在 dependency 下描述一下需要什么包就行了。
> Maven 同时还指定了一个标准 Java 项目结构，还规范了清理、编译、测试、打包和发布的生命周期。

Maven 的配置文件在 `pom.xml` 中，分两个部分：一个是**项目对象模型**，包含了项目发布组织（groupId）、模块名称（artifactId）和版本号（version）等，这三个被称为 Maven 坐标（可以唯一确定一个项目）；另一个是**依赖管理模型**，就是 Dependency 下面的各种依赖描述。

### Maven 依赖管理

依赖管理模型是 `dependences` 定义的，每个依赖用 `dependency` 包裹起来，需要声明 `groupId`、`artifactId` 和 `version`，分别代表组名、模块名和版本号。修改完成刷新即可使用。

**依赖传递**是指：项目 A 依赖于项目 B，那么项目 A 就会自动依赖于项目 B 的依赖。如果项目 A 不想要项目 B 的依赖，可以通过在 `exclutions` 标签下添加 `exclution` 标记来排除这个依赖，这被称为**排除依赖**。 

依赖管理模型除了 `groupId`、`artifactId` 和 `version` 以外，还有一个 `scope` 标签，用来声明作用域。

![{AE8F703A-F2DF-4CFE-950C-8F5A9F3269E4}.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/%7BAE8F703A-F2DF-4CFE-950C-8F5A9F3269E4%7D.png)

### Maven 生命周期

![{3D6796C9-3715-4C3C-87AD-D91E5BFD1B53}.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/%7B3D6796C9-3715-4C3C-87AD-D91E5BFD1B53%7D.png)

### SpringBootWeb 入门

`@RestController` 注解用于修饰一个 Controller 类并使其支持 RESTFul 接口，把该类声明为 Controller。

`@RequestMapping` 注解用于修饰一个函数，并声明请求的地址。

### HTTP 协议

超文本传输协议，基于 TCP 协议面向连接，够安全；基于请求和响应，但是无记忆。

- 请求行：请求方式、资源路径和协议
- 请求头
- 请求体

> HTTP 协议具体后续再补

### Tomcat

Tomcat 是一个管理 Servlet 的容器。使用很简单，下载下来之后改 conf 里面的配置（例如端口号）。现在 Tomcat 已经自动集成到 spring-boot-starter-web 里面了。

## Day 5 请求响应与分层解耦

### 请求

`JavaWeb` 请求是靠浏览器、`Tomcat` 和 `Servlet` 一起合作实现的。`Servlet` 里面用 `DispatcherServlet` 进行请求（`HttpServletRequest`）的分发，分发到不同的 `Controller` 进行事务处理之后再返回（`HttpServletReponse`）。

字段处理：

1. 传统处理方式：对 `HttpServletRequest` 进行 `@getParameter(字段)` 进行指定字段的提取或者也可以直接把字段放在函数的参数列表里面，如果参数列表的名称跟请求字段不匹配，还需要用 `@RequestParam` 
2. 如果同名请求参数有多个，甚至可以 `@RequestParam` 指定一个数组提取请求字段
3. 对于日期，通过 `@DateTimeFormat` 注解把字段参数转换成 `LocalDateTime` 类型的变量
4. Json 数据，则用 `@RequestBody` 注解转换成 POJO 对象
5. 路径参数：`@RequestMapping` 里面把该参数用 `{}` 包围起来，参数列表里面再用 `@PathVariable` 注解获取路径参数。

![{CF405791-77AE-4BF5-A0AC-1FC004B8B7C9}.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/%7BCF405791-77AE-4BF5-A0AC-1FC004B8B7C9%7D.png)

### 返回

一般项目都会专门写一个 `Result` 类来统一返回的 json 数据格式。在 Controller 类上面加上 `@ResponseBody` 可以自动把返回转换成 json 格式。

```java
public class Result {
	private int code; // 响应码
	private String msg; // 返回提示信息
	private Object data; // 返回数据
	public Result success(Object data) {
		return new Result(1, 'success', data);
	}
	...
}
```

### 分层解耦

- Controller：接收前端响应，进行处理
- Service：具体的事务逻辑
- Dao：数据 CRUD。

**内聚**：模块内部的功能联系。
**耦合**：各个模块之间的依赖关联程度。
当代的软件设计讲究**高内聚低耦合**。

**IoC**：Inversion of control，控制反转，一个解耦合的思想，核心是让开发者不用 new 对象，交给 IoC 容器，容器创建的对象叫做 Bean。
**DI**：Dependency Injection，依赖注入，核心是容器为程序提供资源。

Spring 中对需要容器管理的类 A加上 `@Component` 注解，然后需要类 A的类 B，在 `private A a;` 前面加上 `@AutoWired` 注解，IoC 容器会向类 B 注入类 A。它是 spring 提供的按照类型注入的注解，若注入多个同类型的，需要用 `@Primary`、`@Resource`  代替。（`@Resource` 是 JDK 提供的，按名称注入）

`@Component` 注解有几个特化：`@Controller` 用于 Controller 层，`@Service` 用于 Service 层，`@Repository` 用于 DAO 层。

## Day 6 & 7 & 8 MySQL

MySQL 这里打算水一点，很多操作都可以图形化管理，后面项目用到了再加深记忆。先广度后深度。

### DDL 数据定义语言

```MySQL
-- 数据库相关
SHOW DATABASES; -- 查询所有数据库
SELECT DATABASE(); -- 查询当前数据库
CREATE DATABASE [IF NOT EXISTS] 数据库名; -- 创建数据库
USE 数据库名; -- 使用数据库
DROP DATABASE [IF EXISTS] 数据库名; -- 删除数据库
```

![{814B6C99-A38E-4CCE-B53A-786D88ABC0D9}.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/%7B814B6C99-A38E-4CCE-B53A-786D88ABC0D9%7D.png)

![{F3943A05-2113-40A9-8686-A5C6087E6C9C}.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/%7BF3943A05-2113-40A9-8686-A5C6087E6C9C%7D.png)

![{4FABC84F-A8B5-4193-9EE2-4E3BE626745C}.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/%7B4FABC84F-A8B5-4193-9EE2-4E3BE626745C%7D.png)

![{76E8E504-95B6-4ED8-92B7-080CD1194170}.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/%7B76E8E504-95B6-4ED8-92B7-080CD1194170%7D.png)

```MySQL
-- 查询
SHOW TABLES; -- 查询当前数据库所有表
DESC 表名; -- 查询数据库结构
SHOW CREATE TABLE 表名; -- 查询建表语句
```

![{366B15A1-B4EF-4F23-AD4D-3B0A184F5620}.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/%7B366B15A1-B4EF-4F23-AD4D-3B0A184F5620%7D.png)

![{4EC3C284-8397-4A34-A5A8-ADD1864EACBB}.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/%7B4EC3C284-8397-4A34-A5A8-ADD1864EACBB%7D.png)

### DML 数据操作语言

- 添加 (INSERT)
- 修改 (UPDATE)
- 删除 (DELETE)

注意：字符串和时间数据应该存放在引号里面。

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715110720.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715110850.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715110934.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715111013.png)

### DQL 数据查询语言

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715114400.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715114424.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715114519.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715114632.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715114716.png)

![](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202025-07-15%20114744.png)

![屏幕截图 2025-07-15 114804.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202025-07-15%20114804.png)

## Day 9 MyBatis

### 入门

MyBatis 是一个用来简化 JDBC 的持久化框架，在 JavaWeb 后端层次中处于 DAO 层（Mapper）。

使用 MyBatis 需要先在 pom 中引入依赖，然后在项目的 application 配置文件中填写配置项，最后用注解写 MySQL 语句，绑定在 Mapper 层里就可以了。

之前用 JDBC 写程序，需要手动创建并关闭与数据库的连接，特别容易出错。我们可以引入**数据库连接池**，这是一个容器，负责分配数据库连接，使得一个程序可以多次调用一个 JDBC 连接，来保证复用率和响应速度。

Lombok 也常用，它是一个 Java 类库，可以用注解的方式自动生成 getter、setter 方法，简化 Java 开发。

![屏幕截图 2025-07-15 153027.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202025-07-15%20153027.png)

### 删除

SQL 注入问题可以通过预编译解决：

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715154623.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715154813.png)

### 新增

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715155135.png)

如果要主键返回则：

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715155244.png)

### 更新

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715155618.png)

### 查询

查询会遇到数据库字段和 POJO 字段不匹配的问题，可以想办法映射过去：

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715155823.png)

### Xml 映射

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715155936.png)

可以用 IDEA 的 MyBatisX 插件来辅助开发。

### 动态 SQL

![](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715161305.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715161343.png)

Day 10 & 11 为案例，直接跳过

## Day 12 登录

登录也是一样的，创建用户表，然后 Controller、Service、Mapper。

最常考也是最核心的是登录校验，需要用到 JWT、拦截器和过滤器。

### 登录校验

#### 会话跟踪之 JWT

会话，指的是浏览器和 web 服务器的连接。一个会话过程中可以有多个请求和返回。

之前提到过 http 是无记忆的，但是有的时候我们需要在一个会话的不同请求返回中共享信息，因此需要进行**会话跟踪**，搞清楚哪些请求和返回是同一个会话的。

常见的会话跟踪方法有以下几种：

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715163743.png)

主流的令牌技术就是 JWT（Json Web Token），由三部分组成，并通过 base64 编码：

 1. Header：头部，记录令牌类型和签名算法。
 2. Payload：数据
 3. Signature：签名，防止信息被篡改

登录成功之后，服务端会生成 JWT 令牌发给客户端；客户端后面每次请求必须带上令牌，服务器统一拦截校验通过之后才处理返回。

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715171738.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715171759.png)

服务器接收到请求，需要先过滤或者拦截请求。

#### 过滤器

过滤器的实现只需要实现 Filter 接口，重写所有方法，并且加上 `@WebFilter` 注解。

如果要放行请求，则用 chain 的 doFilter 方法来放行。

多个过滤器可以形成一个过滤器链。

#### 拦截器

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715180557.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250715180955.png)

### 全局异常处理器

加上 `@RestControllerAdvice` ，一个类型的方法加上 `@ExceptionHandler`。

## Day 13 事务管理与 AOP
