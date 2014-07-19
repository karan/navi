function FireChat(callbackVM) {
  var self = this;

  var ref = new Firebase('https://crackling-fire-3374.firebaseio.com/navi/chat/1');
  self.firechat = new Firechat(ref);
  firechat = self.firechat;
  self.firechat.setUser(1, 'Amit B.', function(user) {
    self.firechat.createRoom('1', 'public', function(roomId) {

    });
  });

  self.sendMessage = function(message) {
    self.firechat.sendMessage(message);
  };

  callbackVM();
}
