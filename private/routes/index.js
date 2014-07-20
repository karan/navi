var User = require('./../models/user');
var Problem = require('./../models/problem');
var ProblemSession = require('./../models/problemsession');
var Friends = require('./../helpers/friends');
var request = require('request');


exports.index = function (req, res){
  if (req.isAuthenticated()) {
    return res.render('index', {user: req.user, userString: JSON.stringify(req.user)});
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
};


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

function commonPs(reqUser, thisFriend, randProblem, callback) {
  ProblemSession.findOne({ $or:[ 
      {problem: randProblem.id, user1: reqUser.id, user2: thisFriend.id}, 
      {problem: randProblem.id, user1: thisFriend.id, user2: reqUser.id}
    ]}, function(err, ps) {
      callback(ps);
    });
}

function savePs(randProblem, reqUser, thisFriend, callback) {
  new ProblemSession({
    problem: randProblem.id,
    user1: reqUser.id,
    user2: thisFriend.id,
    user_solution: ''
  }).save(function(err, newPS) {
    callback(newPS);
  });
}

function processAndServePs(reqUser, friends, randProblem, callback) {
  (function checkOne() {
    var thisFriend = friends.splice(0, 1)[0];
    if (thisFriend.id !== reqUser.id) {
      commonPs(reqUser, thisFriend, randProblem, function(ps) {
          // ps is the problem session where both users solved this problem
          if (!ps) {
            savePs(randProblem, reqUser, thisFriend, function(newPS) {
              return_struct = {'problem': randProblem,
                               'users': [reqUser, thisFriend],
                               'problemsession': newPS.id};
              
              if (return_struct != {}) {
                callback(return_struct);
              } else {
                checkOne();
              }
            });
          } else {
            callback({});
          }
      });
    }
  })();
}


exports.startSession = function(req, res) {
  var option = req.query.option;

  if (option === 'friend') {

    getFriends(req.user, function(user){
      Friends.getOnlineFriends(user.friends, function(friends) {
        // friends are users who are signed up, online and friends
        friends = require('./../helpers/shuffle').shuffle(friends);
        console.log("got friends = " + friends.length);
        nextRandomProblem(function(randProblem) {
          // DEBUG
          // randProblem = {'problem': 'abc', 'id': '123'};
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
      users = require('./../helpers/shuffle').shuffle(users);
      console.log("users =  " + users.length);
      nextRandomProblem(function(randProblem) {
        // DEBUG
        // randProblem = {'problem': 'abc', 'id': '123'};
        // DEBUG
        processAndServePs(req.user, users, randProblem, function(ps) {
          return res.send(ps);
        });
      });
    });

  }

}


exports.finalizeSession = function(req, res) {
  var user_solution = req.body.user_solution;
  var score = req.body.score;
  var psId = req.body.problem_session;

  ProblemSession.findById(psId, function(err, problemSession) {
    if (err) res.send(500);
    problemSession.user_solution = user_solution;
    problemSession.save(function(err, ps) {
      if (err) res.send(500);
      User.findById(ps.user1, function(err, user1) {
        if (err) res.send(500);
        User.findById(ps.user2, function(err, user2) {
          if (err) res.send(500);
          user1.score += score;
          user2.score += score;
          user1.save(function(err, u) {
            user2.save(function(err, u) {
              res.send(200, 'ok')
            })
          })
        });
      });
    });
  });
}


// get all users for the leaderboard
exports.leaderboard = function(req, res) {
  User.find({}, function(err, users) {
    res.send(200, users);
  });
}
