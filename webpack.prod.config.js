const path = require('path');

module.exports = {
    entry: "./FsLightbox.jsx",
    output: {
        path: path.join(__dirname, ''),
        libraryTarget: "commonjs2",
        filename: "./package/index.js",
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
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            ["react-remove-properties", { "properties": ["data-test-id", "data-test-class"] }]
                        ]
                    }
                }],
                exclude: /node_modules/,
            }
        ]
    }
};
