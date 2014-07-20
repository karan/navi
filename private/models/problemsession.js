/*
  Schema for a problem session.
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var problemSessionSchema = new Schema({
  created_at: {
    // auto added user registration timestamp
    type: Date,
    default: Date.now
  },
  problem: String,  // object id of problem
  user1: String,  // object id of user
  user2: String,
  user_solution: String,
  connected: Boolean  // whether or not the users are connected
});


module.exports = mongoose.model('ProblemSession', problemSessionSchema);
