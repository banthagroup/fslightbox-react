const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, ''),
        libraryTarget: "umd",
        filename: "./main.js",
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader','css-loader' ],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html"
        }),
    ]
};