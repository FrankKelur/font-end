var path = require('path')
module.exports = (options = {}) => ({
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    devtool: options.dev ? '#eval-source-map' : '#source-map'
})