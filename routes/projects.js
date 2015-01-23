// var ObjectID = require('mongodb').ObjectID;
'use strict';
var mongoose = require('mongoose'),
    Project = mongoose.model('Project'),
    User = mongoose.model('User');

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
      Project
        .find()
        .populate('lead')
        .exec(function (err, projects) {
        if (err) return console.error(err);
        res.json(projects);
      });
    },
    featured: function(req, res, next){
      Project.find({featured: true}, function (err, projects) {
        if (err) return console.error(err);
        res.json(projects);
      })
    },
    get: function(req, res, next){
      Project.findOne({ slug: req.params.project }).populate('lead').exec(function(err, project){
        if (err) return console.error(err);
        if(req.xhr) {
          res.json(project);
        } else {
            var args = (project.github.repo) ? {user: project.github.user } : {org: project.github.user},
                vars = {
                          lead: project.lead.map(function(item){ return item.name}),
                          type: (project.github.repo) ? 'repo' : 'org',
                          loggedIn: !!req.user,
                          user: req.user,
                          project: project,
                        };
            if(project.contributors) {
              vars.local_contrib = project.contributors;
              if(req.user){
                var match = vars.local_contrib.filter(isUser, req.user.githubId);
                if(match.length > 0) {
                  vars.member = true;
                  vars.canLeave = true;
                }
              }
            }
            if(req.user) vars.user = req.user;
            // if(project.github.repo) {
            //   args.repo = project.github.repo;
              // github.repos.getContributors(args, function(err, r){
              //   if(err) console.log(err);
              //   if(r) vars.contributors = r;
              //   args.path = '';
              //   if(r && req.user){
              //     var match = r.filter(isUser, req.user.githubId);
              //     if(match.length > 0)  vars.member = true;
              //   }
              //   github.repos.getContent(args, function(err, r){
              //     if(r) vars.content = r;
                  res.render('collaborate/project/project.jade', vars);
                // })
              // });
            // } else {
            //   github.orgs.getPublicMembers(args, function(err, r){
            //     if(r) vars.contributors = r;
            //     if(r && req.user){
            //       var match = r.filter(isUser, req.user.githubId);
            //       if(match.length > 0) {
            //         vars.member = true;
            //       }
            //     }
            //     github.repos.getFromOrg(args, function(err, r){
            //       if(r) vars.content = r;
            //       res.render('collaborate/project/project.jade', vars);
            //     })
            //   });
            // }




        }
      })
    },
    search: function(req, res, next){
      var query = req.params.query.replace(' ','\\s');
      var regex = new RegExp(query, 'gi')
      Project.find( { $or: [ { slug: regex},
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
                             { slug: regex },
                             { whoIsGoingToUseThis: regex },
                             { dependencies: regex },
                             // { hoursyouspendonproject: regex },
                             {title: regex} ] }, function(err, project){
        if (err) return console.error(err);
        res.json(project);
      })    }
  };

};