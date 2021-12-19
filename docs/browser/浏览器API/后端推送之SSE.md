## SSE

> - SSE 是单向通道，只能服务器向浏览器发送
>
> - SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
> - SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
> - SSE 默认支持断线重连，WebSocket 需要自己实现。
> - SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
> - SSE 支持自定义发送的消息类型。

### 浏览器兼容性

> 来自 can i use

![image-20210120093519266](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210120093519266.png)



## 客户端

在 IE 和 Edge 中没有兼容，需要使用 evensource.js 库；

- 判断浏览器是否支持

```javascript
if ('EventSource' in window) {
  // ...
}
```

- 创建实例

```javascript
// url可以与当前网址同域，也可以跨域。跨域时，可以指定第二个参数，打开withCredentials属性，表示是否一起发送 Cookie
// options 是可选参数withCredentials，默认为 false，指示 CORS 是否应包含凭据( credentials )。
let source = new EventSource(url, {withCredentials: true} );
```

- 三种状态

  > EventSource`实例的`readyState`属性，表明连接的当前状态。该属性只读，可以取以下值。

  - 0：相当于常量`EventSource.CONNECTING`，表示连接还未建立，或者断线正在重连。
  - 1：相当于常量`EventSource.OPEN`，表示连接已经建立，可以接受数据。
  - 2：相当于常量`EventSource.CLOSED`，表示连接已断，且不会重连。

- API 用法，也可以使用  addEventListener 写法

  ```javascript
  // 建立连接成功
  source.onopen = function (event) {...};
  //收到后端发来的消息
  source.onmessage = function (ev) {
    var data = ev.data;
  };
                                    
  // 通信错误如中断连接等
  source.onerror = function (event) {...};
                                     
  // 浏览器端主动关闭连接
  source.close();
                                     
  // 自定义事件
  source.addEventListener('foo', function (event) {
    var data = event.data;
  }, false);
  ```

  

## 服务端实现（node）

- 数据格式，必须是UTF-8 编码的文本，具有如下的 HTTP 头信息

  ```
  Content-Type: text/event-stream
  Cache-Control: no-cache
  Connection: keep-alive
  ```

- 每个 message 可以包含以下四个属性， 不必同时全部包含, 不同 message 之间使用 \n\n 隔开；

  ```javascript
  data : value\n\n   数据内容
  event : value\n\n  自定义的事件类型，默认是message事件
  id : value\n\n     数据标识符
  retry : value\n\n  指定浏览器重新发起连接的时间间隔。
  ```

- 服务端实例

  ```javascript
  var http = require("http");
  
  http.createServer(function (req, res) {
    var fileName = "." + req.url;
  
    if (fileName === "./stream") {
      res.writeHead(200, {
        "Content-Type":"text/event-stream",
        "Cache-Control":"no-cache",
        "Connection":"keep-alive",
        "Access-Control-Allow-Origin": '*',
      });
      res.write("retry: 10000\n");
      res.write("event: connecttime\n");
      res.write("data: " + (new Date()) + "\n\n");
      res.write("data: " + (new Date()) + "\n\n");
  
      interval = setInterval(function () {
        res.write("data: " + (new Date()) + "\n\n");
      }, 1000);
  
      req.connection.addListener("close", function () {
        clearInterval(interval);
      }, false);
    }
  }).listen(8844, "127.0.0.1");
  ```

  

