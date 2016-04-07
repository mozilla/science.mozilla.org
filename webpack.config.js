module.exports = {
  context: `${__dirname}/app`,
  entry: {
    javascript: `./react/main.js`
  },
  output: {
    filename: `/js/compiled.js`,
    path: `${__dirname}/dist`
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `babel`,
        query: {
          presets: [`es2015`, `react`]
        }
      }
    ]
  }
};
