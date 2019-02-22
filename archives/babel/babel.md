# babel

## babel到底做了什么？
简单来说，babel就是把javascript中es6、es7、es8等的语法转换为例es5，能够让低端的浏览器得以运行
babel总共分为三个阶段：::解析(parse)::、::转换(transform)::、::生成(generate)::

### 解析
将代码解析成抽象语法树（AST），每个js引擎（比如Chrome浏览器中的V8引擎）都有自己的AST解析器，而`Babel`是通过`Babylon`实现的。在解析的过程中有两个阶段：::词法分析:: 和 ::语法分析::，词法分析阶段把字符串形式的代码转换为 令牌(`tokens`)流，令牌类似于`AST`中节点；而语法分析阶段则会把一个令牌流转换成`AST`的形式，同时这个阶段会把令牌中的信息转换成`AST`的表述结构

### 转换
在这个阶段，`Babel`接收得到`AST`并通过`babel-traverse`对其进行深度优先遍历，在此过程中节点进行添加、移除、更新及移除操作。这部分也是`Babel`插件介入工作的部分

### 生成
将经过转换的`AST`通过`babel-generator`再转换成js代码，过程就是深度优先遍历整个`AST`，然后构建可以表示转换后代码的字符串

## preset
插件的集合，分为以下几种：
* 官方内容，目前包括env、react、flow、minify等
* stage-x，这里面包含的doushi 当年最新规范的草案，每年更新
* es201x，latest

## 执行顺序
* plugin会运行在preset之前
* plugin会从前往后顺序执行
* preset的顺序则相反（从后向前）

## env（重点）
env的核心目的是通过配置得知目标环境的特点，然后只做必要的转换。例如目标浏览器支持es2015，那么es2015这个preset其实是不需要的，于是代码就可以小一点
如果不写任何配置，env等价于preset，也等价于es2015+es2016+es2017

### babel-cli，命令行工具
### babel-node，允许命令行转译+执行node文件
### babel-register，改写require命令，对require命令加载的文件转码，不对当前文件转码
### babel-polyfill，转换新的API，例如Array.from
两个缺点：库的体积较大；污染全局变量，修改原型链
### babel-runtime和babel-plugin-transform-runtime（重点），精简代码
先说babel-plugin-transform-runtime，以async／await为例，如果不使用这个plugin，会导致重复定义；而使用这个插件转码之后重复定义就变成了重复引用，同时注意的是，在在使用babel-plugin-transform-runtime的时候必须把babel-runtime当做依赖

再说babel-runtime，它内部集成了core-js、regenerator、helpers

## babel-loader
结合webpack进行构建



