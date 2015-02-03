'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    WP = require( 'wordpress-rest-api' ),
    wp = new WP({ endpoint: 'http://mozillascience.org/wp-json' });



module.exports = function() {
   // Error messages
  var errorHandlers = {
    unauthorized: function () {
      var err = new Error('You must be logged in to access this area.');
      err.status = 401;
      return err;
    },
    forbidden: function () {
      var err = new Error('You are not authorized to access this area. If you think you are supposed to have permissions, try logging out and in again, or contact sciencelab@mozillafoundation.org');
      err.status = 403;
      return err;
    }
  };




  return {
    middleware: {
      hasPermissions: function(action){
        var user = req.sessions.user;

        if(!user) {
          return next(errorHandlers.unauthorized());
        }

        return next();
      }
    },
    getAll: function(req, res, next){
      User
        .find()
        .select('-email -token')
        .sort('username')
        .exec(function (err, users) {
          if (err) return console.error(err);
          res.json(users);
      });
    },
    get: function(req, res, next){
      var name = req.params.user.toLowerCase();
      User.findOne({ username: name }).select('-email -token').exec(function(err, u){
        if(!u){
          res.status(404).end();
        } else {
          if (err) return console.error(err);
          if(req.xhr) {
            res.json(u);
          } else {


            wp.posts().author( name ).get(function( err, posts ) {
                if ( err ) {
                    return console.log(err);
                }
                res.render('user.jade', {
                                        posts: posts,
                                        user: u})
            });
            // res.render('user.jade', { person: user})
          }
        }
      })
    },
    search: function(req, res, next){
      var query = req.params.query.replace(' ','\\s');
      var regex = new RegExp(query, 'gi')
      User.find( { $or: [ { name: regex},
                             { github_id: regex},
                             { username: regex},
                             { company: regex },
                             { location: regex } ] }, function(err, user){
        if (err) return console.error(err);
        res.json(user);
      })    }
  };

};