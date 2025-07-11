---
title: 苍穹外卖 | Day 1 起步
createTime: 2025/07/11 16:23:00
permalink: /article/gyrtd4e6/
---
## 软件开发流程

### 需求分析

完成需求规格说明书、产品原型编写。  

1. **需求规格说明书**：使用 Word 文档来描述当前项目的各个组成部分，如：系统定义、应用环境、功能规格、性能需求等。
2. **产品原型**：一般是通过网页 (html) 的形式展示当前的页面展示什么样的数据，页面的布局是什么样子的，点击某个菜单，打开什么页面等。

### 设计

1. UI设计
2. 数据库设计
3. 接口设计

### 编码

编写项目代码，并完成单元测试。

- 项目代码编写：作为软件开发工程师，我们需要对项目的模块功能分析后，进行编码实现。
- 单元测试：编码实现完毕后，进行单元测试，单元测试通过后再进入到下一阶段。

### 测试

在该阶段中主要由测试人员对部署在测试环境的项目进行功能测试，并出具测试报告。

### 上线运维

在项目上线之前，会由运维人员准备服务器上的软件环境安装、配置，配置完毕后，再将我们开发好的项目部署在服务器上运行。

## 苍穹外卖项目

### 简介

一个为餐饮企业（餐厅、饭店）定制的软件产品，包括**系统管理后台**和**小程序端应用**两部分。

1. **系统管理后台**（面向餐厅老板）：可以对餐厅的分类、菜品、套餐、订单、员工等进行管理维护，对餐厅的各类数据进行统计。
2. **小程序端**（面向消费者）：可以在线浏览菜品、添加购物车、下单、支付、催单等。

### 技术选型

![image-20221106185646994.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/image-20221106185646994.png)

#### 用户层    

- H5、Vue.js、ElementUI、Apache Echarts（展示图表）等技术用于系统管理后台前端页面。
- 微信小程序用于移动端应用。

#### 网关层
- **Nginx**：作为Http服务器，部署静态资源，访问性能高。还可实现反向代理和负载均衡。

#### 应用层

- **SpringBoot**：快速构建Spring项目，简化配置开发。
- **SpringMVC**：Spring框架的一个模块，可无缝集成。
- **Spring Task**：定时任务框架。
- **HttpClient**：实现HTTP请求发送。
- **Spring Cache**：数据缓存框架。
- **JWT**：用户身份验证标记。
- **阿里云OSS**：对象存储服务，主要存储文件如图片等。
- **Swagger**：自动生成接口文档并测试接口。
- **POI**：封装Excel表格操作。
- **WebSocket**：通信协议，用于来单、催单功能。

#### 数据层

- **MySQL**：关系型数据库，存储核心业务数据。
- **Redis**：内存数据库，常用作缓存。
- **Mybatis**：持久层开发。
- **PageHelper**：分页插件。
- **Spring Data Redis**：简化Java操作Redis的API。

#### 工具

- **Git**：版本控制工具。
- **Maven**：项目构建工具。
- **JUnit**：单元测试工具。
- **Postman**：接口测试工具。

## 开发环境搭建

| 序号 | 名称         | 说明                                                          |
| ---- | ------------ | ------------------------------------------------------------- |
| 1    | sky-take-out | Maven父工程，统一管理依赖版本，聚合其他子模块                 |
| 2    | sky-common   | 子模块，存放公共类，例如工具类、常量类、异常类等              |
| 3    | sky-pojo     | 子模块，存放实体类、VO、DTO等                                 |
| 4    | sky-server   | 子模块，后端服务，存放配置文件、Controller、Service、Mapper等 |

### sky-common模块包结构

| 名称        | 说明                           |
| ----------- | ------------------------------ |
| constant    | 存放相关常量类                 |
| context     | 存放上下文类                   |
| enumeration | 项目的枚举类存储               |
| exception   | 存放自定义异常类               |
| json        | 处理json转换的类               |
| properties  | 存放SpringBoot相关的配置属性类 |
| result      | 返回结果类的封装               |
| utils       | 常用工具类                     |

### sky-pojo模块包结构

| 名称   | 说明                                         |
| ------ | -------------------------------------------- |
| Entity | 实体，通常和数据库中的表对应                 |
| DTO    | 数据传输对象，通常用于程序中各层之间传递数据 |
| POJO   | 普通Java对象，只有属性和对应的getter和setter |

### sky-server模块包结构

| 名称           | 说明             |
| -------------- | ---------------- |
| controller     | 存放controller类 |
| interceptor    | 存放拦截器类     |
| mapper         | 存放mapper接口   |
| service        | 存放service类    |
| SkyApplication | 启动类           |

## Swagger

Swagger 是一个规范和完整的框架，用于生成、描述、调用和可视化 RESTful 风格的 Web 服务；knife4j 是为 Java MVC 框架集成 Swagger 生成 Api 文档的增强解决方案。

### 使用方法

1. 导入 knife4j 的maven坐标，在pom.xml中添加依赖。

```xml
<dependency>
	<groupId>com.github.xiaoymin</groupId>
	<artifactId>knife4j-spring-boot-starter</artifactId>
</dependency>
```

2. 在配置类中加入 knife4j 相关配置。

```java
/**
* WebMvcConfiguration.java
* 通过knife4j生成接口文档
* @return
*/
@Bean
public Docket docket() {
	ApiInfo apiInfo = new ApiInfoBuilder();
		.title("苍穹外卖项目接口文档")
		.version("2.0")
		.description("苍穹外卖项目接口文档")
		.build();
	Docket docket = new Docket(DocumentationType.SWAGGER_2)
		.apiInfo(apiInfo)
		.select()
		.apis(RequestHandlerSelectors.basePackage("com.sky.controller"))
		.paths(PathSelectors.any())
		.build();
	return docket;
}
```

3. 设置静态资源映射，否则接口文档页面无法访问。

```java
/**
* WebMvcConfiguration.java
* 设置静态资源映射
* @param registry
*/
protected void addResourceHandlers(ResourceHandlerRegistry registry) {
	registry.addResourceHandler("/doc.html").addResourceLocations("classpath:/META-INF/resources/");
	registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
}

```
4. 访问测试

接口文档访问路径为 http://ip:port/doc.html ---> http://localhost:8080/doc.html

接口测试:测试登录功能

思考：通过 Swagger 就可以生成接口文档，那么我们就不需要 Yapi 了？

1. Yapi 是设计阶段使用的工具，管理和维护接口
2. Swagger 在开发阶段使用的框架，帮助后端开发人员做后端的接口测试

### 常用注解

通过注解可以控制生成的接口文档，使接口文档拥有更好的可读性，常用注解如下：

| 注解                | 说明                               |
| ----------------- | -------------------------------- |
| @Api              | 用在类上，例如Controller，表示对类的说明        |
| @ApiModel         | 用在类上，例如entity、DTO、VO             |
| @ApiModelProperty | 用在属性上，描述属性信息                     |
| @ApiOperation     | 用在方法上，例如Controller的方法，说明方法的用途、作用 |

接下来，使用上述注解，生成可读性更好的接口文档。