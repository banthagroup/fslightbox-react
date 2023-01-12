const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./demo/demo.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html"
        })
    ]
};
