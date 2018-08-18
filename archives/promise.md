# Promise
https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000

[Promise原理讲解 && 实现一个Promise对象 (遵循Promise/A+规范) - 掘金](https://juejin.im/post/5aa7868b6fb9a028dd4de672#heading-9)

## 什么是Promise？
> 在Javascript的世界中，所有的代码都是单线程执行的。由于这个“缺陷”，导致Javascript的所有网络操作、浏览器事件都必须是异步执行的。异步执行可以用回调函数实现的。
* 把回调函数success(fn) 写到一个AJAX操作里面很正常，但是不好看，不利于代码复用，因此才有了链式写法例如：
```
var ajax = ajaxGet('http://...');
ajax.ifSuccess(success)
	  .ifFail(fail);
```

* 所以一个Promise就是一个代表了异步操作最终完成或者失败的对象。

### 语法
```
var p1 = new Promise(function(resolve, reject) {
	... /* executor */
});
var p2 = p1.then(fn)
var p3 = p2.catch(fn);

变量p1是一个promise对象，它负责
```

### 三个状态
* pending 初始状态，既不是成功，也不是失败状态。
* fulfilled。resolve函数被调用时，promise的状态改为fulfilled（完成）
* rejected。reject函数被调用时，promise的状态改为rejected（失败）

### 两个过程
* pending -> fulfilled
* pending -> rejected
[image:E0A15E15-FD8A-46F8-8655-165DDE1C0FFC-31658-000085F04B9772B8/8DDCFAEB-4FA6-4B18-A80E-AB5488304E75.png]


### 方法
* Promise.all（）
* Promise.race（）
* Promise.resolve 返回一个fulfilled状态的promise对象
```
Promise.resolve('hello').then(function(value){
	console.log(value);
})

Promise.resolve('hello');
// 相当于
const promise = new Promise(resolve => {
	resolve('hello');
});
```
* Promise.reject 返回一个rejected状态的promise对象