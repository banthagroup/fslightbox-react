const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/FsLightbox.jsx",
    output: {
        path: path.join(__dirname, ''),
        libraryTarget: "amd",
        library: "fslightbox-react",
        filename: "./index.js"
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        }
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "react"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom",
            root: "react-dom"
        },
        "prop-types": {
            commonjs: "prop-types",
            commonjs2: "prop-types",
            amd: "prop-types",
            root: "prop-types"
        }
    },
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
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: './index.js', to: './dist' },
            { from: './package.json', to: './dist' },
            { from: './Readme.md', to: './dist' }
        ])
    ]
};