// var ObjectID = require('mongodb').ObjectID;
'use strict';
var mongoose = require('mongoose'),
    Project = mongoose.model('Project'),
    User = mongoose.model('User');

function isUser(element, id){
  return element && (element.login == this || element.github_id == this);
}

function canEdit(project, user){
  return (user && ((user.github_id == project.lead.github_id) || (user.github_id == process.env.ADMIN)));
}

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
        .where('status').equals('active')
        .populate('lead', 'name username')
        .exec(function (err, projects) {
        if (err) return console.error(err);
        res.json(projects);
      });
    },
    admin: function(req, res, next){
      Project
        .find()
        .populate('lead', 'name username')
        .exec(function (err, projects) {
        if (err) return console.error(err);
        // res.json(projects);
        res.render('collaborate/admin.jade', {projects: projects});
      });
    },
    featured: function(req, res, next){
      Project.find({featured: true}, function (err, projects) {
        if (err) return console.error(err);
        res.json(projects);
      })
    },
    edit: function(req, res, next){
      Project.findOne({ slug: req.params.project }).populate('lead', '-email -token').exec(function(err, project){
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
                          canEdit: canEdit(project, req.user)
                        };
          if(canEdit(project, req.user)){
            res.render('collaborate/project/edit.jade', vars);
          } else {
            res.status(403).end();
          }
        }
      });
    },
    save: function(req, res, next){
      Project.where({slug: req.params.project}).update(req.body.project, function(){
          res.send();
      });
    },
    remove: function(req, res, next){
      Project.findOneAndRemove({slug: req.params.project }, function(){
        res.send();
      });
    },
    insert: function(req, res, next){
      var project = req.body.project;
      project.lead = [];
      project.lead.push(req.user._id);
      var p = new Project(project);
      p.save(function(){
        res.redirect('/projects/' + project.slug + '/edit');
      });
    },
    join: function(req, res, next){
      Project.findOne({ slug: req.params.project }).exec(function(err, project){
        if (err) return console.error(err);







         var args = (project.github.repo) ? {user: project.github.user } : {org: project.github.user},
              contributors = project.contributors || [];
          User.findOne({ github_id: req.user.github_id }).exec(function(err, user){
            contributors.push(req.user._id);
            project.contributors = contributors;
            project.save();
            res.send();
          })


          if(project.github.repo){
            args.repo = project.github.repo;
            if(req.body.star === 'true'){
              github.repos.star(args, function(err, r){
                if(err) console.log(err);
              });
            }
            if(req.body.fork === 'true'){
              github.repos.fork(args, function(err, r){
                if(err) console.log(err);
              });
            }
            args.title = req.user.name + ": new volunteer via Mozilla Science Lab Collaborate";
            args.body = req.body.text + "<p><br><blockquote>This issue was created by @" + req.user.github_id + " via <a href='http://collaborate.mozillascience.org'>Mozilla Science Lab Collaborate</a></blockquote></p>";
            args.labels = ['New Volunteer'];
            github.issues.create(args, function(err, r){
                if(err) console.log(err);
            });
          }








      });

    },
    get: function(req, res, next){
      Project.findOne({ slug: req.params.project }).populate('lead', '-email -token').populate('contributors', '-email -token').exec(function(err, project){
        if(!project){
          res.status(404).end();
        } else {
          if (err) return console.error(err);
          if(req.xhr) {
            res.json(project);
          } else {
              var args = (project.github.repo) ? {user: project.github.user } : {org: project.github.user},
                  vars = {
                            lead: project.lead.map(function(item){ return {name: item.name, username: item.username}}),
                            type: (project.github.repo) ? 'repo' : 'org',
                            loggedIn: !!req.user,
                            user: req.user,
                            project: project,
                            canEdit: canEdit(project, req.user)
                          };
              if(project.contributors) {
                vars.local_contrib = project.contributors;
                if(req.user){
                  var match = vars.local_contrib.filter(isUser, req.user.github_id);
                  if(match.length > 0) {
                    vars.member = true;
                    vars.canLeave = true;
                  }
                }
              }
              if(req.user) vars.user = req.user;
              if(project.github.repo) {
                args.repo = project.github.repo;
                github.repos.getContributors(args, function(err, r){
                  if(err) console.log(err);
                  if(r) vars.contributors = r;
                  args.path = '';
                  if(r && req.user){
                    var match = r.filter(isUser, req.user.github_id);
                    if(match.length > 0)  vars.member = true;
                  }
                  github.repos.getContent(args, function(err, r){
                    if(r) vars.content = r;
                    res.render('collaborate/project/project.jade', vars);
                  })
                });
              } else {
                github.orgs.getPublicMembers(args, function(err, r){
                  if(r) vars.contributors = r;
                  if(r && req.user){
                    var match = r.filter(isUser, req.user.github_id);
                    if(match.length > 0) {
                      vars.member = true;
                    }
                  }
                  github.repos.getFromOrg(args, function(err, r){
                    if(r) vars.content = r;
                    res.render('collaborate/project/project.jade', vars);
                  })
                });
              }

            }


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
                             { 'lead.github_id': regex },
                             // { contributors.name: regex },
                             // { contributors.github_id: regex },
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