const webpack = require('webpack')

module.exports = {
  entry: './main.js',
  devtool: 'eval-source-map',
  output: {
    filename: 'bundle.js',
    publicPath: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      'process.env': require('./dev.env')
    })
  ]
}