# [html清除页面缓存](https://www.cnblogs.com/dxzg/p/9685009.html)

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<meta http-equiv="X-UA-Compatible" content="edge">

<meta http-equiv="Cache-control" content="no-cache">
<meta http-equiv="Cache" content="no-cache">
```

no-cache 强制缓存从服务器上获取新的页面
 no-store 在任何环境下缓存不保存任何页面

http-equiv 属性为名称/值对提供了名称。并指示服务器在发送实际的文档之前先在要传送给浏览器的 MIME 文档头部包含名称/值对。

当服务器向浏览器发送文档时，会先发送许多名称/值对。虽然有些服务器会发送许多这种名称/值对，但是所有服务器都至少要发送一个：`content-type:text/html`。这将告诉浏览器准备接受一个 HTML 文档。

使用带有 http-equiv 属性的 `` 标签时，服务器将把名称/值对添加到发送给浏览器的内容头部。例如，添加：

```
<meta http-equiv="charset" content="iso-8859-1">
<meta http-equiv="expires" content="31 Dec 2008">
```

这样发送到浏览器的头部就应该包含：

```
content-type: text/html
charset:iso-8859-1
expires:31 Dec 2008
```

#### Cache-Control头域

Cache-Control指定请求和响应遵循的缓存机制。在请求消息或响应消息中设置Cache-Control并不会修改另一个消息处理过程中的缓存处理过程。请求时的缓存指令包括no-cache、no-store、max-age、max-stale、min-fresh、only-if-cached，响应消息中的指令包括public、private、no-cache、no-store、no-transform、must-revalidate、proxy-revalidate、max-age。各个消息中的指令含义如下
Public指示响应可被任何缓存区缓存
Private指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效
no-cache指示请求或响应消息不能缓存
no-store用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。
max-age指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应
min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应
max-stale指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。

<meta http-equiv="pragma" content="no-cache">,pragma与no-cache用于定义页面缓存,不缓存页面(为了提高速度一些浏览器会缓存浏览者浏览过的页面,通过下面的定义,浏览器一般不会缓存页面,而且浏览器无法脱机浏览.)

<meta http-equiv="cache-control" content="no-cache">,常见的取值有private、no-cache、max-age、must-revalidate等，默认为private,其作用根据不同的重新浏览方式分为以下几种情况：

1） 打开新窗口 值为private、no-cache、must-revalidate，那么打开新窗口访问时都会重新访问服务器。 而如果指定了max-age值，那么在此值内的时间里就不会重新访问服务器，例如： Cache-control: max-age=5(表示当访问此网页后的5秒内再次访问不会去服务器)

2） 在地址栏回车 值为private或must-revalidate则只有第一次访问时会访问服务器，以后就不再访问。 值为no-cache，那么每次都会访问。 值为max-age，则在过期之前不会重复访问。

3） 按后退按扭 值为private、must-revalidate、max-age，则不会重访问， 值为no-cache，则每次都重复访问

4） 按刷新按扭 无论为何值，都会重复访问 Cache-control值为“no-cache”时，访问此页面不会在Internet临时文件夹留下页面备份。

<meta http-equiv="expires" content="0"> ,指定Expires值为一个早已过去的时间，那么访问此网时若重复在地址栏按回车，那么每次都会重复访问： Expires: Fri, 31 Dec 1999 16:00:00 GMT 比如：禁止页面在IE中缓存 http响应消息头部设置： CacheControl = no-cache Pragma=no-cache Expires = -1 Expires是个好东东，如果服务器上的网页经常变化，就把它设置为0，表示立即过期。

