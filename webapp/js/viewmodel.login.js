function LoginViewModel() {
	var self = this;

	var cursor = new Blinker('logo-cursor', 500);

	self.login = function() {
		// TODO: implement actual login
		// 
		cursor.stop();
		app.setScreen(SCREEN_TYPE.CODE, {'type' : MODE.RANDOM});
	}

	self.onSwitchTo = function(done) {
		// Do initialization on a new
		// switch
		done();
	};

	cursor.start();
}