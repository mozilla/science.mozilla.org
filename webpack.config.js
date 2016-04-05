module.exports = {
  context: `${__dirname}/app`,
  entry: {
    javascript: `./js/main.js`,
    html: `./index.html`
  },
  output: {
    filename: `/js/compiled.js`,
    path: `${__dirname}/dist`
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: `babel`,
        query: {
          presets: [`es2015`, `react`]
        }
      },
      {
        test: /\.html$/,
        loader: `file?name=[name].[ext]`
      }
    ]
  }
};
