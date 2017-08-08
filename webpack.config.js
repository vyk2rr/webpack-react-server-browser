const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const browserConfig = {
  entry: [
    "./src/browser/index.js",
    "bootstrap-loader"
  ],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  target: "web",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
                modules: false,
                importLoaders: 2 // The query parameter importLoaders allows to configure how many loaders before css-loader should be applied to @imported resources. https://github.com/webpack-contrib/css-loader
              }
            },
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('autoprefixer')
                ]),
              },
            }
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets:[
            "react-app"
          ]
        }
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports-loader',
        options: {
          jQuery: "jquery"
        }
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: "application/font-woff",
          outputPath: "./public/css/fonts/"
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: "application/octet-stream",
          outputPath: "./public/css/fonts/"
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          outputPath: "./public/css/fonts/"
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: "image/svg+xml",
          outputPath: "./public/css/fonts/"
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: "./public/assets/"
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('public/css/[name].css'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};

const serverConfig = {
  entry: "./src/server/index.js",
  target: "node",
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [{
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
    }]
  }
};

module.exports = [browserConfig, serverConfig];