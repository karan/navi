function LoginViewModel() {
	var self = this;

	var cursor = new Blinker('logo-cursor', 500);

	self.login = function() {
		window.location = '/auth/facebook';
	}

	self.onSwitchTo = function(done) {
		// Do initialization on a new
		// switch
		done();
	};

	cursor.start();
}