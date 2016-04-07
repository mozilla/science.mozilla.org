var server = require(`pushstate-server`);

server.start({
  port: 1818,
  directory: `./dist`,
  file: `/index.html`
});
