var webpack = require(`webpack`);

module.exports = {
  context: `${__dirname}/app`,
  devtool: `cheap-module-source-map`,
  entry: {
    javascript: `./react/main.jsx`
  },
  output: {
    filename: `/js/compiled.js`,
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
          presets: [`es2015`, `react`],
          plugins: [`transform-class-properties`, `transform-decorators-legacy`]
        }
      },
      {
        test: /\.json$/,
        loader: `json`
      }
    ]
  }
};
