// var ObjectID = require('mongodb').ObjectID;
'use strict';
var mongoose = require('mongoose'),
    Project = mongoose.model('Project');

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
      Project.find(function (err, projects) {
        if (err) return console.error(err);
        res.json(projects);
      })
    },
    get: function(req, res, next){
      Project.find({ route: req.params.project }, function(err, project){
        if (err) return console.error(err);
        res.json(project);
      })
    },
    search: function(req, res, next){
      var query = req.params.query.replace(' ','\\s');
      var regex = new RegExp(query, 'gi')
      Project.find( { $or: [ { route: regex},
                             { who: regex},
                             { what: regex},
                             { pageURL: regex },
                             { description: regex },
                             { tweetable: regex },
                             { institution: regex },
                             { 'github.user': regex },
                             { 'github.repo': regex },
                             { wanted: regex },
                             { goals: regex },
                             { imageName: regex },
                             { languages: regex },
                             { subjects: regex },
                             { 'lead.name': regex },
                             { 'lead.githubId': regex },
                             // { contributors.name: regex },
                             // { contributors.gitHubId: regex },
                             // { contributors.avatar_url: regex },
                             { moreinfo: regex },
                             { route: regex },
                             { whoIsGoingToUseThis: regex },
                             { dependencies: regex },
                             // { hoursyouspendonproject: regex },
                             {title: regex} ] }, function(err, project){
        if (err) return console.error(err);
        res.json(project);
      })    }
  };

};