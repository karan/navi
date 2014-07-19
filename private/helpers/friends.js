
// Gets friends who are online
//
// Example:
//
// require('./private/helpers/friends').getOnlineFriends([{id:234}], function (friends) {
//   console.log('friends:');
//   console.log(friends);
// });
module.exports.getOnlineFriends = function (friends, cb) {
  // Get all online users
  var User = require('../models/user');
  User.find({ online: true }, function (users) {
    var onlineFriends = [];
    for (var i in users) {
      var user = users[i];
      var userId = user.id;

      var isFriend = false;
      for (var j in friends) {
        var friend = friend[j];
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