var path = require("path");
var config = {
    entry: './src/app.js',

    output: {
        path:'./',
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 8080
    },
    resolve: {
        root: [
            path.resolve('./src')
        ]
    },
    module: {
        loaders: [

            { test: /\.tjx?$/, loader: "awesome-typescript-loader" },
            {
                test: /\.js|\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2016', 'react']
                }
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=25000'
            }
        ]
    }
}

module.exports = config;