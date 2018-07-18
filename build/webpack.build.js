const merge = require('webpack-merge');
const base = require('./webpack.base.js')
module.exports = merge(base,{
    mode:'production',
    plugins:[],
    externals: {
        'moment':'moment',
        'ract-dom':'react-dom',
        'react':'react',
        'antd': 'antd'
    }
})