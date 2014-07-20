function ProfileViewModel() {
	var self = this;
	var facebook = new Facebook();
	var cursor = new Blinker('profile-title-cursor', 500);
	var flashMessage = new FlashMessage('flash-message', 1000);
	self.title = new Typer('');
	self.points = new Typer('');
	self.solved = new Typer('');

	self.onClickProfile = function() {
		// Nada?
	};

	self.onClickBack = function() {
		cursor.stop();
		app.setScreen(SCREEN_TYPE.CHOOSE);
	};

	self.onSwitchTo = function(done, newData) {
		if(newData) {
			flashMessage.setMessage('Congratulations! You have increased your score!');
			flashMessage.flash();
		}
		self.title.write(app.getUser().name, 50, function() {
			facebook.getUserData(function(data) {
				self.points.write('Score: ' + data.score, 50, function() {
					self.solved.write('Problems Solved: ' + data.problems_solved, 50);
				});
			});
		});
		cursor.start()
		done();
	};

	self.onConnectedToSocket = function() {

	};
}
