var app = new AppViewModel();
ko.applyBindings(app, document.getElementById('app'));

var socket = io();
socket.on('connect', function(){
  socket.send('data', 'test');
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
});