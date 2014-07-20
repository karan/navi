function ProfileViewModel() {
	var self = this;
	var facebook = new Facebook();
	var user = null;
	var cursor = new Blinker('profile-title-cursor', 500);
	self.title = new Typer('');
	self.points = new Typer('');

	facebook.getUserData(function(data) {
		user = data;
	});

	self.onClickProfile = function() {
		// Nada?
	};

	self.onClickBack = function() {
		cursor.stop();
		app.setScreen(SCREEN_TYPE.CHOOSE);
	};

	self.onSwitchTo = function(done) {
		self.title.write(app.getUser().name, 50, function() {
			self.points.write('Score: ' + user.score, 50);
		});
		console.log(app.getUser());
		cursor.start()
		done();
	};

	self.onConnectedToSocket = function() {

	};
}
