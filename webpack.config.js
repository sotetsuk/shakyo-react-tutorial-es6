const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  entry: [path.join(__dirname, '/src/app/app.js')],
  devtool: 'source-map',
  output: {
    path: buildPath,
    filename: "app.js",
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
    }),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
        {from: 'www'},
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
}
