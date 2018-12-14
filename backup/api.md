## 接口多态（todo）

#### 什么时候用到接口多态？
例如:我们的页面现在需要一个本地存储功能的需求，我们已知各端的接口调用方法
- web端接口是`localStorage.setItem`
- 微信小程序端的接口是`wx.setStorageSync`
- weex端的接口是`storage.setItem`

我们想到了不同环境去调用各自的接口
```javascript
if(ENV.Web) {
  localStorage.setItem(key, value, function(e) {
  });
} else if(ENV.微信小程序) {
  wx.setStorageSync(key, value);
} else if(ENV.weex) {
  storage.setItem(key, value, function(e) {
  });
}
```
这样的代码有如下待解决问题：
- 1 增加代码复杂度，难以维护
- 2 各端接口的参数不一致，写多种逻辑
- 3 各端接口耦合在一起，bug风险极高
- 4 没有做到各端代码的分离，增大体积

利用了接口多态之后的使用方式如下：

```
import utils from 'utils.interface';

utils.setStorage(key, value)

```
可以看到我们只引用了一个interface模块，然后调用了一个同一个接口。下面就看我们的interface文件是如何进行的封装。

#### 接口多态文件的设计
上一节我们看到了将多端的接口封装到了一个.interface文件，我们接下来看一下要想克服之前提出的待解决问题，这个interface文件是如何设计的。

- 第一，是将各端代码进行分离，避免耦合在一起，并且各端只引用各自的接口代码。

我们设计利用`<script></script>`标签将各端代码进行物理隔离，利用`cml-type`属性指定是哪一端的接口。
```html
<script cml-type="web">
//web端接口实现
</script>
<script cml-type="weex">
//weex端接口实现
</script>
<script cml-type="wx">
//wx端接口实现
</script>
```

- 第二、向上提供统一的方法，参数，返回值。

我们设计各端实现一个独立的js模块，这些模块的方法要保持一致，方法的参数类型和返回值类型也要一致。

我们设计了`interface` 接口部分，并且各端模块的构造函数要实现该接口，我们在开发环境会做接口的校验。
如何写接口校验请参见[接口校验语法](/framework/polymorphism/check.md);

utils.interface
```html
<script cml-type="interface">
  // 定义一个传参为string类型，返回值为undefine的函数类型
  type Callback = (state: string) => undefined;

  //定义模块的interface
  interface UtilsInterface {
      // 定义setStorage方法 参数个数及返回值类型
      setStorage(key: string, value: string, cb: Callback ): undefined;
    }
</script>
<script cml-type="web">
//web端接口实现
class Method implements UtilsInterface {
  setStorage(key, value, cb) {
    localStorage.setItem(key, value, function(e) {
        if (e.result == "success") {
          cb('success');
        } else {
          cb('fail');
        }
      });
    });
  }
}
export default new Method();
</script>
<script cml-type="weex">
//weex端接口实现
class Method implements UtilsInterface {
  setStorage(key, value, cb) {
    storage.setItem(key, value,
    function(e) {
        if (e.result == "success") {
          cb('success');
        } else {
          cb('fail');
        }
    });
  }
}
export default new Method();
</script>
<script cml-type="wx">
//wx端接口实现
class Method implements UtilsInterface {
  setStorage(key, value, cb) {
    try {
      wx.setStorageSync(key, value);
      cb('success');
    }
    catch(e) {
      cb('fail');
    }
  }
}
export default new Method();
</script>
```

main.js 可以如下使用`utils.interface`;

```javascript
import utils from 'utils.interface';

export setStorage(key, value) {
  return new Promise(function(resolve, reject) {
    utils.setStorage(key, value, function(state) {
      if(state === 'success') {
        resolve();
      } else {
        reject();
      }
    })
  })
}

```
总结以上，接口多态.interface文件用于屏蔽各端差异化的本地接口，向上提供统一的调用模块，并规范各端模块的实现。