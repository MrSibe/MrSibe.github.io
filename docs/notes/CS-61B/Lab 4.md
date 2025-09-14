---
title: Lab 4
createTime: 2025/05/10 17:00:25
permalink: /CS_61B/hgoeru30/
---
## 预实验

- 暂时不要从框架仓库拉取内容。从框架仓库拉取内容会导致合并冲突，你们将在实验课后续学习如何解决该问题。即便你们已经知道如何解决合并冲突，我们也希望你们以一种特定的方式解决，所以请暂时不要尝试拉取！
- 如果你们已经从框架仓库拉取了内容，请联系助教，了解如何继续进行实验。
- 本次实验要求你们在GS平台的lab1中获得满分。如果没有，请在继续实验前联系助教。
- 在本次实验中，我们将使用git。在此之前，确保你们的仓库已与GitHub同步。要做到这一点，只需运行：

```
git push origin master
```

如果该命令执行成功，你就可以继续进行实验了！如果没有成功，你很可能会收到类似这样的错误消息。请按照其中的说明来解决此错误。

## 介绍

由于本周是期中考试周，本次实验将比平常时间短。在本次实验中，你将更深入地探究git，并且通过一个有趣的练习再进行一次调试实践。在本次实验结束时，你应该对git工作流程有更深入的理解，并且你的调试技能也应该更加精湛！

## Git 的背景

在这一部分，你将观看一系列讲解Git主要概念的视频，然后进行一些使用Git的实践操作。请观看下面的全部六个视频。大家都知道伊泰说话语速较慢，所以如有需要，你可以随意提高播放速度！

