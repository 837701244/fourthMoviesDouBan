# vue2

## Project setup
```
npm install 配置项目所需要的包
```

### Compiles and hot-reloads for development热启动
```
npm run serve
```

### Compiles and minifies for production打包
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目思路

### 创建文件

```js
npm i vue

npm i -g @vue/cli
npm update -g @vue/cli

vue create vue-demo

```

### 文件大纲

```js
dist(打包后生成目录)

node_modules(项目所依赖的工具包)

public(公共资源目录打包后会在根目录下)

src源码目录(项目核心目录)
-assets(公共文件资源，打包后会创建新文件)
-components(静态组件，公共组件，类似头部，底部)
-plugins(工具文件夹,js文件，类似directive自定义指令，filter过滤器，elementUi)
-store(路由表)
-views(动态路由组件，都是在路由变中的)

App.vue(根组件,页面级组件,根目录，起源文件)
main.js(页面入口JS文件)

package.json(项目描述文件)

vue.config.js((vue配置))
```

