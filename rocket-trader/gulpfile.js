'use strict'

const gulp = require('gulp'),
    less = require('gulp-less'),
    webpack = require('webpack-stream');
    // uglify = require('gulp-uglify'),
    // stripDebug = require('gulp-strip-debug');

gulp.task('less', function () {
  return gulp.src('./src/styleSheet/trader.less').pipe(less()).pipe(gulp.dest('./src/styleSheet/trader.css'))
})
//打包压缩js
gulp.task('bundle', function() {
    // 打包index
    gulp.src('./src/engine.js')
        .pipe(webpack({
            output: {
                filename: "rocket-trader.js"
            },
            devtool: 'source-map',
            module: {
                loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]
            }
        }))
        .pipe(gulp.dest('dist'));
});

// gulp.task('dev', function() {
//     // 打包index
//     gulp.src('./src/engine.js')
//         .pipe(webpack({
//             output: {
//                 filename: "rocket-trader.js"
//             },
//             // devtool: 'source-map'
//         }))
//         // .pipe(babel({
//         //     'presets': ['es2015']
//         // }))
// //        .pipe(uglify())
// //        .pipe(stripDebug())
//         .pipe(gulp.dest('dist'));
// });

gulp.task('watch', function() {
    gulp.watch(['src/*.js', 'index.js'], ['bundle']);
});

gulp.task('default', ['bundle']);
