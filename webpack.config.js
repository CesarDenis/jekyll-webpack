const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  paths: {
    assets: path.resolve(__dirname, 'assets'),
    dist: path.resolve(__dirname, 'src/assets')
  }
};

module.exports = {
  entry: {
    main: ['./assets/scripts/main.js', './assets/styles/main.scss']
  },
  output: {
    filename: 'scripts/main.js',
    path: config.paths.dist
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: config.paths.assets,
        loader: 'url',
        options: {
          limit: 4096,
          name: `[path][name].[ext]`
        }
      }
    ]
  },
  plugins: [
    new CleanPlugin([config.paths.dist], {
      verbose: false
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(config.paths.assets, 'images'),
        to: 'images/'
      },
      {
        from: path.resolve(config.paths.assets, 'fonts'),
        to: 'fonts/'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    })
  ]
};
