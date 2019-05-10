const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./site/src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 5 * 1024
          }
        }
      },
    ],
  },

  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
  },

  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8090,
    compress: false,
    host: 'localhost',
    historyApiFallback: true,
    hot: true,
    https: false,
    open: false,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './site/src/template/index.html',
    })
  ],
}