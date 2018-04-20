# 市场ERP系统 H5部分

## 有关注意事项
  希望大家及时把一些影响正常开发的疑难问题，及时同步到这里，避免大家反复入坑：

### npm install 依赖安装失败
改用淘宝源安装:
>npm install  --registry=https://registry.npm.taobao.org

或者设置源为淘宝:  
>npm config set registry http://registry.npm.taobao.org

### npm 启动时node-sass出现报错
   执行：
>npm rebuild node-sass

### 开发时手机通过IP不能访问
  在项目目录的`config/index.js`文件中，将host由`localhost`改为`0.0.0.0`, 然后用电脑所连WiFi的IP访问即可。

### 避免列表页 点击打电话的同时跳转到详情页
  绑定事件时使用 `@click.stop` 代替 `@click`

### 建议使用 atom 编辑器，安装linter-elsint插件后 设置 保存自动修复
  能够避免很多潜在的bug和有效提供代码可读性

## 项目简介
**本工程是整个ERP系统的h5录入部分，由二手车市场的现场工作人员使用，项目意义重大，是中国汽车流通协会委托我们开发的。**

### 技术架构--vue技术栈
  本工程虽然页面不多，但是基本覆盖了vue 进行h5开发的核心技术，比如`tab`切换、数据请求、页面间数据共享、缓存，上拉加载和下拉刷新，查看照片大图等常见开发需求。
