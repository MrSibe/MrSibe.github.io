---
title: C++基础：初始化赋值
createTime: 2025/06/07 01:25:54
permalink: /article/8g40txpw/
---
## 把值写在小括号中

```cpp
int a = (15);
int b(20);
```

## 把值写在花括号中 (c++11)

```cpp
int a = {15};
int b{20};
```

注意：Linux 系统中需要加上 flag：`-std=c++11`