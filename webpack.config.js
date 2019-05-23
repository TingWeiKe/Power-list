const path = require('path');

module.exports = {
    mode: "development",
    //如果有一個以上的檔案需要打包，可以傳陣列給entry
    entry: ['./src/app.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build'),
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader'],
                
              },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react', '@babel/preset-env'] } } },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                  loader: 'url-loader',
                  options: {
                    limit: 100000,
                  },
                },
              },
        ]
    },
    //增加一個給devserver的設定
    devServer: {
        //指定開啟port為9000
        contentBase: path.join(__dirname, './public'),
        historyApiFallback: true,
        port: 9000,
        compress:true,
        proxy: {
            '/post': 'http://localhost:5000',
            changeOrigin: true
        }
        
    },
    

};