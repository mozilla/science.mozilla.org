'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* Project Schema */

var projectSchema = new Schema({
  title: String,
  pageURL: String,
  description: String,
  tweetable: String,
  institution: String,
  github: { user: String,
            repo: String },
  wanted: [String],
  goals: [String],
  imageName: String,
  languages: [String],
  subjects: [String],
  contributors: [{ name: String,
                   gitHubId: String,
                   avatar_url: String }],
  moreinfo: [{link: String, title: String}],
  createdAt: Date,
  updatedAt: Date,
  route: String,
  whoIsGoingToUseThis: String,
  dependencies: String,
  hoursyouspendonproject: Number,
  featured: Boolean
});


projectSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.createdAt = Date.now();
  }
  this.updatedAt = Date.now();
  next();
});


mongoose.model('Project', projectSchema);


/* User Schema */

var userSchema = new Schema({
  name: String,
  gitHubId: String,
  avatar_url: String,
  createdAt: Date,
  updatedAt: Date
})

userSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.createdAt = Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

mongoose.model('User', userSchema);
