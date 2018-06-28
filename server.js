var express = require(`express`);
var fallback = require(`express-history-api-fallback`);
var proxy = require(`http-proxy-middleware`);
var env = require(`./config/env.generated.json`);

var app = express();
var root = `${__dirname}/dist`;
var port = process.env.PORT || 1818

app.use([`/api`, `/admin`, `/static`, `/media`, `/auth`], proxy({target: env.SCIENCE_API, changeOrigin: true, xfwd: true}));

if(app.settings.env === `development`) {
  var reloadify = require(`reloadify`)(root);
  
  app.use(reloadify);
}

app.use(express.static(root));

app.use(fallback(`index.html`, { root: root }));

app.listen(port, () => {
  console.log(`listening on port 1818!`);
});
