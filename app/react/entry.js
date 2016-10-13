var React = require(`react`);
var Router = require(`react-router`);
var Routes = require(`./routes.jsx`);

module.exports = function render(locals, callback) {
  Router.run(Routes, locals.path, (Handler) => {
    var html = React.renderToStaticMarkup(React.createElement(Handler, locals));

    callback(null, `<!DOCTYPE html>` + html);
  });
};
