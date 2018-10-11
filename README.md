# 简介

支持深合并的extend。

## api

```
// browser
var extend = window.extend;

// target:待修改对象。
// object1:待合并到第一个对象的对象。
// objectN:待合并到第一个对象的对象。
extend(target,object1,object2);


// deep:如果设为true，则递归合并。
// target:待修改对象。
// object1:待合并到第一个对象的对象。
// objectN:待合并到第一个对象的对象。
extend(deep,target,object1,object2);

```