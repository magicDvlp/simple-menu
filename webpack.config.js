/* eslint-disable max-len */
const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, options) => {
  const isProduction = options.mode === "production";
  const isDevelopment = options.mode === "development";

  // rules
  const commonRules = {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [{ loader: "babel-loader" }].filter(Boolean),
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "../" },
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                sourceMap: true,
                includePaths: ["node_modules"],
                style: "expanded",
              },
            },
          },
        ],
      },
    ],
  };

  // plugins
  const pluginsUmd = [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: "write-references",
      },
    }),
    new ESLintPlugin(),
    isProduction &&
      new RemovePlugin({
        after: {
          test: [
            {
              folder: "./public/js",
              method: absoluteItemPath =>
                new RegExp(/image.*.js/).test(absoluteItemPath),
            },
            {
              folder: "./public/js",
              method: absoluteItemPath =>
                new RegExp(/.txt/).test(absoluteItemPath),
            },
          ],
        },
      }),
    new MiniCssExtractPlugin({ filename: "./css/simple-menu.css" }),
    isProduction &&
      new CopyPlugin({
        patterns: [
          {
            from: "src/sass/**/*.sass", // путь к вашим исходным SASS-файлам
            to: "sass/[name][ext]", // папка в public, куда они попадут
            noErrorOnMissing: true, // игнорировать, если файлов нет
          },
        ],
      }),
  ].filter(Boolean);

  const pluginsEsm = [
    new MiniCssExtractPlugin({ filename: "./css/simple-menu.min.css" }),
  ].filter(Boolean);

  // optimization
  const optimizationUmd = {
    minimize: true,
  };

  const optimizationEsm = {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  };

  // config
  const commonConfig = {
    entry: { index: "./src/index.ts" },
    resolve: { extensions: [".ts", ".tsx", ".js"] },
    module: commonRules,
    devtool: isProduction ? false : "eval-source-map",
    stats: { loggingDebug: ["sass-loader"] },
    devServer: {
      hot: true,
      allowedHosts: "all",
      devMiddleware: {
        publicPath: "/",
        writeToDisk: true,
      },
    },
  };

  const umdConfig = {
    ...commonConfig,
    optimization: optimizationUmd,
    cache: {
      type: "filesystem",
      name: "umd-cache", // Уникальный кеш для UMD
    },
    name: "umd",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "js/[name].js",
      publicPath: "",
      library: {
        name: "SimpleMenu",
        type: "umd",
      },
    },
    plugins: pluginsUmd,
  };

  const esmConfig = {
    ...commonConfig,
    optimization: optimizationEsm,
    cache: {
      type: "filesystem",
      name: "esm-cache", // Уникальный кеш для ESM
    },
    name: "esm",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "js/[name].es.js",
      publicPath: "",
      library: {
        type: "module",
      },
    },
    experiments: {
      outputModule: true,
    },
    plugins: pluginsEsm,
  };

  return [umdConfig, esmConfig];
};
module.exports.parallelism = 1;
