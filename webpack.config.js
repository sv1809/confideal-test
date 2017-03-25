const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const cssnext = require("postcss-cssnext");
const postcssImport = require("postcss-import");

const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";

const sourcePath = path.join(__dirname, "./src");
const staticsPath = path.join(__dirname, "./static");
const prodPath = path.join(__dirname, "./dist");

const extractCSS = new ExtractTextPlugin({ filename: "style.css", disable: false, allChunks: true });

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity,
        filename: "vendor.bundle.js"
    }),
    new webpack.DefinePlugin({
        "process.env": { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new HtmlWebpackPlugin({
        template: sourcePath + "/index.ejs",
        production: isProd,
        inject: true,
    }),
];

const jsEntry = [
    "index",
];

if (isProd) {
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false
            },
        }),
        extractCSS
    );

    jsEntry.unshift(
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server"
    );
} else {
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    );
}

const postCssOptions = {
    // sourceMap: !isProd,
    plugins: () => [
        postcssImport,
        cssnext({
            features: {
                autoprefixer: { browsers: "last 2 versions" },
            }
        }),
    ]
};

module.exports = {
    devtool: isProd ? "source-map" : "cheap-module-source-map",
    context: sourcePath,
    entry: {
        js: jsEntry,
        css: "assets/styles/app.css",
        vendor: [
            "react",
            "react-dom"
        ]
    },
    output: {
        path: isProd ? prodPath : staticsPath,
        filename: "[name].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, exclude: /node_modules/, enforce: "pre", use: [{
                    loader: "eslint-loader"
                }],
            },
            { test: /\.html$/, use: { loader: "file-loader", query: { name: "[name].[ext]" } } },
            {
                test: /^((?!\.module).)*css$/, use: isProd ?
                    ExtractTextPlugin.extract({
                        fallback: "style-loader", use: [{
                            loader: "css-loader"
                        }, {
                            loader: "postcss-loader",
                            options: postCssOptions
                        }]
                    }) : ["style-loader", { loader: "css-loader" }, {
                        loader: "postcss-loader",
                        options: postCssOptions
                    }]
            },
            {
                test: /\.module.css$/, use: isProd ?
                    ExtractTextPlugin.extract({
                        fallback: "style-loader", use: [{
                            loader: "css-loader", options: { modules: true, localIdentName: "[path][name]__[local]--[hash:base64:5]" }
                        }, {
                            loader: "postcss-loader",
                            options: postCssOptions
                        }]
                    }) : [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: { modules: true, sourceMap: false, localIdentName: "[path][name]__[local]--[hash:base64:5]" }
                        },
                        {
                            loader: "postcss-loader",
                            options: postCssOptions
                        }
                    ]
            },
            {
                test: /\.(jsx?)$/, exclude: /node_modules/, use: [{
                    loader: "babel-loader", query: {
                        cacheDirectory: true
                    }
                }]
            },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/vnd.ms-fontobject" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=image/svg+xml" },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/, use: [{
                    loader: "url-loader", query: {
                        limit: 8192,
                        name: "img/[name].[ext]",
                    }
                }]
            }
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
        modules: [
            sourcePath,
            "node_modules"
        ]
    },
    plugins: plugins,
    devServer: {
        contentBase: "./client",
        historyApiFallback: true,
        port: 3000,
        hot: false,
        compress: isProd,
        stats: { colors: true },
    }
};