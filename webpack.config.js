const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'), // 此為輸出的位置，通常跟index.html一起輸出
    filename: 'bundle.js',
  },
  module: {
    // rules的值是一個陣列可以存放多個loader物件
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'], // css編譯完才會是style，loader編譯順序是右到左
      },
    ],
  },
  devServer: {
    // 指定開啟port為3000
    port: 3000,
  },
};

// 說明webpack.config.js 指的是打包設定
// 設定內容:
// 1.此檔為基準的進入(打包)路由，此檔為所有檔案匯入之集大成(index)
// 2.打包要用那些套件跟掛件
// **注意**@babel/core、@babel/preset-env、babel-loader一定會有
// hint:.babelrc跟webpack設定可寫一起，但大多數會拆開方便其他專案重複利用
