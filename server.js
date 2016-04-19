var server = require(`pushstate-server`);

server.start({
  port: process.env.PORT || 1818,
  directory: `./dist`,
  file: `/index.html`
});
