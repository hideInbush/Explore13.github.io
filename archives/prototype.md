# 概览
参考：
* 你不知道的javascript（上卷）
* https://github.com/mqyqingfeng/Blog/issues/2
* [深入理解javascript原型和闭包（4）——隐式原型 - 王福朋 - 博客园](http://www.cnblogs.com/wangfupeng1988/p/3979290.html)
* [JavaScript中的“多继承”](https://zhuanlan.zhihu.com/p/34693209)
#面试/模块/从原型到原型链#

## Prototype
- - - -
每个 ~*函数*~ 都有一个prototype属性，prototype是函数才会有的属性。函数的prototype属性指向了一个对象（属性的集合），这个对象正是调用该构造函数而创建的实例的原型 🌟，同时这个对象默认的只有一个叫做constructor的属性，指向这个函数的本身
如下图，Object就是一个函数，右侧就是它的原型，下面就是它的几个其他属性（是不是很有种似曾相识的感觉）
![](https://github.com/hideInbush/Explore13.github.io/blob/master/assets/image/prototype/1.png)

你也可以在自己自定义的方法的prototype中新增自己的属性
```
function Fn() {
	Fn.prototype.name = 'halo';
	Fn.prototype.getName = function() {
		return 'hahaha';
	}
}
var fn = new Fn();
console.log(fn.name); //halo
console.log(fn.getName); //hahaha

再举个例子
var $div = $('#div'); 
//返回的是一个jQuery对象，$('#div') = new jQuery()
$div.attr('name', 'halo');
```


## __proto__
- - - -
这是每一个 ~*Javascript对象*~ （除了null，函数也是对象）都具有的一个属性，叫_proto_，这个属性会指向该对象的原型。🌟
```
function Fn() {
}
var fn = new Fn();
```
#### 什么是原型？每一个javascript对象（null除外）在创建的时候就会与之关联的另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型“继承”属性
#### 每个对象都有一个隐藏属性 __proto__ （隐式原型），这个属性指向创建这个对象的函数的prototype，即 fn.__proto__ = Fn.prototype
#### 自定义函数的prototype本质上就是和 var obj = {} 是一样的，都是被Object创建，所以它的__proto__指向的就是Object.prototype。
![](https://github.com/hideInbush/Explore13.github.io/blob/master/assets/image/prototype/2.png)

```
再看一个栗子
console.log(Object instanceof Function) //true
console.log(Function instanceof Object) //true
console.log(Function instanceof Function) //true
```
![](https://github.com/hideInbush/Explore13.github.io/blob/master/assets/image/prototype/3.png)


## constructor
- - - -
每个原型都有一个constructor属性指向关联的构造函数。
```
function Person() {
}
console.log(Person === Person.prototype.constructor); //true
console.log(person.constructor === Person) //true

⚠️其实person中并没有constructor属性，而是根据逐级向上查找也就是Person.prototype中读取，所以person.constructor就变成了Person.prototype.constructor
```

## Javascript中的继承是通过原型链来体现的
- - - -
所以真的是继承吗？
> 继承意味着复制操作，然后javascript默认并不会复制对象的属性，相反，javascript只是在两个对象之间创建一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些  
> from 《你不知道的javascript》  


## 实例与原型
- - - -
当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。


## 原型的原型
- - - -
	* 其实原型对象就是通过Object构造函数生成的，结合之前所讲
![](https://github.com/hideInbush/Explore13.github.io/blob/master/assets/image/prototype/4.png)
	* 那么Object.prototype的原型呢？是null

## 原型链
- - - -
访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找
```
function Foo(){ }
var f1 = new Foo();

f1.a = 10;
Foo.prototype.a = 100;
Foo.prototype.b = 200;

console.log(f1.a); //10
console.log(f1.b); //200
```

实际应用中，如何区分一个属性到底是基本的还是从原型链中找到的呢？—-hasOwnProperty，而这个方法恰恰来自Object.prototype

## new一个函数时发生了什么？
- - - -
	1. 创建一个空对象，把一个空对象的proto属性设置为People.prototype
	2. 执行函数People，函数里面的this代表刚刚创建的新对象
	3. 返回这个对象
```
function People(name){
	this.name = name;
}
People.prototype.sayName = function(){
	console.log(`My name is ${this.name}`);
}
var p = new People('halo');
p.sayName();
```

## 最后来看看几个栗子
- - - -
### 栗子1
```
function show(x) {
    console.log(typeof x);    // undefined
    console.log(typeof 10);   // number
    console.log(typeof 'abc'); // string
    console.log(typeof true);  // boolean

    console.log(typeof function () {});  //function

    console.log(typeof [1, 'a', true]);  //object
    console.log(typeof { a: 10, b: 20 });  //object
    console.log(typeof null);  //object
    console.log(typeof new Number(10));  //object
}
show();
```
* 判断一个变量是不是对象，值类型的类型判断用typeof，引用类型的类型判断用instanceof
* (A instanceof B ) Instanceof的判断规则是：沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true，如果找到终点还未重合，则返回false
* 那么按照以上的规则，来看一下 f1 instance Object，明显就是true
![](https://github.com/hideInbush/Explore13.github.io/blob/master/assets/image/prototype/5.png)


### 栗子2
```
var fn = function () {
    alert(100);
};
fn.a = 10;
fn.b = function () {
    alert(123);
};
fn.c = {
    name: "王福朋",
    year: 1988
};

在jQuery源码中，'jQuery'或者'$'，这个变量其实是一个函数
console.log(typeof $) //function
```
* 一切引用类型都是对象，对象是属性的集合

### 释疑1：为什么？
```
typeof fn(){} //function
typeof {} //object
typeof [] //object
```
* 因为数组是对象的一个子集，而函数与对象之间不仅仅是包含和被包含的关系。

#### **对象都是通过函数创建的**。(一定要明确这一点)
```
var obj = {a: 10} 
等价于<=> var obj = new Object(); obj.a = 10;

var arr = [5, 'x', true]
等价于<=> var arr = new Array(); ...

typeof(Object) //function
typeof(Array) //function
```


