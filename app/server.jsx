var express = require(`express`);
var app = express();


import React from 'react';

import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './react/routes.jsx';
import HTML from './index.jsx';


app.listen(process.env.PORT || 1818, () => {
  console.log(`Listening on port ${process.env.PORT || 1818}!`);
});

app.use(`/css`, express.static(`dist/css`));
app.use(`/assets`, express.static(`dist/assets`));
app.use(`/js`, express.static(`dist/js`));

app.get(`*`, (req, res) => {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var reactHTML = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);

      // We then wrap this "active" HTML code with a "passive" HTML wrapper,
      // so that we can serve pages that look right, but still end with a <script>
      // load instruction that sees the app bundle trying to hook into the
      // "active" HTML part of the page.
      var htmlWrapper = ReactDOMServer.renderToStaticMarkup(<HTML reactCode={reactHTML} />);

      // And to be good citizens of the web, we need a doctype, which React
      // cannot generate for us because exclamation points are funny.
      var doctype = `<!doctype html>`;

      // Finally, send a full HTML document over to the client
      res.status(200).type(`text/html`).send(doctype + htmlWrapper);
    } else {
      res.status(404).send(`Not found`);
    }
  });
});
