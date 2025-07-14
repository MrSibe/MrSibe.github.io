---
title: 黑马JavaWeb笔记
createTime: 2025/07/13 23:02:17
permalink: /article/ixsxdd4u/
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
