# this
[深入理解javascript原型和闭包（10）——this - 王福朋 - 博客园](http://www.cnblogs.com/wangfupeng1988/p/3988422.html)

## 从ECMAScript解读this
https://github.com/mqyqingfeng/Blog/issues/7
* ECMAScript的类型分为语言类型和规范类型。
	1. ECMAScript的语言类型是开发者直接使用操作的，就是我们常说的undefined，null，object，number，boolean，string
	2. 而规范类型相当于meta-values，是用来算法描述ECMAScript语言结构和ECMAScript语言类型的。规范类型包括：Reference，List，Completion，Property Descriptor，Property Identifier，Lexical Environment 和 Environment Record

* 在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了

****

## 穷举情况
1. 构造函数
```
function Fn() {
	this.name = 'halo';
	this.year = 2018;
}

Fn.prototype.getName = function() {
	return this.name;
}

var f1 = new Fn();
f1.getName(); // halo
```
	* 不仅仅是构造函数的prototype，即便是在整个原型链中，this代表的也都是**当前对象**的值
3. 函数作为对象的一个属性，注意**箭头函数**特别情况
	* 箭头函数其实是没有this的，而是引用外层的this，这个函数中的this取决于他外面的第一个不是箭头函数的函数的this
4. 函数用call或者apply调用
5. 全局 & 调用普通函数

## 练习题
```
//example1
var arr = [];
for(var i=0; i<3; i++){
	arr[i] = function(){
		console.log(this);
	}
}

var fn = arr[0];

arr[0]; // arr
//数组是特殊的对象
// arr = {0: function(){console.log(this)}}

//example2
var app = {
    fn1() {
        setTimeout(function(){
            console.log(this)
        }, 10)
    },
    fn2() {
        setTimeout(()=>{
            console.log(this)
        },20)
    },
    fn3() {
        setTimeout((function(){
            console.log(this)
        }).bind(this), 30)        
    },
    fn4: ()=> {
        setTimeout(()=>{
            console.log(this)
        },40)        
    }
}
app.fn1() //window
app.fn2() //app
app.fn3() //app
app.fn4() //window
```