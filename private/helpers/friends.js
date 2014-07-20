
// Gets friends who are online
//
// Example:
//
// require('./private/helpers/friends').getOnlineFriends([{id:234}], function (friends) {
//   console.log('friends:');
//   console.log(friends);
// });

var User = require('./../models/user');

module.exports.getOnlineFriends = function (friends, cb) {
  // Get all online users
  User.find({ online: true }, function (err, users) {
    var onlineFriends = [];
    for (var i in users) {
      var user = users[i];
      var userId = user.fbId;

      var isFriend = false;
      for (var j in friends) {
        var friend = friends[j];
        var friendId = friend.id;
        if (userId === friendId) {
          isFriend = true;
        }
      }

      if (isFriend) {
        onlineFriends.push(user);
      }
    }
    cb(onlineFriends);
  });
};
