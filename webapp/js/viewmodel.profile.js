function ProfileViewModel() {
	var self = this;
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
			self.points.write('Score: ' + app.getUser().score, 50);
		});
		console.log(app.getUser());
		cursor.start()
		done();
	};

	self.onConnectedToSocket = function() {

	};
}
