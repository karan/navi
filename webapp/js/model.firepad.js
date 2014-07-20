function FirePad() {
	var ref = new Firebase('https://crackling-fire-3374.firebaseio.com/navi/room/1');

	var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
		lineNumbers: true,
		mode: 'javascript'
	});

	var firepad = Firepad.fromCodeMirror(ref, codeMirror);

	firepad.on('ready', function() {
		if (firepad.isHistoryEmpty()) {
			firepad.setText('some initial text...');
		}
	});
}
