var webpack = require(`webpack`);

module.exports = {
  context: `${__dirname}/app`,
  devtool: `cheap-module-source-map`,
  entry: {
    javascript: `./browser.jsx`
  },
  output: {
    filename: `/js/browser.js`,
    path: `${__dirname}/dist`
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(`production`)
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: `babel`,
        query: {
          presets: [`es2015`, `react`]
        }
      },
      {
        test: /\.json$/,
        loader: `json`
      },
      {
        test: /\.svg$/,
        loader: `svg-inline`
      }
    ]
  }
};
