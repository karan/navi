var User = require('./../models/user');
var Problem = require('./../models/problem');
var ProblemSession = require('./../models/problemsession');
var Friends = require('./../helpers/friends');
var request = require('request');

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
      user.friends = body.data;
      user.save(function(err, newUser) {
        callback(newUser);
      });
    });
}

function nextRandomProblem(callback) {
  Problem.find({}, function(err, docs) {
    callback(docs[Math.floor(Math.random()*docs.length)]);
  });
}


function processAndServePs(reqUser, friends, randProblem, callback) {
  var ps = {};
  var processed = false;

  for (var i = 0; i < friends.length; i++) {
    console.log("looping - " + i);
    var thisFriend = friends[i];
//    User.findOne({fbId: thisFriend.fbId}, function(err, thisFriend) {
      if (thisFriend.fbId !== reqUser.fbId) {
        ProblemSession.findOne({ $or:[ 
            {problem: randProblem._id, user1: reqUser._id, user2: thisFriend._id}, 
            {problem: randProblem._id, user1: thisFriend._id, user2: reqUser._id}
          ]}, function(err, ps) {
            console.log("found ps = " + ps);
            // ps is the problem session where both users solved this problem
            if (!ps) {
              new ProblemSession({
                problem: randProblem._id,
                user1: reqUser._id,
                user2: thisFriend._id
              }).save(function(err, newPS) {
                console.log("new ps saved = " + newPS);

                ps = {'problem': randProblem,
                      'users': [reqUser, thisFriend],
                      'problemsession': newPS._id};
                processed = true;
                if (processed || i === friends.length - 1) {
                  console.log("ending");
                  callback(ps);
                }
              });
            } else {
              callback({});
            }
        });
      }
    // });
  }
}


exports.startSession = function(req, res) {
  var option = req.query.option;

  if (option === 'friend') {

    getFriends(req.user, function(user){
      Friends.getOnlineFriends(user.friends, function(friends) {
        // friends are users who are signed up, online and friends
        console.log("got friends = " + friends.length);
        nextRandomProblem(function(randProblem) {
          // DEBUG
          randProblem = {'problem': 'abc', '_id': '123'};
          // DEBUG
          processAndServePs(req.user, friends, randProblem, function(ps) {
            console.log("in cb = " + ps);
            return res.send(ps);
          });
        });
      });
    });

  } else {

    User.find({}, function(err, users) {
      console.log("user; " + users.length);
      nextRandomProblem(function(randProblem) {
        // DEBUG
        randProblem = {'problem': 'abc', '_id': '123'};
        // DEBUG
        processAndServePs(req.user, users, randProblem, function(ps) {
          return res.send(ps);
        });
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
