---
title: 黑马Redis笔记
createTime: 2025/07/17 11:49:23
permalink: /article/vejwsu27/
---
## Redis 基础篇

### 数据类型与命令

#### 数据类型

Redis 是个键值数据库，一般来说 Key 是 String 类型，Value 却多种多样：

![](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250716222752.png)

前五种基本类型，后三种特殊类型。

#### Key 的层级格式

有个问题：redis 里面没有表这个概念，那么如何区分员工 id 和商品 id 呢？

`项目名:业务名:类型:id`

Key 通过 `:` 形成层级。如果 value 是个 java 对象，可以序列化成 json 格式作为 value。

#### 通用命令

> 首先，help 命令可以查看命令的使用方法

1. KEYS：查找符合模板的所有 key，不建议在生产环境使用
2. DEL：删除指定的 key，返回删除成功的数目
3. EXIST：判断 key 是否存在，存在返回 1，否则返回 0
4. EXPIRE：给 key 设置一个有效期，到期自动删除
5. TTL：查看 key 的有效期

#### String 类型命令

字符串的格式分三类：

- String：普通字符串
- Int：整数类型，可以自加自减
- Float：浮点数类型，可以自加自减

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250716225506.png)

#### Hash 类型命令

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717102503.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717103122.png)

#### List 类型与命令

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717103242.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717103313.png)

#### Set 类型与命令

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717103443.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717103530.png)

#### SortedSet 类型与命令

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717103616.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717103638.png)

### Redis 的 Java 客户端

客户端有很多种，Redis 官方推荐的三个客户端有 Jedis、lettuce、Redisson，而前两者被 Spring 给整合在 Spring Data Redis 里面了。

#### Jedis

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717104453.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717104734.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717111143.png)

#### Spring Data Redis

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717111343.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717111437.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717112018.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717112047.png)

但是 RedisTemplate 也有问题：

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717113627.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717113719.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717113922.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717113959.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717114037.png)

## Redis 实战篇

未完待续...
