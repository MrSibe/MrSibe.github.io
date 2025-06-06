---
title: C++基础：数据类型的别名
createTime: 2025/06/07 01:25:54
permalink: /article/lvr4zgon/
---
创建数据类型别名有两个目的：

- 为名称复杂的类型创建别名，方便记忆书写。
- 创建与平台无关的数据类型，提高兼容性。

```cpp
typeof 数据类型名 别名;

// 以下代码可以保证VS和Linux的兼容性
// VS:
typedef short     int16_t;
typedef int       int32_t;
typedef long long int64_t;
// Linux:
typedef short int16_t;
typedef int   int32_t;
typedef long  int64_t;
// 然后在程序中使用别名就可以了
// 这个操作在开源项目经常出现
```