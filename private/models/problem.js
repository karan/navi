/*
  Schema for a problem.
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var problemSchema = new Schema({
  created_at: {
    // auto added user registration timestamp
    type: Date,
    default: Date.now
  },
  problem: String,
  tests: [String]
});


module.exports = mongoose.model('Problem', problemSchema);
