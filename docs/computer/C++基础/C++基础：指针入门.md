一个最简单的场景是交换函数：

```cpp
#include <iostream>

void swap(int x, int y)
{
	int tmp = x;
	x = y;
	y = tmp;
}

int main()
{
	int a = 10;
	int b = 211;
	std::cout << "Before swap:" << std::endl;
	std::cout << "a = " << a << "; b = " << b << std::endl;
	swap(a, b); 
	std::cout << "After swap:" << std::endl;
	std::cout << "a = " << a << "; b = " << b << std::endl;
	return 0;
}
/*
Before swap:
a = 10; b = 211
After swap:
a = 10; b = 211
*/
```

由于 C++这里是按值传递，所以交换无效。

解决方法之一是使用指针。**指针是一种存储地址的变量**。

指针是复合数据类型：基于其他类型定义的数据类型（整型指针，字符型指针...）。

```cpp
int a;
// 声明指针变量，就在类型跟一个星号，代表是指针
// 通过 & 获取变量的地址
// *号还是间接值运算符，或者说解引用运算符，用于得到或操作该地址空间存储的值。
int* p = &a;
std::cout << "a=" << *p << std::endl; // a=10
// cout可能会把地址当作字符处理
// 解决方法1：强制转换成void*
std::cout << "变量a地址: " << (void*)&a << std::endl;
// 解决方法2：强制转换成int*
std::cout << "变量a地址: " << (int*)&a << std::endl;
```

在 64 位系统中，C++指针类型占用内存是 8 字节。

用指针修改后的 swap 程序：

```cpp
void swap(int* x, int* y)
{
	int tmp = *x;
	*x = *y;
	*y = tmp;
}
/*
Before swap:
a = 10; b = 211
After swap:
a = 211; b = 10
*/
```

