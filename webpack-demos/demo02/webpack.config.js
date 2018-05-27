const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
module.exports = {
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015'
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      compress: false
    })
  ]
}