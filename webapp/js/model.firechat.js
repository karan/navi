function FireChat(roomId, info, callbackVM) {
  var self = this;

  self.sendMessage = function(message) {
    self.firechat.sendMessage(self.roomRoomId, message);
  };

  self.isPlayerOne = function(name) {
    return info.game.users[0].name === name;
  };

  var ref = new Firebase('navi-chat.firebaseIO.com/room/' + roomId);
  self.firechat = new Firechat(ref);
  firechat = self.firechat;

  self.firechat.on('message-add', function(r, event) {
    console.log(event);
    var name = $('<span/>', {
      class: self.isPlayerOne(event.name) ? 'chat-name-one' : 'chat-name-two',
      text: event.name + ':'
    });
    var message = $('<div/>', {
      class: 'chat-message',
      text: event.message
    });
    message.prepend(name);
    $('#firechat-container').append(message);
  });

  var simpleLogin = new FirebaseSimpleLogin(ref, function(err, user) {
    if (user) {
      self.firechat.setUser(user.id, app.getUser().name, function(user) {
        if (self.isPlayerOne(user.name)) {
          firechat.createRoom('room', 'public', function(r) {
            self.roomRoomId = r;
            firechat.enterRoom(self.roomRoomId);
          });
        } else {
          setTimeout(function() {
            firechat.getRoomList(function(r) {
              console.log(r);
              self.roomRoomId = Object.keys(r)[0];
              firechat.enterRoom(self.roomRoomId);
            });
          }, 500);
        }
      });
    } else {
      simpleLogin.login('anonymous');
    }
  });

  callbackVM();
}
