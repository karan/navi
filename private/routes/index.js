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
};

exports.getProblem = function(req, res) {
  if (req.isAuthenticated()) {
    ProblemSession.findOne({
      $or: [
        {user1: req.user.id},
        {user1: req.user.id}
      ]
    }).sort('-created_at').exec(function (problem) {
      res.send(problem);
    });
  } else {
    res.send(401, {});
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


function processAndServePs(reqUser, friends, randProblem, callback) {
  var ps = {};
  var readyToReturn = false;

  for (var i = 0; i < friends.length; i++) {
    var thisFriend = friends[i];

    console.log(thisFriend.id + " -- " + reqUser.id + ' -- ' + (thisFriend.id === reqUser.id));

    if (thisFriend.id !== reqUser.id) {
      console.log("after if: " + thisFriend.id);
      ProblemSession.findOne({ $or:[
          {problem: randProblem.id, user1: reqUser.id, user2: thisFriend.id},
          {problem: randProblem.id, user1: thisFriend.id, user2: reqUser.id}
        ]}, function(err, ps) {
          // ps is the problem session where both users solved this problem
          if (!ps) {
            readyToReturn = true;
            new ProblemSession({
              problem: randProblem.id,
              user1: reqUser.id,
              user2: thisFriend.id,
              user_solution: ''
            }).save(function(err, newPS) {
              console.log("new ps saved = " + newPS);

              ps = {'problem': randProblem,
                    'users': [reqUser, thisFriend],
                    'problemsession': newPS.id};

              if (readyToReturn || i === friends.length - 1) {
                console.log("ending");
                callback(ps);
              }
            });
          } else {
            callback(ps);
          }
      });
    }
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
          randProblem = {'problem': 'abc', 'id': '123'};
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
        randProblem = {'problem': 'abc', 'id': '123'};
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
      User.find({'id': { $in: [ps.user1, ps.user2]}}, function(err, docs) {
        console.log(docs);
        if (err) res.send(500);
        docs[0].score += score;
        docs[1].score += score;
        docs[0].save(function(err, u) {
          if (err) res.send(500);
          docs[1].save(function(err, e) {
            if (err) res.send(500);
            res.send(200);
          });
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
