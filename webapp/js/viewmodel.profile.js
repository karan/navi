function ProfileViewModel() {
	var self = this;
	var facebook = new Facebook();
	var cursor = new Blinker('profile-title-cursor', 500);
	self.title = new Typer('');
	self.points = new Typer('');

	self.onClickProfile = function() {
		// Nada?
	};

	self.onClickBack = function() {
		cursor.stop();
		app.setScreen(SCREEN_TYPE.CHOOSE);
	};

	self.onSwitchTo = function(done) {
		self.title.write(app.getUser().name, 50, function() {
			facebook.getUserData(function(data) {
				self.points.write('Score: ' + data.score, 50);
			});
		});
		cursor.start()
		done();
	};

	self.onConnectedToSocket = function() {

	};
}