- [Git Intro - Part 1](https://www.youtube.com/watch?v=yWBzCAY_5UI)
- [Git Intro - Part 2](https://www.youtube.com/watch?v=CnMpARAOhFg)
- [Git Intro - Part 3](https://www.youtube.com/watch?v=t0tzTcZESWk)
- [Git Intro - Part 4](https://www.youtube.com/watch?v=ca1oCEMQGRQ)
- [Git Intro - Part 5](https://www.youtube.com/watch?v=dZbj9gjjYv8)
- [Git Intro - Part 6](https://www.youtube.com/watch?v=r0oHi0vXhLE)

具体来说，观看视频后，你应理解以下概念： 
- 本地Git工作流程：git add和git commit
- 使用git checkout在提交之间切换并更新文件
- 分离的HEAD状态
- 远程仓库，例如托管在GitHub上的仓库
- 本地git与远程仓库的集成：`origin/master`和`skeleton/master`

如果你对上述概念有任何疑问，可以参考 [Sarah’s Git Guide](https://sp19.datastructur.es/materials/guides/using-git), [Git WTFS](https://sp19.datastructur.es/materials/guides/git-wtfs)（Git怪异技术故障场景——别想歪了！），或者随时向助教请教以厘清概念。

在此我们要提醒你：警惕你在网上找到的Git相关信息，因为并非所有信息都来自可靠来源。此外，务必在遇到困难时，绝不要照搬从网上找到或朋友那里获取的Git命令——有疑问时一定要问助教。

## Git 练习

现在，是时候实践你所学的内容了。请记住，本实验要求你在Gradescope上的 Lab 1 自动评分器中获得满分。如果你还没有完成 Lab 1 ，请咨询助教。当你准备好后，请使用以下命令拉取初始代码，但是当你遇到合并冲突时，不要惊慌！请继续阅读以获取更多信息。

```bash
git pull skeleton master
```

我们特意在你的 Lab 1 目录中引入了一个合并冲突。这个练习的目的是让你练习一些Git概念，包括合并冲突、分离头状态，以及在你的 `sp21-s***` 仓库中检出文件。在这个练习结束时，你应该能更自如地在命令行上操作提交树，使你的文件处于理想状态。

`lab1` 目录中的合并冲突出现在文件 `lab1/Collatz.java` 中，你在 Lab 1 中对该文件进行了更新，以打印从 `n = 5` 开始的 `考拉兹序列`。在你拉取 `lab4` 起始代码之前，你的解决方案能够正确打印出考拉兹序列。`skeleton` 代码库已更新，其中包含 `nextNumber(int n)` 方法的以下错误实现，该方法返回 `n` 之后考拉兹序列中的下一个数字：

```java
    /** Buggy implementation of nextNumber! */
    public static int nextNumber(int n) {
        if (n  == 128) {
            return 1;
        } else if (n == 5) {
            return 3 * n + 1;
        } else {
            return n * 2;
        }
    }
```

在我们操之过急之前，如果在完成这项作业的任何阶段遇到任何困难，请务必向助教请教；如果遇到问题，最好尽早让他们参与进来，这样他们也更容易补救。你的任务如下：

### 第一步

解决合并冲突，确保合并冲突的结果包含该方法的错误版本。换句话说，在你完成合并冲突的解决后， Collatz.java 应该能够编译，并包含 nextNumber 方法的错误实现。

现在，如果你运行 `git log`（它会按顺序列出当前提交之前的提交），你应该会看到类似以下内容：

```
commit 8f0deeaef048f33a209f6f2fe5927a6fb04cc6cc
Merge: 225d73e 7aa1b6f
Author: Neil Kulkarni <neil.kulkarni@berkeley.edu>
Date:   Sun Feb 7 14:36:52 2021 -0700

    Merge branch 'master' of https://github.com/Berkeley-CS61B/skeleton-sp21
    
    Fixed the merge conflict in lab4 to contain buggy Collatz!

commit 7aa1b6fc79cb752e1ed844cd9cdd8c9c21e7f3d4 (HEAD -> master)
Author: Neil Kulkarni <neil.kulkarni@berkeley.edu>
Date:   Sun Feb 7 14:26:58 2021 -0700

    Added Lab 4 Starter Files

...

commit 4050fd80377d85aaea6c7cdb486e581d8c422534
Author: Neil Kulkarni <neil.kulkarni@berkeley.edu>
Date:   Sat Jan 30 22:56:58 2021 -0800

    Finished Lab 1! Collatz works!
    
...
```

具体来说，你应该看到最新的提交是你解决合并冲突后产生的合并提交，倒数第二新的提交是尼尔添加你从skeleton拉取的实验4起始文件的那次提交。你可能需要往前追溯很久才能看到你完成实验1时所做的提交。例如，我完成实验1时所做的提交信息为“完成实验1！考拉兹猜想算法可用！”。你的提交信息很可能不同，并且提交哈希值、作者和日期也应该不同。记录下你完成实验1时那次提交的提交哈希值。我们将这次提交称为`lab1commit`，这样在后续步骤中我们就能引用它。

### 步骤二

将其提交到Gradescope上的“Lab 4A: Git Exercise Part A”自动评分器。它将验证你是否正确解决了合并冲突，使`nextNumber`的错误实现包含在 `Collatz.java` 中。

### 步骤三

虽然你最近的一次提交在`lab1/Collatz.java`中引入了一个错误，但幸运的是，你曾有一次提交了`Collatz`的正确实现，确切地说是在`lab1commit`中！由于Git中的提交是文件状态的快照，`lab1commit`存储了`Collatz`正确版本的快照。不信我？咱们来看看！

你的下一步是切换到 `lab1commit`。如果你不记得这个命令的语法，可以查看上面链接的材料。到达那里后，输入 `git status`。你应该会看到你处于分离头状态。如果你不记得那是什么意思，请查看上面的材料！

```
NeilKulkarni@Neils-MacBook-Pro sp21-s58 % git status
HEAD detached at 4050fd8
nothing to commit, working tree clean
```

记住，在分离头状态下，你可以随意查看当前提交，但不应进行任何更改。让我们看看 `lab1/Collatz.java`。你应该会看到它包含你之前的解决方案！你可以用任何你喜欢的方式打开这个文件，但我推荐使用cat终端命令，它会打印文件的内容：

```java
/** Class that prints the Collatz sequence starting from a given number.
 *  @author Neil Kulkarni
 */
public class Collatz {
    public static int nextNumber(int n) {
        return n % 2 == 0 ? n/2 : 3*n + 1;
    }

    public static void main(String[] args) {
        int n = 5;
        System.out.print(n + " ");
        while (n != 1) {
            n = nextNumber(n);
            System.out.print(n + " ");
        }
    }
}
```

### 步骤四

现在，通过检切换到最新的提交来脱离分离头状态。你应该验证，由于我们回到了最新的提交，`lab1/Collatz.java` 又出现了错误的实现：

```java
/** Class that prints the Collatz sequence starting from a given number.
 *  @author YOUR NAME HERE
 */
public class Collatz {

    /** Buggy implementation of nextNumber! */
    public static int nextNumber(int n) {
        if (n  == 128) {
            return 1;
        } else if (n == 5) {
            return 3 * n + 1;
        } else {
            return n * 2;
        }
    }

    public static void main(String[] args) {
        int n = 5;
        System.out.print(n + " ");
        while (n != 1) {
            n = nextNumber(n);
            System.out.print(n + " ");
        }
        System.out.println();
    }
}
```

### 步骤五

我们已经验证 `lab1commit` 中 `Collatz.java` 的内容正确无误，并且我们回到了包含 `Collatz.java` 错误实现的最新提交。现在，让我们使用 `git checkout` 将 `lab1/Collatz.java` 恢复到 `lab1commit` 中的状态。如果你忘记了如何切换文件，请回顾实验开始时的材料！ 

当你切换一个文件时，git 会自动添加该文件。检出后，`git status` 应返回类似如下内容：

```bash
NeilKulkarni@Neils-MacBook-Pro sp21-s58 % git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   lab1/Collatz.java
```

继续，再 `cat lab1/Collatz.java` 一次。你应该会看到解决方案现在已更新！继续提交并推送你的更改。

### 步骤六

提交到实验4B：Git练习B部分的自动评分器，以获得完成此作业的学分。

一些临别赠言：我们所做的非常强大。我们利用了git存储文件快照这一特性，并利用它恢复到旧版本！而且，在此过程中，我们学会了如何解决合并冲突！

这些信息并非仅仅停留在理论层面。当你着手项目时，就会发现它具有实际用途。正如胡格教授常说的，在项目上从头开始是可行的（并且值得鼓励！）。现在，我们有办法做到这一点了！你可以使用 `git checkout` 命令，将项目文件恢复到你未对其进行任何更改之前的较早提交版本。具体来说，如果你想从头开始恢复一个项目文件（例如 proj 0中的Model.java文件），可以运行以下命令：

```bash
git checkout master -- proj0/game2048/Model.java
```


一般来说，`git checkout master -- <file>` 会将文件恢复到最近一次提交时的状态。现在你知道了如何重启一个项目，或者如果你对重启不满意，如何将已重启的项目恢复到 master 分支上的状态！

## 一个调试谜题

另一个需要学习的重要技能是如何进行详尽的调试。如果调试得当，即使你在调试不完全理解的代码时，调试也应能让你迅速缩小程序缺陷可能存在的范围。考虑以下场景：

你们公司，Flik 公司，发布了一个很棒的软件库，名为Flik.java，它能够判断两个整数是否相同。你收到一封来自名为“Horrible Steve”的人的邮件，他描述了使用你们库时遇到的一个问题：

```
亲爱的弗利克企业，

你们的库非常糟糕。请看附件中的代码。它应该输出500，但实际上输出的是128。

（附件：HorribleSteve.java）”
```

使用以下任意技术组合，找出错误是出在“糟糕史蒂夫”的代码中，还是在弗利克企业的库中： 
- 为 Flik库编写JUnit测试。如果你想尝试这个方法，你需要在 `flik` 目录中创建一个新文件，并导入junit。参考之前问题中的测试，了解如何操作。
- 使用IntelliJ调试器，特别是**条件断点**或**异常中断**，你在 Lab 3 中学过如何操作！
- 使用打印语句。
- 重构“糟糕史蒂夫”的代码。重构意味着在不改变功能的情况下改变语法。这可能很难做到，因为“糟糕史蒂夫”的代码使用了很多奇怪的东西。

一旦你找到程序缺陷，修复它并将你的代码提交到`Lab 4: Debugging autograder`。这部分的自动评分器使用隐藏测试，所以你无法从自动评分器（AG）获得关于该程序缺陷的任何信息。如果你认为已修复程序缺陷，但未通过自动评分器，请咨询助教。 

提示：JUnit提供了方法`assertTrue(boolean)`和`assertTrue(String,boolean)`，你可能会发现它们很有用。
