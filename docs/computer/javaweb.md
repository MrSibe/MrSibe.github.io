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

未完待续...