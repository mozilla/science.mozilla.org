// var ObjectID = require('mongodb').ObjectID;
'use strict';
var WP = require( 'wordpress-rest-api' ),
    wp = new WP({ endpoint: 'http://mozillascience.org/wp-json' });

module.exports = function() {


  return {
    getAll: function(req, res, next){
      wp.posts().get(function( err, posts ) {
          if ( err ) {
              return console.log(err);
          }
          // res.json(posts);
          res.render('blog.jade', {loggedIn: !!req.user,
                                  posts: posts,
                                  user : req.user || undefined})
      });
    },
    get: function(req, res, next){
      wp.posts().name( req.params.slug ).get(function( err, post ) {
          if ( err ) {
              return console.log(err);
          }
          console.log(post);
          res.render('post.jade', {loggedIn: !!req.user,
                                  content: post,
                                  user : req.user || undefined})
      });
    }
  };

};