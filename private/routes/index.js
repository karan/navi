var User = require('./../models/user');
var Problem = require('./../models/problem');
var ProblemSession = require('./../models/problemsession');
var getOnlineFriends = require('./../helpers/friends');

exports.index = function (req, res){
  if (req.isAuthenticated()) {
    return res.render('index', {user: req.user});
  } else {
    return res.render('index');
  }
};


exports.authError = function(req, res) {
  res.redirect('/');
};


exports.authSuccess = function(req, res) {
  res.redirect('/');
};


// Main functions


// get details for logged in user
exports.getUser = function(req, res) {
  if (req.isAuthenticated()) {
    return res.send(200, req.user);
  } else {
    return res.send(401, {});
  }
}


function getFriends(user, callback) {
  request('https://graph.facebook.com/me/friends?limit=1000&access_token=' + user.accessToken,
    function(err, resp, body) {
      body = JSON.parse(body);
      user.friends = body.friends.data;
      user.save(function(err, user) {
        callback(user);
      });
    });
}

function nextRandomProblem(callback) {
  Problem.find({}, function(err, docs) {
    callback(docs[Math.floor(Math.random()*docs.length)]);
  });
}


function processAndServePs(req, friends, randProblem) {
  for (var i = 0; i < friends.length; i++) {
    var thisFriend = friends[i];
    User.findOne({fbId: thisFriend.id}, function(err, thisFriend) {
      if (thisFriend) {
        ProblemSession.find({ $or:[ 
            {problem: randProblem.problem, user1: req.user._id, user2: thisFriend._id}, 
            {problem: randProblem.problem, user1: thisFriend._id, user2: req.user._id}
          ]}, function(err, ps) {
            // ps is the problem session where both users solved this problem
            if (!ps) {
              new ProblemSession({
                problem: randProblem._id,
                user1: req.user._id,
                user2: thisFriend._id
              }).save(function(err, newPS) {
                return res.send({
                  'problem': randProblem,
                  'users': [req.user, thisFriend],
                  'problemsession': newPS._id
                });
              });
            }
        });
      }
    });
  }
  return res.send({});  // no user to match with
}


exports.startSession = function(req, res) {
  var option = req.query.option;

  if (option === 'friend') {

    getFriends(req.user, function(user){
      getOnlineFriends(user.friends, function(friends) {
        console.log("got friends = " + friends.length);
        nextRandomProblem(function(randProblem) {
          return processAndServePs(req, friends, randProblem);
        });
      });
    });

  } else {

    User.find({}, function(users){
      nextRandomProblem(function(randProblem) {
        return processAndServePs(req, users, randProblem);
      });
    });

  }
  
}


// submits the score for a thing
exports.submitScore = function(req, res) {
  var lang = req.body.lang;
  var score = +req.body.score;

  User.findById(req.user._id, function(err, user) {
    var newScore = user.levels[lang].scores + score;
    if (newScore >= 200) {
      newScore = 199;
    }
    req.user.levels[lang].scores = newScore;
    req.user.levels[lang].level = Math.floor(newScore/100) + 1;

    User.update({_id: req.user._id}, {$set: {levels: req.user.levels}}, 
      function(err, newUser) {
        console.log(req.user);
        res.send(200, req.user)
      });
  });

}


// get all users for the leaderboard
exports.leaderboard = function(req, res) {
  User.find({}, function(err, users) {
    res.send(200, users);
  });
}
