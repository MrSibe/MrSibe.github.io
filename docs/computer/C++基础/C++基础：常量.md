---
title: C++基础：常量
createTime: 2025/06/07 01:25:54
permalink: /article/zh0ray9y/
---
常量的是不变的数据，如果中途修改会报错。

常量的声明有两种：
- 宏常量。
- Const 修饰的常量。

## 宏常量

一般在 main 函数的上面声明，常量名大写。

```cpp
#define 常量名 值
```

## const 常量

在程序任何地方都可以声明。

```cpp
const 数据类型 常量名 = 值;
```

