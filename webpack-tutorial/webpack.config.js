const path = require('path')
// const webpack = require('webpack')

module.exports = {
  // entry: './src/app.js',
  entry: './src/layout.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'layout.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {} // style-loader options
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2 // css-loader options
            }
          },
          {
            loader: 'postcss-loader',
            options: {} // postcss-loader options
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   output: {
    //     comments: false
    //   }
    // })
  ]
}
