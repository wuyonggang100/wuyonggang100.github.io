## ssh 公钥的使用



1. ##### 配置基本信息

   > 在桌面上打开 git bash 命令工具，配置全局 ssh 信息，如果在 项目下打开 ssh 即是配置 项目的 ssh ；

```sh
git config --global user.name "wuyonggang100"

git config --global user.email "408727759@qq.com"
注：查下是否配置成功，用命令
git config --global --list
```

2. ##### 用邮箱地址生成 SSH 公钥

   默认存放地址为 c 盘下：   /c/Users/用户名/.ssh/id_rsa.pub

```sh
ssh-keygen -t rsa -C  "408727759@qq.com" 
注：执行上面命令后，连续回车3次
```

3. ##### 查看公钥

   > 得到结果如下图 ( 包含 ssh-rsa ) ，将其完整复制出来 ;
   >
   > ![1614255793769](C:\Users\gang\AppData\Roaming\Typora\typora-user-images\1614255793769.png)

   ```sh
   cd ~/.ssh  # 进入 ssh
   cat id_rsa.pub # 打印 ssh
   ```

4. ##### 添加公钥到线上

   > 以 github 为例，

   - 点击右上角头像 ---> ```Settings``` --->  选择左侧的  ```SSH and GPG keys ```  --->  ``` new SSH keys```， 添加即可。
   
5. ##### 使用 ssh  clone 代码时可能会报错时的处理

   > 报错 No supported authentication methods available (server sent: publickey)

   - 报错原因是TortoiseGit的配置问题，需要设置下TortoiseGit的SSH配置。按照如下修改乌龟ui 中 setting 的  network 即可，需要找到 git 安装目录里的 usr/bin/ssh.exe 。

     ![image-20211017011605668](E:\笔记\note\image-20211017011605668.png)

   - 此时再用 ssh 地址 clone 需要输入账号和密码，后续拉取和提交就不需要了。



git@github.com:wuyonggang100/note.git





##### 在 sourcetree 中使用 ssh ，需要配置：

工具 --> 选项 ---> 一般 --> ssh客户端配置 ---> ssh 客户端 ---> 选择  openSsh 的方式即可。其中 ssh 密钥选择 id_rsa 文件， id_rsa.pub 是公钥， 在 github 中存的就是公钥。

