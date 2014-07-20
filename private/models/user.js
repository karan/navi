/*
  Schema for a user.
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// For any user
var userSchema = new Schema({
  created_at: {
    // auto added user registration timestamp
    type: Date,
    default: Date.now
  },
  accessToken: String,
  accessTokenSecret: String,
  photo: String,
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true // force email lowercase
  },
  name: String,
  fbId: String,
  score: Number,
  badges: [String],
  friends: [],
  online: Boolean,
  problems_solved: Number
});


module.exports = mongoose.model('User', userSchema);
