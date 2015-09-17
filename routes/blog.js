// var ObjectID = require('mongodb').ObjectID;
'use strict';
require('es6-promise').polyfill();
require('isomorphic-fetch');

var WP = require( 'wordpress-rest-api' ),
    endpoint = 'http://wp.mozillascience.org/wp-json',
    wp = new WP({ endpoint: endpoint });

module.exports = function() {


  return {
    getAll: function(req, res, next){
      var page = req.params.page || 1,
          ep = endpoint + "/posts?page=" + page;
      fetch(ep)
        .then(function(res) {
          return res.json()
        }).then(function(json) {
          res.render('blog.jade', {loggedIn: !!req.user,
              posts: json,
              p: page,
              user : req.user || undefined})
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    },
    get: function(req, res, next){
      wp.posts().name( req.params.slug ).get(function( err, post ) {
          if ( err ) {
              return console.log(err);
          }
          if(post[0] && post[0].title){
            res.render('post.jade', {content: post})
          } else {
            next();
          }
      });
    },
    author: function(req, res, next){
      wp.posts().author( req.params.author ).get(function( err, posts ) {
          if ( err ) {
              return console.log(err);
          }
          res.render('blog.jade', {loggedIn: !!req.user,
                                  posts: posts,
                                  user : req.user || undefined,
                                  author: req.params.author})
      });
    },
    feed: function(req, res, next){
      wp.posts().get(function( err, posts ) {
          if ( err ) {
              return console.log(err);
          }
          res.header('Content-Type','application/rss+xml');
          res.render('rss.jade', {posts: posts});
      });
    }
  };

};