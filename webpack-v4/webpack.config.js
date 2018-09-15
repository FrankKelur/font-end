const path = require('path');

// module.exports = {
//     entry: './src/index.js',
//     output: {
//         filename: 'main.js',
//         path: path.resolve(__dirname, 'dist')
//     }
// };
module.exports = {
    entry: './index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};