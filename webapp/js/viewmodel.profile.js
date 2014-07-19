function ProfileViewModel() {
	var self = this;
	var cursor = new Blinker('profile-title-cursor', 500);
	var flashMessage = new FlashMessage('flash-message', 1000);
	self.title = new Typer('');


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
		self.title.write('User Profile', 50);
		cursor.start()
		done();
	};

	self.onConnectedToSocket = function() {

	};
}