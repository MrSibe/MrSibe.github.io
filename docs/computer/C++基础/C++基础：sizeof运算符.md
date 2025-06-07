---
title: C++基础：sizeof运算符
createTime: 2025/06/07 01:25:54
permalink: /article/2wutdlm7/
---
Sizeof 运算符用于求数据类型或者变量占用的内存空间。

```cpp
sizeof(数据类型)
sizeof(变量名)
sizeof 变量名
// 实例
std::string test = "heelldhsjklahdklsjlao";
std::string test1 = "hello";
std::cout << sizeof(int32_t) << std::endl; // 4
std::cout << sizeof(int64_t) << std::endl; // 8
std::cout << sizeof(bool) << std::endl;    // 1
std::cout << sizeof(char) << std::endl;    // 1
std::cout << sizeof(int) << std::endl;     // 4
std::cout << sizeof(test) << std::endl;    // 32
std::cout << sizeof(test1) << std::endl;   // 32
```

注意：string 不是 C++的基础类型，他是一个堆上的对象，因此对 string 使用 sizeof 没有意义，每次运算结果都是固定的。