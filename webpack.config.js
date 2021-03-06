const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development', // process.env.NODE_ENV,
  entry: path.resolve('./src', 'index.js'),
  output: { path: path.resolve(__dirname, 'build'), filename: 'bundle.js' },
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ]
  },
  devServer: {
    publicPath: '/build',
    proxy: [
      {
        context: ['/api', '/socket.io', '/fonts'],
        target: 'http://localhost:8000'
      }
    ]
  }
};
