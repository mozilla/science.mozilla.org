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
    dotenv = require('dotenv'),
    aws = require('aws-sdk'),
    cookieParser = require('cookie-parser'),
    helpers = require('express-helpers')(),
    uuid = require('node-uuid');

dotenv.load();
passport = require('passport');        // user authentication
// LocalStrategy = require('passport-local').Strategy;
GitHubStrategy = require('passport-github').Strategy;

var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
var DISCOURSE = process.env.DISCOURSE;

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
// app.use(express.cookieParser());
// app.use(express.bodyParser());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.engine('html', require('ejs').renderFile);
app.use(session({
  store: new MongoStore({
    url: mongoUri
  }),
  secret: process.env.MONGO_SECRET || 'secret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.locals.loggedIn = true;
app.locals.moment = require('moment');
app.locals.marked = require('marked');

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
  req.session.cookie.path = req.originalUrl
  if(req.user && !req.user.status){
    req.logout();
  }
  res.locals.loggedIn = !!req.user;
  res.locals.user = req.user;
  next();
};

// ROUTES
var routes = require("./routes"),
    projectRoutes = routes.projects(),
    postRoutes = routes.posts(),
    userRoutes = routes.users(),
    eventRoutes = routes.events();


ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated) { return next(); }
  res.redirect('/auth/github');
}

requireAdmin = function (req, res, next) {
  if (req.user.role == 'admin') { return next(); }
  res.redirect('/');
}

app.get('/', localQuery, function(request, response) {
  response.render('index.jade');
});

app.get('/about', localQuery, function(request, response) {
  response.render('about.jade');
});

app.get('/code-of-conduct', localQuery, function(request, response) {
  response.render('coc.jade');
});

app.get('/education', function(request,response) {
  response.redirect('/training');
});

app.get('/training', localQuery, function(request, response) {
  response.render('training.jade');
});

app.get('/training/request_form', localQuery, function(request, response) {
  response.render('training/request.jade');
});

app.get('/training/confirm', localQuery, function(request, response) {
  response.render('training/confirm.jade');
});

app.get('/community', localQuery, function(request, response) {
  response.render('community.jade');
});

app.get('/u/:user', localQuery, userRoutes.get);
app.get('/u/:user/edit', localQuery, ensureAuthenticated, userRoutes.edit);

app.get('/sso', function(request, response) {
  var ref = request.session.ref = url.parse('https://forum.mozillascience.org/');
  var payload = request.query.sso;
  var sig = request.query.sig;

  if(sso.validate(payload, sig)) {

    request.session.nonce = sso.getNonce(payload);

    if(request.user) {

        var userparams = {
          nonce: request.session.nonce,
          external_id: request.user.github_id,
          email: request.user.email
        };

        response.redirect('https://forum.mozillascience.org/' + 'session/sso_login?' + sso.buildLoginString(userparams));
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

app.get('/fellows', localQuery, function(request, response) {
  response.render('fellows.jade');
});



app.get('/collaborate/dashboard', localQuery, ensureAuthenticated, requireAdmin, projectRoutes.admin);

app.get('/collaborate/about', localQuery, function(request, response) {
  response.render('collaborate/about.jade');
});

app.get('/projects/new', function(req, res){
  res.redirect('/projects/submit');
})

app.get('/toronto', function(req, res){
  res.redirect('/toronto-open-science-code-sprint-2015');
});

app.get('/projects/submit', localQuery, function(request, response) {
  response.render('collaborate/guidelines.jade');
});

app.get('/projects/create', localQuery, ensureAuthenticated, function(request, response) {
  response.render('collaborate/project/new.jade');
});

app.post('/projects', localQuery, projectRoutes.insert);

app.get("/projects/:project", localQuery, projectRoutes.get);
app.get("/projects/:project/edit", localQuery, projectRoutes.edit);
app.delete("/projects/:project", localQuery, ensureAuthenticated, projectRoutes.remove);

//redirection for the old project page links
app.get("/collaborate/projects/:project", function(req, res, next){
  res.redirect('/projects/' + req.params.project);
})
app.post("/projects/:project/save", localQuery, projectRoutes.save);

app.post("/projects/:project/join", localQuery, projectRoutes.join);

app.get("/api/users", userRoutes.getAll);
app.post("/api/users/create", userRoutes.create);

app.get("/api/users/:user", userRoutes.get);
app.delete('/api/users/:user', ensureAuthenticated, userRoutes.remove);
app.put('/api/users/:user', ensureAuthenticated, userRoutes.save);

app.get("/api/auth/orgs", ensureAuthenticated, userRoutes.getOrgs);
app.get("/api/auth/repos", ensureAuthenticated, userRoutes.getRepos);
app.get("/api/auth/repos/:org", ensureAuthenticated, userRoutes.getRepos);
app.get("/api/auth/projects", ensureAuthenticated, projectRoutes.getAllUser);

app.get("/api/projects/featured", projectRoutes.featured);
app.get("/api/projects/:project", projectRoutes.get);
app.get("/api/projects/:project/leave", ensureAuthenticated, projectRoutes.leave);
app.get("/api/projects", projectRoutes.getAll);

app.get("/api/events/:slug/attending", eventRoutes.getAttending);
app.get("/api/events/:slug/attend", localQuery, ensureAuthenticated, eventRoutes.attend);

app.get("/api/events/:slug/people", eventRoutes.getPeople);
app.get("/api/events/:slug/projects", eventRoutes.getProjects);

app.get("/api/events", eventRoutes.getAll);
app.get("/api/events/upcoming", eventRoutes.upcoming);

app.get("/blog", postRoutes.getAll);

app.get("/api/projects/search/:query", projectRoutes.search);
app.get("/api/users/badge/:badge", localQuery, ensureAuthenticated, userRoutes.badge);

app.get('/auth/github',
  passport.authenticate('github', { scope: 'public_repo user:email'}));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    var return_path = req.session.cookie.path || (req.headers && req.headers.referer) || '/';
    if(!req.user.status) {
      res.render('profile.jade', { user: req.user, loggedIn: !!req.user, return_path: return_path });
    } else {
      // res.redirect('http://forum.mozillascience.org/session/sso?return_path=' + return_path);
      res.redirect(return_path);
    }
  });

//logout
app.get('/logout', function(req, res){
  //http://stackoverflow.com/questions/13758207/why-is-passportjs-in-node-not-removing-session-on-logout
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});


app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_object_name = uuid.v1();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: s3_object_name,
        Expires: 60,
        ContentType: req.query.s3_object_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+s3_object_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});


app.get('/blog/:author', localQuery, postRoutes.author);

app.get('/feed', postRoutes.feed);
app.get('/rss', function(req, res){ res.redirect('/feed') });
app.get('/feed/rss', function(req, res){ res.redirect('/feed') });
app.get('/:slug', localQuery, postRoutes.get, eventRoutes.get);

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

      User.findOne({'github_id': profile.username}, function(err, user) {
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
            username: profile.username.toLowerCase(),
            email: profile._json.email,
            github_id: profile.username,
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


