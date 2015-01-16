var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    path = require('path');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});


mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('connection!');
});

var models = require('./models.js')



// ROUTES
var routes = require("./routes");
var projectRoutes = routes.projects();

app.get('/', function(request, response) {
  response.render('index.jade');
});

app.get('/about', function(request, response) {
  response.render('about.jade');
});

app.get('/training', function(request, response) {
  response.render('training.jade');
});

app.get('/community', function(request, response) {
  response.render('community.jade');
});

app.get('/blog', function(request, response) {
  response.render('blog.jade');
});

app.get('/collaborate', function(request, response) {
  response.render('collaborate/collaborate.jade');
});

app.get('/collaborate/about', function(request, response) {
  response.render('collaborate/about.jade');
});

app.get('/projects/new', function(request, response) {
  response.render('collaborate/project/new.jade');
});


app.get("/projects/:project", projectRoutes.get);


app.get("/api/projects/featured", projectRoutes.featured);
app.get("/api/projects/:project", projectRoutes.get);
app.get("/api/projects", projectRoutes.getAll);

app.get("/api/projects/search/:query", projectRoutes.search);