> [vue 2.x](https://cn.vuejs.org/v2/guide/index.html)核心库处理页面渲染、管理事件、数据双向绑定和组件开发等基础功能；  
> [vue-router2.x](https://router.vuejs.org/zh-cn/) 官方路由库控制页面跳转；  
> [vuex2.x](https://vuex.vuejs.org/zh-cn/)官方公共状态管理库实现页面间数据传递和公共数据管理；   
> [Axios](https://www.npmjs.com/package/axios)第三方API库进行数据请求的管理；

### 整个ERP系统项目干系人
- 项目负责人  令刚
- 产品  曲奇
- 测试  尹老板 昊昊
- UI   倩薇  玉洁
- 后端  令刚 丽君 献忠 方方
- 客户端  PC:社会龙 小迪 峻函 小O  H5:峻函 金委 亚龙 iOS:小迪 Android:小O
- 测试开发 一昂 忠贵

### 项目原型图
- [二手车交易市场ERP]({https://xe2qgr.axshare.com)
- [车商APP端+H5](https://rhngl6.axshare.com)

### UI设计稿
[http://devops.biz.taoche.com/gitlab/fe/CheTao.git](http://devops.biz.taoche.com/gitlab/fe/CheTao.git)

### 如何改bug
禅道地址: [http://192.168.155.56:8000/index.php](http://192.168.155.56:8000/index.php)

**如果没有账号**

- 可以临时使用账号：**chentianwen** 密码：**123456**
- 可以找测试负责人尹航开账号；
登录以后点击测试，然后在左侧点击下拉框，选择市场**ERP**项目，选中其中一个未解决的bug

**解决 Bug 的基本步骤**

1. 复现bug，然后和测试确认bug，并把bug状态改为 已确认
2. 把bug立即指向自己或者对应的人
3. 分析bug，寻找解决方案，如果半小时没有思路，马上找人支援；
4. 解决bug，并及时让测试回测；
5. 把bug状态改为 已解决

### 排期
  迭代提测，**3月22日**上线试用，**27日**小版本迭代

## 开始开发

### 下载源码
 >git clone http://devops.biz.taoche.com/gitlab/fe/market-h5.git

### 进入目录并安装依赖
 >cd opportunity-h5 && npm install

### 编译node-sass并启动项目
一般第一次运行时需要编译`node-sass`，之后直接运行即可：
>npm rebuild node-sass && npm start

### 通过浏览器访问
根据项目目录下的 `config/index.js`文件中的`host`和`port`设置来访问,如`localhost:8080/`, 如果看到如下配置
`autoOpenBrowser: true`,则脚手架会自动打开浏览器访问h5的首页。

### 登录账号和验证码
H5与pc都是系统管理人员使用，APP是车商使用。H5开发环境使用的手机号为：`18801060118` `17600564626`
开发和测试环境不发真实验证码到手机上，统一使用后台模拟生成的验证码登录
验证码获取地址为：[http://192.168.155.56:8080/market/ucar-msg.log](http://192.168.155.56:8080/market/ucar-msg.log)

### 市场API
[http://192.168.155.56:8080/docs/market/](http://192.168.155.56:8080/docs/market/)

## 开发规范
为提高协作的效率和避免不必要的潜在bug，望大家严格遵守我们的代码规范：

### 合理命名
  变量和函数命名要内容功能意义对应，样式命名要符合我们的约定规范；

### 不允许提交带eslint错误的代码
  制定规则，罚款充当团建费...

### 合理的目录
`pages`下面的文件主要为业务逻辑处理，`components`下的文件为复用的公共组件，主要用来展示；把一些常用的函数和变量都放在`lib`下面，路由、请求和公共状态管理都放到对应的目录及文件，确保项目结构和职能的清晰。

## 代码管理
为提高效率和方便查阅，建议大家安装**source tree**，查看各分支和同事们的代码提交记录;

### 提交代码
  在提交代码前先查看自己的修改内容，然后执行如下命令：

  > git stash && git pull && git stash pop

  若有冲突，先解决冲突, 然后执行:
  > npm run lint

  解决`eslint`错误后执行
  > git add . && git cz (需要全局安装npm install -g commitizen)

  然后根据实际选择类别

> - **feature** 一般在开发阶段添加新特性使用，然后写上对应的业务或文件名，然后写写简单的描述，后面的都可直接跳过；  
> - **fix**     一般在提测阶段和修改线上bug使用，然后写上禅道上对应的bug ID,简要描述bug内容和解决方式；  
> - **style**   一般在UI优化时选择;  
> - **其他**     其他选项大家根据对应的意思去选择即可

  最后，`git push`到远程即可。如果远程代码有更新先
  >git pull --rebase

  然后再

 >git push

### 分支管理
- **dev --> test --> master**  只能单向合并  
- 开发新功能必须从`Dev` 拉出来建立`feature/branchName`分支, 提测后合并回`Dev`删除  
- 测试阶段的bug都在`Dev`分支上提交，线上`bug`一般新建一个`hotfix`分支改完后，再分别合到`master`和`Dev`分支；  
- 测试分支 只有测试有权限部署，生产环境部署`master`分支，只有`社会龙`[^1]有权限

## 发布上线
- 开发和测试环境都在[http://192.168.155.24:8080/jenkins/](http://192.168.155.24:8080/jenkins/) 上进行自动构建发布，线上环境找 `社会龙`[^1]和闫峻涵，
- 然后在浏览器中输入[192.168.155.56/market](192.168.155.56/market)即可访问开发环境`h5`, 使用账号`18801060118`获取验证码登录，把`56`改为`26`为测试环境
- 线上域名暂时没有域名，通过ip访问：[211.152.7.6:2281/market/](211.152.7.6:2281/market/)  账号请找产品测试要


### jenkins构建脚本
核心主要执行了

>npm run build

然后将生成的静态文件通过Linux命令分发到不同环境的服务器

### 配置ngnix服务器
- 通过ngnix配置对应的规则控制不同项目静态文件的请求。

### 结构目录
```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── dist                                        // 上线项目文件
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
│   ├── api                                     // 接口
│   │   ├── axios.config.js                     // axios 配置文件
│   │   └── index.js						        // 接口集合
│   ├── assets                                  // 资源
│   │   ├── css                     
│   │   │   └── common.css                      // 公共样式文件
│   │   └── loading.gif						        // 加载图
│   ├── components                              // 组件集合
│   │   ├── common                              // 公共组件
│   │   │   ├── common-bubble.vue			        // 在下拉刷新时使用
│   │   │   ├── common-exitEdit-dialog.vue      // 提示弹窗
│   │   │   ├── common-header.vue			        // 头部
│   │   │   ├── common-list-img.vue             // 图片列表
│   │   │   ├── common-loading.vue              // 加载 gif 图片
│   │   │   ├── common-nocar-page.vue           // 没有数据返回显示的组件
│   │   │   └── common-scroll.vue               // better-scroll 的更近一层 Vue 的封装
│   │   ├── input
│   │   │   └── text-input.vue                  // 显示对象中leftText和rightValue的组件
│   │   ├── car-brand-list.vue			        // 车辆品牌列表组件
│   │   ├── car-detail-config.vue               // 车辆配置信息组件
│   │   ├── car-detail-desc.vue                 // 车辆详情的车辆描述组件
│   │   ├── car-detail-info.vue                 // 展示车辆详情中的基本信息组件
│   │   ├── car-list-desc.vue                   // 车辆列表里的车辆信息组件，与car-detail-desc高度相似
│   │   ├── car-list.vue                        // 车辆列表页车列表展示组件
│   │   ├── car-search-list.vue                 // 主页上方搜索栏页面组件
│   │   ├── common-dialog.vue                   // 确定|取消弹窗组件
│   │   ├── contact-item.vue                    // 商家信息和拨打电话组件
│   │   ├── footer-tabs.vue                     // 底部信息组件，车辆管理和个人中心
│   │   ├── form-items.vue                      // 表单输入框组件
│   │   ├── home-header.vue                     // 主页面头组件
│   │   ├── login-out-button.vue                // 退出登录按钮组件
│   │   ├── network-error.vue                   // 请求失败后的刷新页面组件
│   │   ├── pic-tab.vue                         // 车辆详情页面的图片展示组件
│   │   └── search-header.vue                   // 搜索页的搜索框组件
│   ├── lib									        // 包括公共方法和数组等的定义
│   ├── pages									        // 页面
│   │   ├── CarDesc.vue                         // 展示车辆相关描述信息
│   │   ├── CarDetail.vue                       // 车辆详情
│   │   ├── CarPicker.vue                       // 选择车辆品牌
│   │   ├── Home.vue                            // 首页
│   │   ├── ImgList.vue                         // 图片列表
│   │   ├── Login.vue                           // 登录
│   │   ├── Mine.vue                            // 个人信息
│   │   ├── NotFound.vue                        // 未知页面
│   │   └── SearchList.vue                      // 搜索列表
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── getData.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   │   └── tempdata                            // 开发阶段的临时数据
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

[^1]: 徐新龙
