---
title: 苍穹外卖 | Day 2 员工与菜品业务逻辑
createTime: 2025/07/11 20:16:48
permalink: /article/sky-takeout-2/
---
## 新增员工

### DTO

通过查看接口文档和项目原型，设计 DTO 类。

>  **DTO**：Data Transfer Object，数据传输对象，主要用于各个层之间传输数据。
>  当前端提交的数据和实体类中对应的属性差别比较大时，建议使用DTO来封装数据

DTO 一般会通过 **Lombok** 的  `@Data` 注解自动生成 getter、setter 和 toString 方法，非常方便。

> Lombok 其实就是一个 Java 库，它可以自动插入到编辑器和构建工具中，增强java的性能。以后你只需要一些简单的注解，就可以再也不用在类中反复去写get、equals等方法。

### Controller

> **Controller层**是应用程序的入口点，主要负责**接收用户请求并返回响应**。它的主要职责包括：
> 	处理前端发送的请求，并与后端服务进行交互。
> 	调用Service层的方法来处理业务逻辑，并将结果返回给前端。
> 	负责具体的业务模块流程的控制，调用Service层的接口来控制业务流程。
> 	在具体项目中，Controller层会调用Service层的方法，Service层再调用Dao层中的方法。
> 通过这种方式，Controller层确保了前后端的有效交互和业务逻辑的处理。

Controller 层因为处理前端的请求，就会用到 Spring 里面的 `@PostMapping` `@GetMapping` `RequestMapping` 等注解，而且函数参数会写 `@RequestBody` 这样的注解来把请求绑定到 DTO 上，具体可以看 Spring 官网的 Guide。

### Service 层

> **Service层**主要负责业务逻辑的处理和管理。它位于 Controller 层和 DAO 层之间，起到连接用户请求和数据访问的桥梁作用。

一般来说有一个 Service 层接口和一个 ServiceImpl 的实现。Service 将 DTO 作为参数，处理例如 save、remove 等业务逻辑。

### Mapper 层

> Mapper 层的主要职责是执行 SQL 语句，进行数据库的增删改查操作。Mapper 层通常与 DAO（Data Access Object）层相对应，有时两者是合并在一起使用的。Mapper 层的方法会被Service层所调用。

> 关于以上几层的详细讲解可以看这篇博客：[Dao层，Mapper层，controller层，service层，model层都有什么作用](https://blog.csdn.net/qq_38129062/article/details/88967217)。

Mapper 这里就很经常用到 Mybatis 了，黑马的源代码里面就使用了 `@Insert` 注解。

### 相关问题

JWT 令牌：联调的时候发现有问题，发现是没有给 JWT 令牌导致 JwtTokenAdminInterceptor 拒绝了请求。解决方法是 ApiFox 加上全局变量。JWT 相关的知识点之后讲。

注册重复名字的用户没有抛出异常：那就往异常处理器里面添加相关的异常处理逻辑。

如何知道当前操作人是谁：解析 JWT 令牌出当前操作人的编号，利用线程资源共享的特点，往 ThreadLocal 里塞操作人编号，然后 Service 层读取这个编号就可以了。

## 员工分页查询

### 开发过程

这里请求参数类型为 Query，不是json格式，在路径后直接拼接：`/admin/employee/page?name=zhangsan

跟新增员工一样，先处理 DTO 层（黑马已经弄好了），然后处理 common 模块的分页对象和 Result 对象，其次在 Controller 里面处理前端响应，通过 DTO 返回给 Service 层。

详情可以看黑马的讲义，这里不赘述。

### 相关问题

返回的 json 的时间字段格式有问题：在 WebMvcConfiguration 中扩展 Spring MVC 的消息转换器，统一对日期类型进行格式处理。

## 启用禁用员工账号

### 开发过程

先加 Controller，然后修改 Service 和 Mapper，此处不再赘述。

后面都是一样的，甚至菜品代码直接给出来了，实现都是一模一样的，都不再赘述。
