const path = require('path')
const webpackDevServer = require('webpack-dev-server');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const webpack = require('webpack');

const startServer = (configFilePath) => {
  let configPath = path.join(process.cwd(), configFilePath);
  let webpackConfig = require(configPath);
  webpackConfig.devtool = '#eval-source-map';
  let port = process.env.WEBPACK_PORT || 8000;
  const devServerConfig = {
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
  webpackConfig.output.publicPath = `http://localhost:${port}/assets/`;

  webpackConfig.plugins.push(new webpack.NamedModulesPlugin());
  webpackConfig.plugins.push(new CaseSensitivePathsPlugin());

  webpackConfig.mode = 'development';
  const compiler = webpack(webpackConfig);

  const server = new webpackDevServer(compiler, devServerConfig);
  server.listen(port);
}

module.exports = startServer;
