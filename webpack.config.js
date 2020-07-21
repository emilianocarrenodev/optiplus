const webpack = require('webpack');

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'assets/js/bundle.min.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, './public'),
        port: 4000,
        open: true
    },
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.jsx?$/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browser: ["last 2 versions"]
                            },
                            plugins: () => [
                                autoprefixer
                            ]
                        }
                    },
                    'sass-loader'
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "assets/css/bundle.min.css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: 'popper.js'
        })
    ]
};