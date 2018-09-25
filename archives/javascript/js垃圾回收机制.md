# 垃圾回收机制
[JavaScript中的垃圾回收和内存泄漏 - 掘金](https://juejin.im/post/5b4d421e5188251b200176a6)

## 引用计数
这种算法的核心原理是：判断一个对象是否要被回收就是要看是否还有引用指向它，如果是“零引用”，那么就回收。注意，这种算法存在着较为严重的缺陷——循环引用。
```
function f() {
	var o = {};
	var o2 = {};
	o.a = o2; // o 引用 o2
  o2.a = o; // o2 引用 o

	return 'halo';
}

f(); // 当函数被调用离开函数作用域后，虽然它们已经没有用了，可以被回收了，然后引用计数算法考虑到它们互相都至少一次引用，所以它们不会被回收。
```

## 标记清除
这个算法把“对象是否不再需要”简化定义为“对象是否可以获得”。

这个算法假定设置一个叫做根（root）的对象（在javascript里，根是全局对象）。垃圾回收器将定期从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象......从根开始，垃圾回收器将找到所有可以获得的对象和收集所有不能获得的对象。

### 限制
那些无法从根对象查询到的对象都将被清除

### 常见的内存泄露举例
1. 忘记声明的变量
```
function a() {
	b = 2;
	console.log('b没有被声明!');
}
```

b没被声明，会变成一个全局变量，在页面关闭之前不会被释放，使用严格模式可以避免。

2. 闭包带来的内存泄漏
```
var leaks = (function() {
	var leak = 'halo'; // 闭包中引用，不会被回收
	return function(){
		console.log(leak);	
	}
});
```

3. 移除DOM节点时候忘记移除暂存的值
```
var element = {
	image: document.getElementById('image'),
	button: document.getElementById('button')
};

document.body.removeChild(document.getElementById('image'));
// 如果element没有被回收，这里移除了image节点也是没用的，image节点依然存在内存中
```

与此类似的情景还有：DOM节点绑定了事件，但是在移除的时候没有解除事件绑定，那么仅仅移除DOM节点也是没用的

4. 定时器中的内存泄漏
```
var someResource = getData();
setInterval(function() {
	var node = document.getElementById('Node');
	if (node) {
		node.innerHTML = JSON.stringify(someResource);
	}
}, 1000);
```

如果没有清除定时器，那么someResource就不会被释放，如果刚好它又占用了较大内存，就会引发性能问题。再提一下setTimeout，它计时结束后它的回调里面引用的对象占用的内存是可以被回收的。当然有些场景，setTimeout的计时可能很长，这样的情况下也是需要纳入考虑的。

