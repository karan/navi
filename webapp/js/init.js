var app = new AppViewModel();
ko.applyBindings(app, document.getElementById('app'));
if (facebookUser) {
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