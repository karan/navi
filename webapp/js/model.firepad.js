function FirePad(roomId, callbackVM) {
	console.log(roomId);
	var self = this;

	var ref = new Firebase('https://crackling-fire-3374.firebaseio.com/navi/room/' + roomId);

	var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
		lineNumbers: true,
		theme: 'tomorrow-night',
		mode: 'javascript'
	});

	var firepad = Firepad.fromCodeMirror(ref, codeMirror);

	firepad.on('ready', function() {
		callbackVM();
	});

	self.setCode = function(code) {
		firepad.setText(code);
	};

	self.getCode = function() {
		return firepad.getText();
	};
}
