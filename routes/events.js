'use strict';
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
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
        var event = req.sessions.event;

        if(!event) {
          return next(errorHandlers.unauthorized());
        }

        return next();
      }
    },
    getAll: function(req, res, next){
      Event
        .find({ _id: { $ne: null }})
        .populate('facilitators', '-email -token')
        .sort('-start')
        .exec(function (err, events) {
        if (err) return console.error(err);
        res.json(events);
      });
    },
    insert: function(req, res, next){
      if(req.body.event) {
        var event = req.body.event;
        Event.findOneAndUpdate({slug:event.slug}, event, {new:true, upsert:true, setDefaultsOnInsert:true}, function(err, event){
          res.redirect('/' + event.slug);
        })
      }
    },
    upcoming: function(req, res, next){
      Event
        .find({"end" : {$gt :  Date.now() }})
        .populate('facilitators', '-email -token')
        .sort('start')
        .limit(5)
        .exec(function (err, events) {
        if (err) return console.error(err);
        res.json(events);
      });
    },
    get: function(req, res, next){
      Event.findOne({slug: req.params.slug}).exec(function(err, ev){
        if(!ev){
          res.status(404).end();
        } else {
          if (err) return console.error(err);
          if(req.xhr) res.json(ev);
          var template = ev.template ? 'events/' + ev.template : 'event.jade';
          res.render(template, { ev:ev });
        }
      })
    },
    edit: function(req, res, next){
      Event.findOne({slug: req.params.ev}).exec(function(err, ev){
        if(!ev){
          res.status(404).end();
        } else {
          if (err) return console.error(err);
          if(req.xhr) res.json(ev);
          res.render('events/new.jade', { ev:ev });
        }
      })
    },
    attend: function(req, res, next){
      User.findOne({ username: res.locals.user.username }).exec(function(err, user){

        Event.findOne({ slug: req.params.slug }, function(err, ev){
          if(!ev.attending){
            ev.attending = [];
          }
          if(ev.attending.indexOf(user._id) == -1){
            ev.attending.push(user._id);
          }
          ev.save(function(err){
            res.redirect('/' + ev.slug);
          });
        });
      });
    },
    getPeople: function(req, res, next){
      Event.findOne({ slug: req.params.slug }).populate({ path: 'facilitators', select: '-email -token', options: { sort: 'username'}}).exec(function(err, ev){
        if(!ev){
          res.status(404).end();
        } else {
          if (err) return console.error(err);
          res.json(ev.facilitators);
        }
      })
    },
    getProjects: function(req, res, next){
      Event.findOne({slug: req.params.slug}).exec(function(err, ev){
        if(!ev){
          res.status(404).end();
        } else {
          Project.find({events: ev._id}).exec(function(err, projects){
            if(!projects){
              res.status(404).end()
            } else {
              res.json(projects);
            }
          });
        }
      })
    },
    getAttending: function(req, res, next){
      Event.findOne({ slug: req.params.slug }).populate({ path: 'attending', select: '-email -token', options: { sort: 'username'}}).exec(function(err, ev){
        if(!ev){
          res.status(404).end();
        } else {
          if (err) return console.error(err);
          res.json(ev.attending);
        }
      })
    },
    search: function(req, res, next){
      var query = req.params.query.replace(' ','\\s');
      var regex = new RegExp(query, 'gi')
      Event.find( { $or: [ { title: regex},
                             { when: regex},
                             { description: regex},
                             { where: regex },
                             { slug: regex } ] }, function(err, event){
        if (err) return console.error(err);
        res.json(event);
      })    }
  };

};