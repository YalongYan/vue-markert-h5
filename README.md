##  简介
由于开发vue项目的时候,需要重新搭建项目的架子,比较麻烦,其实之前做过的项目好多都可以直接拿过来用,比如接下来的这个项目,就可以满足平常的vue单页面开发.
###该项目包括了:
**全局配置axios** , **全局配置接口集合**  ,  **切换页面动画**  ,  **全局配置vuex**  ,  **页面请求数据增加loading效果**
## 主要结构目录
```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 源码目录
│   ├── api                                     // 接口
│   │   ├── axios.config.js                     // axios 配置文件
│   │   └── index.js                            // 接口集合
│   ├── assets                                  // 资源
│   │   ├── css
│   │   │   └── common.css                      // 公共样式文件
│   │   └── loading.gif                         // 加载图
│   ├── components                              // 组件集合
│   ├── lib                                     // 包括公共方法和数组等的定义
│   ├── pages                                   // 页面
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── vuex                                    // vuex的状态管理
│   │   ├── modules                             // store模块
│   │   │   ├── base.js
│   │   │   ├── carPicker.js
│   │   │   └── user.js
│   │   ├── index.js                            // 引用vuex，创建store
│   │   └── mutation-types.js                   // 定义常量muations名
│   ├── App.vue                                 // 页面入口文件
│   └── main.js                                 // 程序入口文件，加载各种公共组件
├── static                                      // 静态资源
│   ├── css
│   │   └── reset.css                           // 重置节点的css
│   └── images                                  // 图片
├── test                                        // 测试部分(暂时未用到)
├── index.html                                  // 入口html文件
.

```
由于请求的接口是我们内部使用的,所以大家参考代码的结构,使用方法就行,项目结构除了**src** 和**static**其他都是通用的,可以在此基础上直接开发,很方便.
