'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* Project Schema */

var projectSchema = new Schema({
  title: String,
  project_url: String,
  description: String,
  short_description: String,
  institute: String,
  github: { user: String,
            repo: String },
  wanted: [String],
  goals: [String],
  image_url: String,
  languages: [String],
  subjects: [String],
  contributors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  links: [{link: String, title: String}],
  lead: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: Date,
  updatedAt: Date,
  slug: String,
  featured: Boolean,
  license: String,
  hours: String,
  scientific_need: String,
  learning: String,
  status: String
});


projectSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.createdAt = Date.now();
    this.status = 'Submitted';
  }
  this.updatedAt = Date.now();
  next();
});


mongoose.model('Project', projectSchema);


/* User Schema */

var userSchema = new Schema({
  name: String,
  username: String,
  github_id: String,
  avatar_url: String,
  createdAt: Date,
  updatedAt: Date,
  token: String,
  company: String,
  email: String,
  location: String
})

userSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.createdAt = Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

mongoose.model('User', userSchema);
