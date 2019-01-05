const path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    //如果有一個以上的檔案需要打包，可以傳陣列給entry
    entry: ['./public/app.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/public'
    },
    //將loader的設定寫在module的rules屬性中
    module: {
        //rules的值是一個陣列可以存放多個loader物件
        rules: [
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader'],
              },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react', '@babel/preset-env'] } } },
        
        ]
    },
    //增加一個給devserver的設定
    devServer: {
        //指定開啟port為9000
        historyApiFallback: true,
        port: 9000,
        compress:true,
        publicPath: '/public',
        
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //       template: './public/index.html'
    //     })
    //   ]
    
};