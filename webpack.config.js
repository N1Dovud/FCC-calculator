const path = require("path");

module.exports = {
    entry: "./src/js/index.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'bundles/js')
    },
    module: {
        rules: [
            { 
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
}