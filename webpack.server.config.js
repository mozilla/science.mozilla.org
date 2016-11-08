var webpack = require(`webpack`);
var path = require(`path`);
var fs = require(`fs`);
var nodeModules = {};

// Voodoo from https://stackoverflow.com/questions/31102035/how-can-i-use-webpack-with-express
fs.readdirSync(path.resolve(__dirname, `node_modules`)).filter(x => [`.bin`].indexOf(x) === -1).forEach(mod => {
  nodeModules[mod] = `commonjs ${mod}`;
});

module.exports = {
  context: `${__dirname}/app`,
  target: `node`,
  devtool: `cheap-module-source-map`,
  entry: {
    server: `./server.jsx`
  },
  externals: nodeModules,
  output: {
    filename: `/server.js`,
    path: `${__dirname}`
  },
  module: {
    loaders: [{
      test: /\.js(x?)$/,
      loader: `babel`,
      query: {
        presets: [`es2015`, `react`]
      }
    }, {
      test: /\.json$/,
      loader: `json`
    }, {
      test: /\.svg$/,
      loader: `svg-inline`
    }]
  }
};
