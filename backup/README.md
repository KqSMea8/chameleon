**Chameleon**/kəˈmiːlɪən/，中文名`卡梅龙`，中文意思`变色龙`，意味着能适应不同环境，
是一套大前端整体解决方案。

### 项目背景
目前顺风车开发同学在端内既追求h5的灵活性，也要追求性能趋近于原生，于是我们在做native渲染，采用weex框架。
面对入口扩张，主端，独立端，微信小程序，甚至之后的支付宝小程序，百度小程序，单一功能在各平台都要重复实现，开发和维护成本成倍增加。迫切需要维护一套代码可以构建多入口的解决方案，我们已经有了一套代码构建h5和微信小程序的经验，在此基础上 chameleon(变色龙)项目应运而生。chameleon的目标是<b>`Write once run everywhere`</b>。具体背景参见[跨端](http://wiki.intra.xiaojukeji.com/pages/viewpage.action?pageId=125976982)。

### 主要特性
#### 1、简洁强大的构建配置
开发者不需要在项目中关心构建相关的配置，vue-cli这种脚手架工具生成的项目，虽然已经为我们做了大部分的webpack配置，但是其配置文件，及相关的所有依赖都在项目中，这就将构建相关的工作留给了生成的项目，增加了项目的复杂度，不利于统一的管理。而我们的脚手架工具chameleon-cli使用webpack作为内核，但是做了一些工作，将所有构建相关的配置和依赖的npm包都放到脚手架内部，让项目无需关心复杂的构建配置，chameleon-cli会统一对构建做功能的升级，并且提炼了项目中需要定制化的选项在项目的chameleon.config.js中进行配置。

#### 2、语法统一、快速上手
chameleon最大的特色就是跨端，而各端在视图层、逻辑层的语法都是不一致的，目前是微信小程序、web端、weex端，之后会有支付宝小程序、百度小程序等等。所以最好的解决方案就是我们自定义一套统一语法，在内部做各端的统一映射。具体的语法请参见【视图层】与【逻辑层】的文档。实现的语法拥有类Vue的开发体验，统一的组件，统一的生命周期，并且在小程序中增加了computed和watch这种响应式的特性，能够让开发者快速上手。

#### 3、方便的数据管理方案
chameleon统一了一套类似Vuex的数据管理方案，能够支持构建复杂应用。
#### 4、差异化方案
chameleon目标是各端90%以上的代码是重用的，但是不可以避免的在各端还是会有差异化的地方，功能上可以分为接口差异化和产品差异化。接口差异化指的是同一个方法在各端实现不一致，比如微信小程序端、web端和weex端获取用户信息的getUserInfo方法需要不同的实现。这种接口的差异化可以通过差异化方法进行实现，具体参见【项目框架】->【目录结构】->【差异化方法】一节。产品差异化指的是产品在需求上导致的各端实现不一致，比如某一个功能只在微信小程序端出现、某一个位置在各端展示不同的功能。面对这种差异化我们可以通过差异化组件实现，具体参见【视图层】【基本组件】【差异化组件】。我们在代码运行时也加入了环境变量process.env.platform用于判断当前运行环境。
#### 4、基础组件与基础api
chameleon针对各平台的基础组件和api进行封装，提供一套统一的基础组件和api，屏蔽各平台的差异。

### 技术体系

##### 团队研发

- [脚手架工具 chameleon-cli](https://git.xiaojukeji.com/beatles-component/chameleon-cli)
- [运行时框架 chameleon](https://git.xiaojukeji.com/beatles-component/chameleon)
- [数据管理 chameleon-store](https://git.xiaojukeji.com/beatles-component/chameleon-store)
- [加载器 chameleon-loader](https://git.xiaojukeji.com/beatles-component/chameleon-loader)
- [基础api chameleon-api](https://git.xiaojukeji.com/beatles-component/chameleon-api)
- [基础组件 chameleon-ui](https://git.xiaojukeji.com/beatles-component/chameleon-ui)
- [方法注入 chameleon-mixins](https://git.xiaojukeji.com/beatles-component/chameleon-mixins)
- [脚手架模板 chameleon-templates](https://git.xiaojukeji.com/beatles-component/chameleon-templates)
- [weex样式扩展 weex-css-support-loader](https://git.xiaojukeji.com/beatles-component/weex-css-support-loader)
- [npm入口处理 replace-loader](https://git.xiaojukeji.com/beatles-component/replace-loader)
- [小程序样式处理 wx-css-loader](https://git.xiaojukeji.com/beatles-component/wx-css-loader)

##### 第三方库定制化

- [url-loader](https://git.xiaojukeji.com/beatles-component/url-loader)，支持inline 
- [webpack-dev-middleware](https://git.xiaojukeji.com/beatles-component/webpack-dev-middleware)，支持磁盘写入 
- [webpack-liveload-middleware](https://git.xiaojukeji.com/beatles-component/webpack-liveload-middleware)，自动刷新
- [weex-vue-loader](https://git.xiaojukeji.com/beatles-component/weex-vue-loader)
 - 1 getRequireString 中的rawRequest 支持require中使用其他的loader
 - 2 getLoaderString 当type=styles 并且有options.loaders[lang]配置的loader，则拼接stype-compile与rewrite
- [weex-vue-render](https://git.xiaojukeji.com/beatles-component/weex-vue-render)
 - 删除inlineSourceMap
 - 删除weex-root * 这种全局css选择器

##### 技术支持
<img style="width:200px;height:auto;" src="./assets/dingtalkgroup.jpeg" />
