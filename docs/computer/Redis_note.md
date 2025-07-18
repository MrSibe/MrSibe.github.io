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

这一部分主要做黑马点评这个项目，主要特色如下：

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717142948.png)

项目安装配置不讲，直接进入项目。

### 短信登录

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717151142.png)

直接在 Controller 里面加上发送验证码、登录请求，然后取 Service 里面写代码。

主要用到了 RandomUtil 生成验证码和随机用户名。

后续每次请求需要校验登录状态，为了提高重用率，直接写一个拦截器，实现 `HandlerInterceptor` 接口，并重写 `preHandle`，`postHandle`，`afterCompletion` 三个方法。拦截的时候记得 `response` 需要 `setStatus`。

MVC 也需要配置，在 config 创建一个 `MvcConfig` 类实现 `WebMvcConfigurer`。

> 这里官方给的代码有大坑：
> 首先是 UserHolder 泛型类是之后课程才会用的 UserDTO，这里为了让代码跑起来记得改成 User！
> 其次是 MvcConfig 类记得加上 @Configuration 注解，不然没放进容器里面，拦截器不生效，用户信息也就放不进 ThreadLocal！

> 服了，这节课才把 UserHolder 改成 User，下节课就要求改回 UserDTO。
> 顺便讲一下 DTO。DTO 主要用于数据传输。前端不需要 User 类的全部信息（信息敏感），于是就创建一个 DTO 类型抓门传数据给前端。两个类的转换通过 BeanUtil 的 copyProperties 方法。

有时候需要用到多台 Tomcat 容器，每个容器之间的 session 是不共享的，会导致 session 的失效。因此我们需要找一个可以数据共享、键值存储的解决方案，所以我们采用 Redis。

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250717180155.png)

这里比较麻烦，主要是讲 session 的部分改成 `stringRedisTemplate` 操作，并且还要自己自定义转换类。

现在的拦截器有个 bug：假如登录用户一直产生不需要登陆的请求，那么过段时间用户自动就退出登录了（因为这些请求都没过拦截器，TTL 一直没刷新），所以解决方案是：再写一个新的拦截器，判断是不是登录用户，是就刷新 TTL，不是就直接放行。

### 商户查询缓存

缓存是个好东西：一方面它可以给后端减小压力，另一方面可以减小响应时间。但是同时缓存也有成本：如果数据库更新了但是缓存没更新，就会出大问题（数据一致性成本）

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718100836.png)

老师提了一个作业，写分类列表的缓存，非常简单这里不过多阐述。

刚刚讲过数据一致性问题，因此我们需要策略来更新 redis 缓存，优化我们的业务：

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718113615.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718113850.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718114056.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718114201.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718114446.png)

这几页 PPT 的思考很多，可以多理解思考过程。

写操作为了保证原子性，加上了 `@Transactional` 注解。

#### 缓存穿透

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718122231.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718122504.png)

#### 缓存雪崩

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718124422.png)

#### 缓存击穿

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718132634.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718132824.png)

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718132844.png)

之后我们就采用互斥锁来解决缓存击穿问题。我们可以通过 `setIfAbsent` 函数设置锁。

获取锁成功之后建议再一次检测一下 redis 缓存，doubleCheck

做完之后用 JMeter 做压测，大概 458.1 的吞吐量，600 QPS

接下来又通过逻辑过期实现。

#### 封装缓存工具

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718151108.png)

### 优惠卷秒杀

#### 全局唯一 id 生成器

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718154008.png)

这个 ID 生成器可以借助 Redis 的自增命令实现，同时为了确保安全性再拼接一些其他数据：

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718154601.png)

ID 生成一般有一下方法：

- UUID
- Redis 自增
- Snowflake 算法
- 数据库自增

#### 秒杀下单

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718163335.png)

#### 超卖问题

在高并发的时候会出现超卖情况，可以通过乐观锁解决。

![image.png](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250718174704.png)

这里只需要在 update 的时候再去访问一下库存，看看跟之前的是否一样，这就实现了一个乐观锁。这样避免了问题，但是这样会浪费很多请求，导致请求失败率大大增加。优化方法是访问库存只需要判断库存是否大于 0 即可

#### 一人一单

这里没办法采用乐观锁了，因为我们做的是查询操作，没办法更新值。这里只能用悲观锁。

悲观锁锁在什么位置是也是个大问题。
