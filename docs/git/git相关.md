### 将本地已有的仓库关联到远程的空仓库

```sh
# 关联
git remote add origin 远程仓库地址  # origin 是此次自定义的远程仓库的名称，可以是 xxx
# 推送，第一次推送带上 -u 会推送并关联
git push -u origin master  # 把本地 master 分支推送到远程 origin 分支
```



#### 当远程某些分支已经删除，而本地还保留时

- 列出本地所有分支以及它们的追踪状态，可以显示远程的哪些分支已经被删除。

  ```
  git remote show origin   
  ```

- 删除本地较远程残留的多余的分支，与远程保持一致

  ```
  git remote prune origin  // 删除残留分支
  git branch -D xxx   // 删除本地现有比远程多的分支 xxx
  git branch -a  // 查看本地现有分支
  ```

#### 先本地删除某分支，然后对远程删除同一分支

```
git branch -d xxx  // 删除本地 xxx 分支
git push origin -d xxx // 删除远程 xxx 分支
```

##### 撤销commit ，回到add 后的状态

> 只是撤回到 commit 前的状态，代码不会丢失。

```
git reset --soft HEAD^  
// HEAD^的意思是上一个版本，也可以写成HEAD~1
// 如果进行了2次commit，想把这两次都撤回，可以使用HEAD~2
```

> --mixed 
> 意思是：代码不丢失，回到add 前状态；
> 这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。
>
> --soft 
> 代码不丢失，回到 add 后状态
>
> --hard
> 代码丢失，回到上一次commit 后的状态



### 本地分支封版

> 需要从此分支上新建一个分支用来开发，并推送到远程

```
// 从本地当前分支xxx上新建并切换到该分支进行开发：
git checout -b newBranch 
// 将新建分支推送到远程：
git push origin newBranch
// 删除本地原来开发的分支(不能删除远程分支xxx)
git branch -D xxx
```

####  设置git 缓存值大小

> 有时 git  clone  因为代码量过大最后会 clone 失败，此时需要加大git 缓存空间大小。默认为 65520
>
> 如下表示设置为5G

```
git config --global http.postBuffer 5242880000

git config --global https.postBuffer 5242880000

git config --list 查看设置值
```



### Git报错：Another git process seems to be running in thisrepository

> 翻译：另一个git进程似乎正在这个存储库中运行，例如 由“git commit”打开的编辑器。请确保所有流程终止，然后重试。如果它仍然失败，一个git进程可能已在此存储库中崩溃：手动删除文件以继续。

解决方法有两种：

1. 找到.git/index.lock文件，直接删除即可；
   如果在linux上的话，执行rm删除命令：

```javascript
rm -f .git/index.lock
```

2. 执行 git 命令

```javascript
git clean -f .git/index.lock
```



<<<<<<< Updated upstream
## git rebase

- 代码合并有两种方式：合并 (merge) 和衍合 (rebase) , 衍变又称变基。 变基可以让代码的提交历史更简洁清晰，不杂乱。实际的开发工作是并行的，但它们看上去就像是串行的一样，提交历史是一条直线没有分叉。

- 合并的核心在于差异比较，将有差异的部分合到一起；对于两个不同分支的合并，git 官方解释是：它是把两个分支的最新快照以及二者最近的共同祖先进行三方合并，合并的结果是生成一个新的快照（并提交）。

- 衍合/变基：思路在于将多次提交都变化为在一条分支上依次进行，最后只得到一条变化线。

- 例子：想要把某分支 experiment 改动的代码合到 master 分支上， 而这两个分支目前都有各自的改动；

  图1 

  ![image-20210628094538249](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210628094538249.png)

  图2 

  ![image-20210628094609483](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210628094609483.png)

  图3 

  ![image-20210628094628510](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210628094628510.png)

```shell
1. 将 experiment 变基到 master
git checkout experiment
git rebase master
2. 回到 master， 将其他分支的代码进行快进合并
git checkout master
git merge experiment 
```

- 原理

  > 首先找到这两个分支（即当前分支 experiment、衍合操作的目标分支 master）的最近共同祖先 C2，然后对比当前分支相对于该祖先的历次提交，提取相应的修改并存为临时文件，然后将当前分支指向目标基底 C3, 最后以此将之前另存为临时文件的修改依序应用。注意，也就是说这个过程中，如图experiment会先抛弃之前的C4提交，然后把C4变动的代码作为新的C4’重新再提交一次。

- 避免雷区

  > 在上面的衍合过程中，给 master 起个名字叫被动分支，experiment 叫主动分支。
  >
  > **注意： 不要将公共分支作为“主动分支”使用衍合，最好是将自己单独的分支作为主动分支。**

- 使用场景：

  1. 当别人也有提交，自己 push 的时候会将别人的已经 push 的代码merge 后再来 push 一次，此时提交历史就会杂乱重复，需要用到 rebase 。解决方式如下

     ```shell
     拉取代码的时候需要
     git pull --rebase
     git pull --rebase origin dev    # 从dev分支进行 rebase 拉取
     ```

     在 sourcetree 中， 勾选衍合，英文是 rebase 。

     ![image-20210628101206018](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210628101206018.png)

  2. 让提交历史清晰简洁。解决方式如上所述。

- 设置自动进行衍合。等同于上面的勾选衍合。

  ```shell
  git config --global pull.rebase "true"
  ```

  



## git flow




















=======


## 主分支上修改的内容同步到子分支，非 merge
>>>>>>> Stashed changes







































