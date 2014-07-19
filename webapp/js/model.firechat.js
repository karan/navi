function FireChat(info, callbackVM) {
  var self = this;

  self.sendMessage = function(message) {
    self.firechat.sendMessage(self.roomId, message);
  };

  self.isPlayerOne = function() {
    return info.game.users[0].fbId === app.getUser().fbId;
  };

  var ref = new Firebase('navi-chat.firebaseIO.com');
  self.firechat = new Firechat(ref);
  firechat = self.firechat;

  self.firechat.on('message-add', function(roomId, event) {
    var name = $('<span/>', {
      class: self.isPlayerOne() ? 'chat-name-one' : 'chat-name-two',
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
        if (self.isPlayerOne()) {
          firechat.createRoom('room', 'public', function(roomId) {
            self.roomId = roomId;
            firechat.enterRoom(roomId);
            // TODO: send roomId to other client
          });
        } else {
          // TODO: get roomId from other client
        }
      });
    } else {
      simpleLogin.login('anonymous');
    }
  });

  callbackVM();
}
