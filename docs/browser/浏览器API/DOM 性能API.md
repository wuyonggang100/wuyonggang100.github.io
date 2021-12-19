#### Resize Observer API

> 可以监视元素的大小更改，并且每次大小更改时都会向观察者传递通知。
>
> - 第一步：创建实例；
> - 第二步：用实例来观察 dom

```javascript
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    if(entry.contentBoxSize) {
        // entry.target 就是目标元素，可以直接对其操作
    } else {
      // ... entry.target
    }
  }
});

resizeObserver.observe(document.querySelector('div'));
```



#### Performance API

> 准确计时，精确度可以到 千分之一毫秒；

```javascript
let t0 = window.performance.now();
doSomething();
let t1 = window.performance.now();
console.log("doSomething函数执行了" + (t1 - t0) + "毫秒.")
```



#### requestAnimationFrame

> 让另起自动执行动画类型操作，并达到流畅性能。比 setInteval 效率高。

```javascript
function step() {
  // dosomething
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
```



#### requestIdleCallback

> window.requestIdleCallback()会在浏览器空闲时期依次调用函数，这就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互这些延迟触发但关键的事件产生影响。函数一般会按先进先调用的顺序执行，除非函数在浏览器调用它之前就到了它的超时时间。