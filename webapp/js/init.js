var app = new AppViewModel();
ko.applyBindings(app, document.getElementById('app'));

var socket = io();
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});