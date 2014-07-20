function FirePad(roomId, callbackVM) {
	var self = this;

	var ref = new Firebase('https://navi-code.firebaseio.com/room/' + roomId);

	var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
		lineNumbers: true,
		theme: 'tomorrow-night',
		mode: 'javascript'
	});

	var firepad = Firepad.fromCodeMirror(ref, codeMirror);

	firepad.on('ready', function() {
		console.log("FIREPAD READY");
		console.log(firepad);
		callbackVM();
	});

	self.setCode = function(code) {
		firepad.setText(code);
	};

	self.getCode = function() {
		return firepad.getText();
	};
}
