# 继承总结

```
function Person(name) {
	if (name !== undefined) {
		this.name = name;
	} else {
		this.name = 'halo';
	}
	this.age = 22;
}

Person.prototype.sayName = function() {
	alert(this.name);
}
```

## 原型链继承

## 构造函数继承

## 组合继承（原型+构造函数）

## 原型式继承

## 寄生式继承

## 寄生组合式继承
