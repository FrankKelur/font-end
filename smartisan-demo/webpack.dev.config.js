const webpack = require('webpack');
const config = require('./webpack.base.config')
config.devServer = {
    hot: true,
    publicPath: '/dist/',
    historyApiFallback: {
        index: './index.html'
    }
}
config.plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = config;