---
title: Lab 6
createTime: 2025/05/22 20:42:33
permalink: /CS_61B/vlxrdchg/
---
## Java 文件与目录操作

可以在 Java 程序中通过使用 `System.getProperty("user.dir")` 访问当前工作目录。

可以使用 Java 中的 File 构造函数，并传入文件的路径来创建一个 File 对象：

```java
File f = new File("dummy.txt");
```

将来，当我使用 `f` 进行操作时，我想对这些操作在 `dummy.txt` 上执行”。要实际创建这个 `dummy.txt` 文件，我们可以调用：

```java
f.createNewFile();
```


你可以用 File 类的 `exists` 方法检查文件 “dummy.txt” 是否已经存在。

```java
f.exists()
```

在 Java 中，目录也用 File 对象表示。例如，您可以创建一个表示目录的 File 对象：

```java
File d = new File("dummy");
```

与文件类似，这个目录可能实际上并不存在于您的文件系统中。要在您的文件系统中实际创建该文件夹，您可以运行：

```java
d.mkdir();
```

## Java 序列化

幸运的是，我们有一个名为序列化的替代方案，Java 已经为我们实现了它。序列化是将对象转换为一系列字节的过程，这些字节可以存储在文件中。然后我们可以反序列化这些字节，并在程序的未来调用中恢复原始对象。

要为 Java 中的给定类启用此功能，这只需实现 `java.io.Serializable` 接口：

```java
import java.io.Serializable;

public class Model implements Serializable {
    ...
}
```

这个接口没有方法；它只是为其子类型做标记，以便某些特殊的 Java 类在对象上执行 I/O。例如，

```java
Model m = ....;
File outFile = new File(saveFileName);
try {
    ObjectOutputStream out =
        new ObjectOutputStream(new FileOutputStream(outFile));
    out.writeObject(m);
    out.close();
} catch (IOException excp) {
    ...
}
```

将 `m` 转换为字节流，并将其存储在名为 `saveFileName` 的文件中。然后可以使用如下代码序列重建该对象：

```java
Model m;
File inFile = new File(saveFileName);
try {
    ObjectInputStream inp =
        new ObjectInputStream(new FileInputStream(inFile));
    m = (Model) inp.readObject();
    inp.close();
} catch (IOException | ClassNotFoundException excp) {
    ...
    m = null;
}
```

Java 运行时负责处理确定哪些字段需要转换为字节以及如何转换的工作。您将频繁地序列化对象，为了减少您需要编写的代码量，我们在 `Utils.java` 中提供了处理对象读写辅助函数。

## 难点

这次实验主要的难点是配置环境：

1. Make 环境的配置。61B 给出的方法是采用 Git 自带的类 Linux 环境，然后加入 make 程序。