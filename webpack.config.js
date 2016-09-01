var path = require('path');
var webpack = require("webpack");
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'app/html');
module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
    mobile: path.resolve(APP_PATH, 'mobile.js'),
    vendors: ['jquery']
  },
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    //这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    //把入口文件里面的数组打包成verdors.js
    // 暂时注释掉，因为浏览器中会提示 webpackjsonp is not defined
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendors'
    // }),
    // new HtmlwebpackPlugin({
    //   title: 'Hello World app'
    // }),
    new HtmlwebpackPlugin({
      title: 'Hello World app index',
      template: path.resolve(TEM_PATH, 'index.ejs'),
      filename: 'index.html',
      favicon: 'img/1234.png',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['app'],
      //要把script插入到标签里
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'Hello Mobile app',
      template: path.resolve(TEM_PATH, 'mobile.ejs'),
      filename: 'mobile.html',
      chunks: ['mobile'],
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  module: {
    perLoaders: [
      {
          test: /\.jsx?$/,
          include: APP_PATH,
          loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!less'),
        include: APP_PATH
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'eval-source-map',
  jshint: {
    "esnext": true
  }
};