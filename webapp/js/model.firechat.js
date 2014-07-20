function FireChat(callbackVM) {
  var ref = new Firebase('https://crackling-fire-3374.firebaseio.com/navi/room/1');
  var firechat = new FirechatUI(ref, document.getElementById('firechat-container'));
  firechat.setUser('1', 'Amit B.');

  firechat.on('ready', function() {
    callbackVM();
  });
}
