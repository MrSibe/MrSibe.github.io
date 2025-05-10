---
title: Lab 2
createTime: 2025/05/10 17:00:25
permalink: /CS_61B/ikwn4wk2/
---
## Lab 2 介绍

在这个实验中，你将学习如何在 IntelliJ 中使用调试器以及如何在 IntelliJ 中使用 JUnit 测试。

对于所有未来的作业，我们将导入一个名为 `pom.xml` 的文件，而不是像在 Lab 1 和 Proj 0 中那样导入整个文件夹。原因是 `pom.xml` 文件告诉 IntelliJ 在哪里找到 61 B 的库。也可以手动指定库的位置，但这个过程有点麻烦。

## Debugger Basics

很多时候某些程序员会通过 print 函数来调试程序，很麻烦。因此我们需要学习科学的 debug 技巧。

- **Breakpoints** 是断点，debugger 执行到此就会暂停。

- **Step Into** 是**单步执行**，或者说**步入**，其实就是执行下一条代码，在 IntelliJ 里面的快捷键是 F7。

- **Step Over** 是指**单步跳过**，简称**步过**，允许我们完成函数调用而不显示函数执行，快捷键是 F8。

- **Step Out** 是指**单步退出**，简称**步出**，可以让我们从函数中跳出来，回到函数调用语句，快捷键是 Shift+F8.

## JUnit and Unit Testing

接下来将利用 JUnit 进行**单元测试**。这是一种分治思想，把大的程序分成小的模块，对每一个模块进行测试，每个模块没问题，整个程序基本上就没啥问题。

写 JUnit 测试之前，首先导入以下包：

```java
import static org.junit.Assert.*;  
import org.junit.Test;
```

然后按照以下格式写测试函数：

```java
@Test
public void testMethod() {
    assertEquals(<expected>, <actual>);
}
```

`@Test` 是注解，告诉编译器下面这段函数是 JUnit 测试函数。`assertEquals` 是JUnit测试中常用的方法。它测试变量的实际值是否与预期值相等。

所有测试必须是非静态的。这可能看起来很奇怪，因为你的测试不使用实例变量，并且你可能不会实例化这个类。然而，这是JUnit的设计者决定测试应该如何编写的方式，所以我们就这样做吧。

## 核心任务

这个 Lab 的任务主要是 Debug IntList。

我们创建了一个文件 `IntListExercises.java`，其中包含三个方法，每个方法都有错误。你在这一部分的任务是找到并修复这些错误！为了帮助你，我们添加了一些有用的起始代码和测试框架，下面我们将进行解释。

### 函数介绍

相对于课上的代码，增添了 `of` 方法和 `toString` 方法。

```java
IntList lst = IntList.of(1, 2, 3);
System.out.println(lst.toString())

// Output: 1 -> 2 -> 3
```

### Part A: IntList Iteration

`addConstant`这个方法旨在接收一个`IntList`，并对列表中的每个元素进行可变的常量加法。

```java
/* Expected Behavior */

IntList lst = IntList.of(1, 2, 3);

addConstant(lst, 1);
System.out.println(lst.toString());
// Output: 2 -> 3 -> 4

addConstant(lst, 4);
System.out.println(lst.toString());
// Output: 6 -> 7 -> 8
```

仓库提供的 `addConstant` 有问题，需要修改。

### Part B: Nested Helper Methods and Refactoring for Debugging

在这一部分中，我们将调试 `IntListExercises.java` 中的 `setToZeroIfMaxFEL` 方法。

此方法执行一个非常奇怪的任务。具体来说，如果（且仅当）从某个节点开始的 `IntList` 中的最大值的首位和末位数字相同，它会将 `IntList` 中该节点处的值替换为 0。

### Part C: Tricky IntLists!

在这一部分中，我们将调试 `squarePrimes` 方法，该方法位于 `IntListExercises.java` 文件中。

这个方法旨在接收一个`IntList`，将其中的所有素数元素平方，并保持合数（非素数）元素不变。如果至少有一个元素被平方了，它将返回`true`，否则返回`false`。

