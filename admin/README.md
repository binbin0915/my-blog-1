# react-app-demo

> 基于create-react-app脚手架，增加了 router、redux、缓存组件

> react16.13版本，同时支持class组件和hooks，以及对应的和redux的搭配使用都有demo

```js
开发 npm start
测试打包 npm run build:test
qa环境打包 npm run build:qa
生产打包npm run build
打包报告分析 npm run build:report

不同的环境注入的不通的环境参数可以在/src/.env-cmdrc.json 配置
默认只有 npm run build 去掉了sourcemap
具体react使用请自己学习

```

## 目录结构
```

|-config // webpack配置
|-public // 静态文件
|-scripts
|-src
   |-api   // 全部接口
      
   |-assets     // img css font

   |-components   // 公共组件
        
   |-config        //代码内的相关配置 
        |-env.js     // 判断了一些环境相关的
      
   |-routes          //路由
        |-index.js   // 生成所有的路由，并注入一些公共方法
        |-conf.js  //路由的配置
        

   |-store        // redux 固定用法
        |-action    
        |-reducer
        |-actionTypes.js
        |-index.js
   |-utils
        |-auth.js   // 登录认证相关的处理函数
        |-getRef.js  // 
        |-lazyLoad.js  // React16的lazyload封装
   |-views 所有页面
        |-  
        
   |-App.js   //  所有的组件入口
   |-index.js  //项目入口
   |-serviceWorker.js // serviceWork
   |-setupProxy.js   // 本地环境的 接口代理

|-.env-cmdrc.json  // env-cmd 用于区别代码环境dev、test、qa、prod


```

```
env-cmdrc.json  配置

PUBLIC_URL 默认'/', 加载 a.js时，src='/static/js/a.js'
若PUBLIC_URL 为'//cdn.test.com/' 则加载时 src='//cdn.test.com/static/js/a.js'

REACT_APP_** 开头的 ,是在项目中src的任意位置用 process.env.REACT_APP_** 都可以取到，
便于抽离一些常量（不同环境下值不同的常量），见/src/config/env.js



```