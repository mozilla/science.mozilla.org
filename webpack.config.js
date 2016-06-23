var webpack = require(`webpack`);

module.exports = {
  resolve: {
    alias: {
      // Prevent multiple copies of React from being loaded when mofo-ui is used
      react: `${__dirname}/node_modules/react`
    }
  },
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
          presets: [`es2015`, `react`]
        }
      },
      {
        test: /\.json$/,
        loader: `json`
      }
    ]
  }
};
