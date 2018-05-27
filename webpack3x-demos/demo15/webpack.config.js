var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    app: ['./app/index.js']
  },
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, '.'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  }
  // ,
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ]
}