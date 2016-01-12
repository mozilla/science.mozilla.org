'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Badge Schema */

var badgeSchema = new Schema({
  title: String,
  image_url: String,
  description: String,
  link: String,
  slug: String
})

mongoose.model('Badge', badgeSchema);


/* Event Schema */

var eventSchema = new Schema({
  title: String,
  image_url: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  start: Date,
  end: Date,
  where: String,
  template: String,
  notes: String,
  facilitators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  attending: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  slug: String
})

eventSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.createdAt = Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

mongoose.model('Event', eventSchema);

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
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  status: String
});


projectSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.createdAt = Date.now();
    this.status = 'created';
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
  twitter_id: String,
  avatar_url: String,
  createdAt: Date,
  updatedAt: Date,
  token: String,
  company: String,
  featured: Boolean,
  status: String,
  bio: String,
  email: String,
  badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
  location: String,
  role: String,
  blog: String
})

userSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.createdAt = Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

mongoose.model('User', userSchema);
