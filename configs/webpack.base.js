let webpack = require('webpack');
let path = require('path');
// allow build to work on node 0.10.x, can be removed if you're targeting node 0.12 or later

let RAILS_ENV = process.env.RAILS_ENV;

let env = {
  production: RAILS_ENV === 'production',
  test: RAILS_ENV === 'test',
  development: RAILS_ENV === 'development' || typeof RAILS_ENV === 'undefined'
};

env.build = (env.production || env.staging);

module.exports = {
  target: 'web',

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: ['node_modules']
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __PRODUCTION__: env.production,
      __TEST__: env.test,
      __CURRENT_ENV__: '\'' + (RAILS_ENV) + '\''
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development' // default to development
    })
  ],

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {outputStyle: 'expanded'}
          }
        ]
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          // customize: require.resolve('../.babel.config.js'),
          babelrc: false,
          configFile: false,
          presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')]
        },
      },
      {
        test: /\.ya?ml$/,
        use: [
          { loader: 'json-loader' },
          { loader: 'yaml-loader' }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|pdf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash].[ext]'
            }
          }
        ]
      },
      // fonts
      { test: /\.woff/, loader: 'file-loader' },
      { test: /\.svg/, loader: 'file-loader' },
      { test: /\.ttf/, loader: 'file-loader' },
      { test: /\.otf/, loader: 'file-loader' },
      { test: /\.eot/, loader: 'file-loader' }
    ]
  }
};

