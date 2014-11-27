var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.get('/', function(request, response) {
  response.render('index.jade');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});





// ROUTES
app.get('/collaborate', function(request, response) {
  response.render('collaborate/collaborate.jade');
});

app.get('/collaborate/about', function(request, response) {
  response.render('collaborate/about.jade');
});

app.get('/about', function(request, response) {
  response.render('about.jade');
});

app.get('/education', function(request, response) {
  response.render('education.jade');
});

app.get('/community', function(request, response) {
  response.render('community.jade');
});

app.get('/blog', function(request, response) {
  response.render('blog.jade');
});