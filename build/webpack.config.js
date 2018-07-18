const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.js')
module.exports = merge(base,{
    mode:'development',
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        port:8080,
        hot:true,
        open:true,
        quiet: true,//不打印多余的信息
        historyApiFallback:true//刷新页面时不会报错
    },
    devtool:"eval-source-map"//显示具体文件
})