### 技术栈

第一阶段：纯 React + CSS(BEM + CSS 模块导入[这个我还不太明白...])
第二阶段：React + firebase(实现用户认证)
第三阶段：TailwindCSS + Antd + ...
...

[随机 id 生成：uuid](https://www.npmjs.com/package/uuid)

#### 技术细节

font-size 使用 rem 单位
其余更多使用 em 单位

非常细小的内容使用的是 px 单位

#### 当前进度：

目前还不支持响应式布局。之后再弄...
photo edit 任意选择本地图片功能还未弄...

#### 思考

我应该是给每个大模块都弄一个 `localStorage` 呢？还是所有模块统一一个 `localStorage` 呢？
