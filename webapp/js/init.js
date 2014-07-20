var app = new AppViewModel(facebookUser);
ko.applyBindings(app, document.getElementById('app'));
if (app.isAuthenticated()) {
	app.setScreen(SCREEN_TYPE.CHOOSE);
} else {
	app.setScreen(SCREEN_TYPE.LOGIN);
}
var socket = io();
socket.on('connect', function(){
  socket.send('data', 'test');
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
});