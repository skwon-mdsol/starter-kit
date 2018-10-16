let webpack = require('webpack');
let CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

config.devtool = '#eval-source-map';
let port = process.env.WEBPACK_PORT || 8000;
config.devServer = {
  port: port,
  inline: true,
  hot: true,
  publicPath: `http://localhost:${port}/assets/`,
  overlay: true,
  stats: 'minimal',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};
config.output.publicPath = `http://localhost:${port}/assets/`;

config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new CaseSensitivePathsPlugin());

config.mode = 'development';

module.exports = config;

