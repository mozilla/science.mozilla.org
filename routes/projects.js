// var ObjectID = require('mongodb').ObjectID;
'use strict';
var mongoose = require('mongoose'),
    Project = mongoose.model('Project'),
    Event = mongoose.model('Event'),
    User = mongoose.model('User');

function isUser(element, id){
  return element && (element.login == this || element.github_id == this);
}

function canEdit(project, user){
  var lead = false;
  if (user) project.lead.map(function(item){ if(item.github_id == user.github_id) lead = true});
  return (user && (lead || (user.role == 'admin')));
}

function removeUser(array, id){
  var match = array.filter(isUser, id);
  if(match){
    array.splice(array.indexOf(match[0]), 1);
  }
  return match;
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
        .sort('-updatedAt')
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
            if(!canEdit(project, req.user)){
              var status = req.user ? 403 : 401;
              res.render('status/' + status + '.jade');
            } else {
              Event.find()
                .select('title _id')
                .exec(function(err, events){
                var args = (project.github.repo) ? {user: project.github.user } : {org: project.github.user},
                    vars = {
                              lead: project.lead.map(function(item){ return item.name}),
                              type: (project.github.repo) ? 'repo' : 'org',
                              loggedIn: !!req.user,
                              user: req.user,
                              project: project,
                              canEdit: canEdit(project, req.user),
                              events: events
                            };
                res.render('collaborate/project/edit.jade', vars);
              });
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
      if(req.body.project){
        var project = req.body.project;
        project.lead = [];
        project.lead.push(req.user._id);
        var p = new Project(project);
        p.save(function(){
          res.redirect('/projects/' + project.slug + '/edit');
        });
      } else {
        var full_name = req.body.full_name.split('/'),
            user = full_name[0],
            r = full_name[1];
        github.repos.get({user: user, repo: r}, function(err, repo){
          var project = {
            slug: user + '-' + r,
            github: { user: repo.owner.login,
                      repo: repo.name },
            project_url: repo.homepage || repo.html_url,
            title: repo.description || r,
            short_description: repo.description,
            status: "started",
            lead: [req.user._id],
            institute: req.user.company
          };

          github.repos.getContent({user:repo.owner.login, repo:repo.name, path:'README.md'}, function(err, file){
            if(err) console.error(err);
            if(file){
              var b = new Buffer(file.content, 'base64')
              var content = b.toString();
              project.description = content;
            }
            var p = new Project(project);
            p.save(function(){
              res.redirect('/projects/' + project.slug + '/edit');
            })
          });
        });
      }
    },
    leave: function(req, res, next){
      Project.findOne({ slug: req.params.project }).exec(function(err, project){
        if (err) return console.error(err);
        if(project.contributors){
          removeUser(project.contributors, req.user.githubId);
          project.save(function(){
            res.send();
          })
        }else{
          res.send();
        }


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
      var pop = '-token';
      if(!(req.user && req.user.role == 'admin')) {
        pop += ' -email';
      }
      Project
        .findOne({ slug: req.params.project })
        .populate('lead', pop)
        .populate('events', 'slug title')
        .populate('contributors', '-email -token')
        .exec(function(err, project){
        if(!project){
          req.xhr ? res.status(404).end() : res.render('status/404.jade');
          return;
        } else {
          if (err) return console.error(err);
          if(!(project.status == 'active' || project.status == 'complete')){
            if(!req.user || (!canEdit(project, req.user))){
              var status = req.user ? 403 : 401;
              req.xhr ? res.status(status).end() : res.render('status/' + status + '.jade');
              return;
            }
          }
          if(req.xhr) {
            res.json(project);
          } else {
              var args = (project.github.repo) ? {user: project.github.user } : {org: project.github.user},
                  vars = {
                            lead: project.lead.map(function(item){ return {name: item.name, username: item.username, email: item.email}}),
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
    getAllUser:function(req,res,next){
      var id = req.user._id;
      Project.find({$or:[{lead:id}, {contributors:id}]})
        .populate('lead', 'name username')
        .exec( function(err, projects){
          if(err) return console.error(err);
          res.json(projects);
      });
    },
    search: function(req, res, next){
      var query = req.params.query.replace(' ','\\s');
      var regex = new RegExp(query, 'gi')
      Project.find( { $or: [ { slug: regex},
                             { short_description: regex},
                             { description: regex},
                             { project_url: regex },
                             { institute: regex },
                             { 'github.user': regex },
                             { 'github.repo': regex },
                             { wanted: regex },
                             { goals: regex },
                             { languages: regex },
                             { subjects: regex },
                             { 'lead.name': regex },
                             { 'lead.github_id': regex },
                             { 'links.link': regex },
                             { 'links.title': regex },
                             { title: regex },
                             { license: regex } ] }).where('status').equals('active').populate('lead', 'name username').exec(function(err, project){
        if (err) return console.error(err);
        res.json(project);
      })    }
  };

};