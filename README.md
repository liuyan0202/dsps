## 广告投放系统
### 技术介绍
*  主要技术 `react` `react-dom` `react-router-dom` `webpack` `webpack-cli` `webpack-dev-server` `antd` `echarts` `react-loadable` 代码拆分按需加载。`moment`时间。自己搭建的webpack
* 依赖 `babel`
    `babel-core`
    `babel-core`
    `babel-loader`
    `babel-plugin-syntax-dynamic-import` 动态import 
    `babel-preset-env`
    `babel-preset-react`
    `css-loader`
    `file-loader`
    `style-loader`
    `url-loader`
    `webpack-merge` 合并
    
### 文件介绍
  * assets : 静态文件，css,font
  * components : 封装组件，loading
  * myLoadable : 封装代码拆分
  * pages : 页面
  * router : router.js => 封装路由 , config.js => 路由配置