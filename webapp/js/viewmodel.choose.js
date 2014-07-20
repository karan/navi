function ChooseViewModel() {
	var self = this;
	var cursor = new Blinker('choose-title-cursor', 500);
	var facebook = new Facebook();
	self.title = new Typer('');
	self.isShowingFriends = new ko.observable(false);

	self.loadFriends = function(friends) {

	};

	self.onSwitchTo = function(done) {
		self.title.write('Choose your partner', 50);
		self.isShowingFriends(false);
		cursor.start();
		if (done) {
			done();
		}
	};

	self.onClickRandom = function() {
		cursor.stop();
		app.setScreen(SCREEN_TYPE.CODE, {'type' : MODE.RANDOM});
	};

	self.onClickFriends = function() {
		self.isShowingFriends(true);
		self.title.write('Checking friends online now...', 50);
		facebook.getFriendsOnline(function(friends) {
			if(friends.length > 0) {
				self.title.write('Choose a friend', 50);
			} else {
				self.title.write('Sorry, no friends online', 50, function() {
					cursor.stop();
					self.onSwitchTo();
				});
			}
		});
	};
}