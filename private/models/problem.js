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
  title: String,
  starterCode: String,  // description + starter code
  tests: Object,  // list of {"code" : "square(3);", "expected" : 9}
  solution: String
});


module.exports = mongoose.model('Problem', problemSchema);
