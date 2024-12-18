const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
        main: path.resolve(__dirname, './src/app.js'),
    },
  output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
    },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
  },

  mode: 'development',
}