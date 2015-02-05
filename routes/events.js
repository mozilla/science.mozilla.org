'use strict';
var mongoose = require('mongoose'),
    Event = mongoose.model('Event');



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
        .find()
        .populate('facilitators', '-email -token')
        .exec(function (err, events) {
        if (err) return console.error(err);
        res.json(events);
      });
    },
    get: function(req, res, next){
      Event.findOne({ slug: req.params.slug }).exec(function(err, ev){
        if(!ev){
          res.status(404).end();
        } else {
          if (err) return console.error(err);
          if(req.xhr) res.json(ev);

          res.render('event.jade', { ev:ev });
        }
      })
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