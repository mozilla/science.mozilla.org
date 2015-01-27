var express = require('express'),
    session = require('express-session'),
    app = express(),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoUri = process.env.MONGOLAB_URI
    || process.env.MONGOHQ_URL
    || 'mongodb://127.0.0.1:27017/test',
    dotenv = require('dotenv');

dotenv.load();
passport = require('passport');        // user authentication
// LocalStrategy = require('passport-local').Strategy;
GitHubStrategy = require('passport-github').Strategy;

var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
var DISCOURSE = process.env.DISCOURSE;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
// app.use(express.cookieParser());
// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
  store: new MongoStore({
    url: mongoUri
  }),
  resave: true,
  saveUninitialized: true,
  secret: process.env.MONGO_SECRET || 'secret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.locals.loggedIn = true;
app.locals.moment = require('moment');

var discourse_sso = require('discourse-sso');
var sso = new discourse_sso(process.env.SSOSECRET || 'abigail');
var url = require('url');

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});


mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('connection!');
});

var models = require('./models.js')

localQuery = function(req, res, next) {
  res.locals.loggedIn = !!req.user;
  res.locals.user = req.user;
  next();
};

// ROUTES
var routes = require("./routes");
var projectRoutes = routes.projects();
var postRoutes = routes.posts();

app.get('/', localQuery, function(request, response) {
  response.render('index.jade');
});

app.get('/about', localQuery, function(request, response) {
  response.render('about.jade');
});

app.get('/training', localQuery, function(request, response) {
  response.render('training.jade');
});

app.get('/community', localQuery, function(request, response) {
  response.render('community.jade');
});

app.get('/u/:username', localQuery, function(request, response) {
  response.render('user.jade');
});

app.get('/sso', function(request, response) {
  var ref = request.session.ref = url.parse('http://forum.mozillascience.org/');
  var payload = request.query.sso;
  var sig = request.query.sig;

  if(sso.validate(payload, sig)) {

    request.session.nonce = sso.getNonce(payload);

    if(request.user) {

        var userparams = {
          nonce: request.session.nonce,
          external_id: request.user.gitHubId,
          email: request.user.email
        };

        response.redirect('http://forum.mozillascience.org/' + 'session/sso_login?' + sso.buildLoginString(userparams));
    } else {
      // response.render('login.jade', { ref: ref.hostname });
      response.redirect('/auth/github');
    }
  } else {
    response.redirect(ref.href);
  }
});

app.get('/collaborate', localQuery, function(request, response) {
  response.render('collaborate/collaborate.jade');
});

app.get('/collaborate/about', localQuery, function(request, response) {
  response.render('collaborate/about.jade');
});


app.get('/projects/admin', localQuery, function(request, response) {
  response.render('collaborate/admin.jade');
});

app.get('/projects/new', localQuery, function(request, response) {
  response.render('collaborate/project/new.jade');
});


app.get("/projects/:project", localQuery, projectRoutes.get);
app.get("/projects/:project/edit", localQuery, projectRoutes.edit);
app.post("/projects/:project/save", localQuery, projectRoutes.save);

app.post("/projects/:project/join", localQuery, projectRoutes.join);

app.get("/api/projects/featured", projectRoutes.featured);
app.get("/api/projects/:project", projectRoutes.get);
app.get("/api/projects", projectRoutes.getAll);
app.get("/blog", postRoutes.getAll);

app.get("/api/projects/search/:query", projectRoutes.search);

app.get('/auth/github',
  passport.authenticate('github', { scope: 'public_repo'}));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    var return_path = req.session.cookie.path || (req.headers && req.headers.referer) || '/';
    res.redirect('http://forum.mozillascience.org/session/sso?return_path=' + return_path);
    // res.redirect(req.session.cookie.path || (req.headers && req.headers.referer) || '/');
  });

//logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/blog/:author', postRoutes.author);

app.get('/feed', postRoutes.feed);
app.get('/rss', function(req, res){ res.redirect('/feed') });
app.get('/feed/rss', function(req, res){ res.redirect('/feed') });
app.get('/:slug', postRoutes.get);

// Github
var GitHubApi = require("github");

github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    // debug: true,
    protocol: "https",
    host: "api.github.com",
    timeout: 5000
});

// OAuth2
if(GITHUB_TOKEN){
  github.authenticate({
      type: "oauth",
      token: GITHUB_TOKEN
  });
}

/* Github authentication */
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK || "http://localhost:5000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      profile.token = accessToken;
      github.authenticate({
        type: "oauth",
        token: accessToken
      });
      User = mongoose.model('User');

      User.findOne({'githubId': profile.username}, function(err, user) {
        if(err) { // OAuth error
          console.log(err);
          return done(err);
        } else if (user) { // User record in the database

          // update information from github
          user.avatar_url = profile._json.avatar_url;
          user.token = profile.token;
          user.company = profile._json.company;
          user.location = profile._json.location;
          user.email = profile._json.email;
          user.name = profile._json.name || profile.username;

          user.save();
          return done(null, user);
        } else { // record not in database
          var reg = new User({
            name: profile._json.name || profile.username,
            email: profile._json.email,
            githubId: profile.username,
            company: profile._json.company,
            location: profile._json.location,
            token: profile.token,
            avatar_url: profile._json.avatar_url
          });
          reg.save();
          return done(null, reg);
        }
      })
    });
  }
));


// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  if(obj){
    github.authenticate({
      type: "oauth",
      token: obj.token
    });
  }
  done(null, obj);
});


