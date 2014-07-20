var app = new AppViewModel(facebookUser);


ko.applyBindings(app, document.getElementById('app'));
if (app.isAuthenticated()) {
	app.setScreen(SCREEN_TYPE.CHOOSE);
} else {
	app.setScreen(SCREEN_TYPE.LOGIN);
}


var socket = io();
socket.on('connect', function(){

  // connect user to room called his id
  console.log("connecting user from client ");

  socket.emit('joinRoom', app.getUser()._id);

  // socket.send('data', 'test');
  // socket.on('event', function(data){});
  // socket.on('disconnect', function(){});

  socket.on('connectToGame', function(game) {
    console.log("I'm the other client " + socket);
    console.log("connecting to game session ");
    console.log(game);
    app.setScreen(SCREEN_TYPE.CODE, {'type' : MODE.RANDOM, 'game' : game});
  });

});
