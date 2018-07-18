const path = require('path');
module.exports = {
    entry:{
        bundle:path.resolve(process.cwd(),'src/main.js')
    },
    output:{
        path:path.resolve(process.cwd(),'dist'),
        filename:'[name].js',
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.(jsx|js)$/,
                use:['babel-loader'],
                exclude:/node_modules/
            },
            {
                test:/\.(css)$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
                use: ['file-loader']
            }
        ]
    },
    resolve:{
        alias:{
            "@":path.resolve(process.cwd(),'src')
        },
        extensions:['.js','.jsx']
    }
}