# 原型与原型链

先来看一个栗子🌰
```
typeof fn(){} //function
typeof {} //object
typeof [] //object
```
为什么？因为数组是对象的一个子集，而函数与对象之间不仅仅是包含和被包含的关系。

还有一个栗子🌰
```
var obj = {a:10} 
<=> 
var obj = new Object();obj.a = 10;
typeof (Object); //function 
```
我们发现，对象都是通过函数创建的

### 这个时候概念出来了🌟🌟🌟
1. *Prototype*。每一个 *函数* 都有一个prototype属性，prototype是函数才会有的属性。函数的prototype属性指向了一个对象，这
个对象正是调用该构造函数而创建的实例的原型。
2. *_proto_*。这是每一个 *Javascript对象* (除了null，函数也是对象)都具有的一个属性，叫_proto_，这个属性会指向创建这个对象的函数的原型。

```
function Fn(){}
var fn = new Fn();
``` 
这个时候，⚠️注意了，fn._proto_ = Fn.prototype

3. 自定义函数的prototype本质上就是和var obj={}是一样的，都是被Object创建，所以它的_proto_指向的就是Object.prototype。






