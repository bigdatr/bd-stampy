var path = require('path');

module.exports = function(config) {
    config.set({
        browsers: ['Firefox'],
        frameworks: ['jasmine'],
        files: [
            '__tests__/**/*.js'
        ],
        preprocessors: {
            '__tests__/**/*.js': 'webpack'
        },
        reporters: ['mocha', 'coverage'],
        singleRun: true,
        autoWatch: false,
        autoWatchBatchDelay: 400,
        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                fallback: path.resolve('./src'),
                extensions: ['', '.js', '.jsx', '.md']
            },
            module: {
                preLoaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loaders: ['babel-loader']
                    },
                    {
                        test: /\.jsx?$/,
                        include: [
                            path.resolve('components/'),
                            path.resolve('mixins/'),
                            path.resolve('utils/')
                        ],
                        loaders: ['isparta-loader']
                    }
                ]
            }
        },
        webpackServer: {
            // noInfo: true
        },
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                {type: 'html', subdir: 'report-html'},
                {type: 'lcov', subdir: 'report-lcov'},
                {type: 'text'},
            ]
        }
    });
};


