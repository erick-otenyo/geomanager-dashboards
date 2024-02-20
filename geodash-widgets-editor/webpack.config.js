const webpack = require("webpack");
const path = require("path");

module.exports = function (env, argv) {
    const options = {mode: argv.mode};
    const isDevBuild = options.mode === "development";

    return {
        mode: options.mode,
        entry: {
            "map-widget-editor": path.resolve(__dirname, "./src/map-widget-editor/index.js"),
            "map-widget-renderer": path.resolve(__dirname, "./src/map-widget-renderer/index.js"),
        },
        resolve: {
            extensions: [".js", ".css", ".scss", ".svg"],
            modules: [
                `${__dirname}/src`,
                "node_modules",
            ],
            alias: {
                "mapbox-gl": "maplibre-gl",
            }
        },
        optimization: {
            minimize: !isDevBuild,
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: "defaults",
                                        debug: true,
                                        useBuiltIns: "usage",
                                        corejs: 3,
                                    },
                                ],
                                ["@babel/preset-react", {runtime: "automatic"}],
                            ],
                        },
                    },
                },
                {
                    test: /\.(svg|png)$/,
                    use: {
                        loader: "url-loader",
                        options: {},
                    },
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
            ],
        },
        output: {
            path: path.join(__dirname, "../geodash/static/geodash/js/widget-editor/"),
            filename: "[name].js",
            library: "WidgetEditor",
            libraryTarget: "umd",
            umdNamedDefine: true,
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.ENVIRONMENT": JSON.stringify(options.mode),
                // "process.env.VERSION": JSON.stringify(packageJson.version),
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 5,
            })
        ],
    };
};
