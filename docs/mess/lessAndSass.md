# less 和 sass 的区别

记录平时使用中遇到的差别

## 变量作用域不一样

less 中生效的只有最后一次赋值:

```less
@border-color: red;
.box1 {
  background: @border-color;  // 蓝色
}
@border-color: blue;
.box2 {
  background: @border-color; // 蓝色
}
```
sass 变量在不同阶段的值是不一样的，这也是为什么 sass 中没有类似于 less 中`modifyVars`的功能。
```scss
$border-color: red;
.box1 {
  background: $border-color;  // 红色
}
$border-color: blue;
.box2 {
  background: $border-color; // 蓝色
}
```

<!-- cjh todo -->
还有，待补充。。。
