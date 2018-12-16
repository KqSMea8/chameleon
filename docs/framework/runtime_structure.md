
## 项目运行结构
##### 1 web端项目
chameleon项目在web端产生的是spa项目。
- html模板使用的是`/src/entry/entry.html`。
- 入口的js文件是`/src/entry/entry.web.js`，内容如下：

```javascript
import App from '../app/app.cml';
import store from '../store/index.js';
import router from '../router.js';
//window.$router命令 禁止修改
window.$router = router;
/**
 * can register Global Web Vue Components here
 */

const app = new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
});

```

- 路由文件 `/src/router.js`。
- 状态管理对象 `/src/store/index.js`
- vue根组件 `/src/app/app.cml`

##### 2 wx端项目
- 最终生成的文件符合微信小程序的目录结构。
- cml文件中的template、script、style,json配置部分打包之后会分别生成小程序中的wxml、js、wxss、json文件。app.cml文件中的template不会生成app.wxml。
- app目录下的内容对应着微信小程序中的app，pages下的内容对应微信小程序中的页面。
- 小程序中不支持node_modules文件夹，所以将node_moduels文件夹改名为npm。

##### 3 weex端项目
- weex项目将打包生成一个jsbundle,入口文件为`/src/entry/entry.weex.js`
- 和web端一样，也是需要用到 路由、状态管理、vue根组件、然后创建Vue实例。