'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Event = mongoose.model('Event'),
    Project = mongoose.model('Project'),
    Badge = mongoose.model('Badge'),
    WP = require( 'wordpress-rest-api' ),
    wp = new WP({ endpoint: 'http://wp.mozillascience.org/wp-json' });



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
        .find({featured:true})
        .select('-email -token')
        .sort('username')
        .exec(function (err, users) {
          if (err) return console.error(err);
          res.json(users);
      });
    },
    badge: function(req, res, next){
      User.findOne({ username: res.locals.user.username }).exec(function(err, user){

        Badge.findOne({ slug: req.params.badge }, function(err, badge){
          if(!user.badges){
            user.badges = [];
          }
          if(user.badges.indexOf(badge._id) == -1){
            user.badges.push(badge._id);
          }
          user.save(function(err){
            res.redirect('/u/' + user.username + '?badge=Mentor');
          });
        });
      });
    },
    create: function(req, res, next){
      User.findOne({ username: req.user.username }).exec(function(err, user){

        if(err || !user){
          return console.error(err);
        }
        user.status = "active";
        user.bio = req.body.bio;
        user.save();
        req.logout();
        res.send();

      });
    },
    get: function(req, res, next){
      var name = req.params.user.toLowerCase();

      //hardcoding my different blog vs github ids... so sad :(. Pls remember to remove later.
      if(name == 'abbycabs') name = 'acabunoc';

      User.findOne({ username: name }).select('-email -token').populate('badges', 'title').exec(function(err, u){
        if(!u){
          // res.status(404).end();
          res.redirect('//github.com/' + name)
        } else {
          if (err) return console.error(err);
          if(req.xhr) {
            res.json(u);
          } else {

            var badges = u.badges.map(function(item){ return item.title});
            // Find events for this User
            Event.find({ facilitators: u._id})
              .select('title slug')
              .sort('-start')
              .exec(function(err, events){
              if(err) return console.error(err);

              // Find projects for this user
              Project.find({ $and: [ { $or: [{lead: u._id}, {contributors: u._id}] }, { $or: [{status: "active"}, {status:"complete"}]}] }).select('title slug').exec(function(err, projects){
                  // Because I'm the only one who has a different wp login than github login....
                  // Remove when we switch to github blogging
                  var wp_name = (name === 'acabunoc') ? 'abbycabs' : name;
                  wp.posts()
                    .author( wp_name )
                    .filter( 'posts_per_page', 200 )
                    .get(function( err, posts ) {
                      if ( err ) {
                          return console.log(err);
                      }
                      res.render('user.jade', {
                                              posts: posts,
                                              projects: projects,
                                              badges: badges,
                                              events: events,
                                              person: u})
                  });
              });

            });
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