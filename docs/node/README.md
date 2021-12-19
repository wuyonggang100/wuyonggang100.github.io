##### 运行时

> 程序运行的时候，提供运行时的环境。node 是 js 的运行时。

##### 编译时

> 提供编译时的环境。

#### 异步IO

因为javascript 是单线程执行，根本不能同时进行同步IO操作，所以 js 的 这一缺陷导致它只能是异步 IO 。

##### why node  ----- 2009年出现

- 高性能 
- 异步 IO
- 事件驱动
- V8 是 google 开源引擎

##### 并发处理方式

- 多进程  ---  C
- 多线程  --- java
- 异步 IO   --- js
- 协程  --- lua  go  TS

#### 与前端 js 区别

1. 核心语法不变；
2. 前端 DOM ，BOM
3. 后端 fs , http， buffer, event, os ，  global

