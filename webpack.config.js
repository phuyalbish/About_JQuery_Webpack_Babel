const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.js",
    output: {
      filename: isProduction
        ? "[name].[contenthash].bundle.js" // Content hash for production
        : "[name].bundle.js", // No hash for development
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html", // Point to your HTML file in the src folder
      }),
    ],
    devtool: isProduction ? false : "inline-source-map", // Source maps only for development
    devServer: {
      static: path.join(__dirname, "dist"),
      hot: true,
      open: true,
      port: 9000,
    },
    optimization: isProduction
      ? {
          minimize: true,
          splitChunks: {
            chunks: "all",
          },
        }
      : {},
    mode: isProduction ? "production" : "development", // Set mode dynamically
  };
};
