# rem适配

## 什么是`rem`
CSS3新增的一个相对单位`rem`（root em，根em）。`rem`是相对于根节点。如果根节点设置了`font-size`：10px，那么`font-size`：`1.2rem`，就等于`12px`

## 如何处理视觉稿
当我们拿到设计稿的时候，主要会将视觉稿分成100份，所以针对一个750px的视觉稿，我们可以算出：1rem = 7.5px

## lib-flexible原理
1. 计算页面的`dpr`
```
if (!dpr && !scale) {
  var isAndroid = win.navigator.appVersion.match(/android/gi);
  var isIPhone = win.navigator.appVersion.match(/iphone/gi);
  var devicePixelRatio = win.devicePixelRatio;
  if (isIPhone) {
	// iOS下，3和3以上的屏，用3倍的方案，2用2倍方案，其余的用1倍方案
  		if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
      	dpr = 3;
      } else if (
			devicePixelRatio >= 2 &&
			(!dpr || dpr >= 2)
		){
          dpr = 2;
      } else {
          dpr = 1;
      }
  } else {
  // 其他设备下，仍旧使用1倍的方案
      dpr = 1;
  }
  scale = 1 / dpr;
}
```

2. 改写`meta`标签
Flexible实际上就是能用JS来动态改写`meta`标签，代码类似这样：
```
var metaEl = doc.createElement('meta');
var scale = 1 / dpr;
metaEl.setAttribute('name', 'viewport');
metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
if (docEl.firstElementChild) {
    document.documentElement.firstElementChild.appendChild(metaEl);
} else {
  var wrap = doc.createElement('div');
  wrap.appendChild(metaEl);
  documen.write(wrap.innerHTML);
}
```

3. 转换rem
使用插件转换rem：
```
.selector {
  width: 150px;
  height: 150px; 
  font-size: 12px; 
	border: 1px solid #ddd; 
}
```

```
.selector {
  width: 2rem;
  height: 2rem;
  border: 1px solid #ddd;
}
[data-dpr="1"] .selector {
  font-size: 12px;
}
[data-dpr="2"] .selector {
  font-size: 28px;
}
[data-dpr="3"] .selector {
  font-size: 42px;
}
```