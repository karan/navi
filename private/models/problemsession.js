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
  problem: String,
  user1: String,
  user2: String
});


module.exports = mongoose.model('ProblemSession', problemSessionSchema);
