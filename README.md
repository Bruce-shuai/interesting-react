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
开始利用`firebase`实现用户登录认证 + 添加一个`antd`来实现表单，因为自己来写表单真的太麻烦了...

#### 思考

我应该是给每个大模块都弄一个 `localStorage` 呢？还是所有模块统一一个 `localStorage` 呢？

如何调节 `antd` 中的字体大小？ 自定义 `antd` 在'jira'项目 6-1 这节有讲...
