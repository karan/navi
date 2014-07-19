function FireChat(info, callbackVM) {
  var self = this;

  var ref = new Firebase('navi-chat.firebaseIO.com');
  self.firechat = new Firechat(ref);
  firechat = self.firechat;

  self.firechat.on('message-add', function(roomId, event) {
    var name = $('<span/>', {
      class: 'chat-name',
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
        self.firechat.enterRoom('-JSHsoW-JQQbvFcB0zJX');
        // if (info.game.users[0].fbId === app.getUser().fbId) {
        //   firechat.createRoom('room', 'public', function(roomId) {
        //     self.roomId = roomId;
        //     firechat.enterRoom(roomId);
        //     // TODO: send roomId to other client
        //   });
        // } else {
        //   // TODO: get roomId from other client
        // }
      });
    } else {
      simpleLogin.login('anonymous');
    }
  });

  self.sendMessage = function(message) {
    // TODO: change to self.roomId
    self.firechat.sendMessage('-JSHsoW-JQQbvFcB0zJX', message);
  };

  callbackVM();
}
