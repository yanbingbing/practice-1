"use strict";

var path = require("path");

var fs = require("fs");

var gulp = require("gulp");

var webpack = require("webpack");

// http://browsersync.io/
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;


gulp.task("default", ["server"]);
gulp.task("watch", ["server"]);
gulp.task("start", ["server"]);

gulp.task("server", ["demo"], function (callback) {
    browserSync.init({
        server: {
            baseDir: './',
            index: './demo.html'
        },
        open: 'local'
    });

    gulp.watch(['demo.html']).on('change', browserSync.reload);

    gulp.watch([
        'src/**/*.js',
        'src/**/*.less',
        'src/**/*.svg'
    ], ['reload']);

    callback();
});


gulp.task('reload', ['demo'], function () {
    browserSync.reload();
});

gulp.task('demo', function (callback) {
    webpack({
        entry: "./src/index.js",
        output: {
            path: ".",
            filename: "~index.js",
            sourceMapFilename: "[file].map"
        },
        devtool: '#source-map',
        module: {
            loaders: [
                {test: /\.jsx?$/, exclude: /node_modules/, loader: "babel"},
                {test: /\.less/, exclude: /node_modules/, loader: "style!css!less"},
                {test: /\.svg$/, exclude: /node_modules/, loader: "babel!svg2react"}
            ]
        },
        externals: {
            'react': 'var window.React',
            'react-dom': 'var window.ReactDOM'
        },
        plugins: [
            new webpack.ProvidePlugin({
                React: "react",
                ReactDOM: "react-dom"
            })
        ],
        resolve: {
            alias: {
                icon: path.join(__dirname, 'src/icon')
            },
            extensions: ['', '.js', '.jsx', 'less']
        }
    }, function (err, stats) {
        if (!err) {
            callback();
        }
    });
});

gulp.task('build', function (callback) {
    webpack({
        entry: "./src/index.js",
        output: {
            path: "./dist",
            filename: "index.js",
            sourceMapFilename: "[file].map"
        },
        devtool: '#source-map',
        module: {
            loaders: [
                {test: /\.jsx?$/, exclude: /node_modules/, loader: "babel"},
                {test: /\.less/, exclude: /node_modules/, loader: "style!css!less"},
                {test: /\.svg$/, exclude: /node_modules/, loader: "babel!svg2react"}
            ]
        },
        externals: {
            'react': 'var window.React',
            'react-dom': 'var window.ReactDOM'
        },
        plugins: [
            new webpack.ProvidePlugin({
                React: "react",
                ReactDOM: "react-dom"
            })
        ],
        resolve: {
            alias: {
                icon: path.join(__dirname, 'src/icon')
            },
            extensions: ['', '.js', '.jsx', 'less']
        }
    }, function (err, stats) {
        if (!err) {
            callback();
        }
    });
});

