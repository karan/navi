var socket = io.connect();

socket.on('connectOther', function(game) {
  console.log('connect yo!!!');
});
