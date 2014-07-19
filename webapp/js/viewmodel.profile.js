function ProfileViewModel() {
	var self = this;
	var cursor = new Blinker('profile-title-cursor', 500);
	self.title = new Typer('');


	self.onClickProfile = function() {
		// Nada?
	};

	self.onClickBack = function() {
		cursor.stop();
		app.setScreen(SCREEN_TYPE.CHOOSE);
	};

	self.onSwitchTo = function(done) {
		self.title.write('User Profile', 50);
		cursor.start()
		done();
	};
}