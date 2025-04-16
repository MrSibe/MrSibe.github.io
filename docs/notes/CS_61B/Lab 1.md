---
title: Lab 1
createTime: 2025/04/16 13:48:51
permalink: /CS_61B/5pcv1x22/
---
这里省略掉 Lab 1 Setup 的配置环境部分，直接开始 Lab 1。

## Git 使用

- 任务目标：pull 下来 CS 61B 官方的代码，把这个代码 push 到自己新建的 GitHub 仓库。
- 任务难点：git 指令的学习。

```bash
// 在GitHub上面创建好自己的仓库后，导入到本地
$ git clone https://github.com/MrSibe/CS-61B_sp21.git
$ cd CS-61B_sp21

// 这里从 CS 61B 的远程仓库把代码拉下来。
$ git remote add skeleton https://github.com/Berkeley-CS61B/skeleton-sp21.git
$ git pull skeleton master

// 代码写好打算上传之后：
// 查看仓库代码更改情况
$ git status
// 把修改的文件加入暂存区
$ git add lab1/*
// 给本次提交写comment，并且把暂存区的修复提交到本地仓库
$ git commit -m "done with Collatz"
// 把本地仓库的修改提交到自己的远程仓库
$ git push origin master
```
