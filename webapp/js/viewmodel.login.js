function LoginViewModel() {
	var self = this;

	var blinkShow = false;
	var blinkCursor = function() {
		blinkShow = !blinkShow;
		if(blinkShow) {
			document.getElementById('blink').style.display = 'inline-block';
		} else {
			document.getElementById('blink').style.display = 'none';
		}
		setTimeout(blinkCursor, 500);
	};

	self.login = function() {
		// TODO: implement actual login
		// 
		app.setScreen(SCREEN_TYPE.CODE);
	}

	self.onSwitchTo = function(done) {
		// Do initialization on a new
		// switch
		done();
	};

	blinkCursor();
}