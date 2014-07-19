function ChooseViewModel() {
	var self = this;
	var cursor = new Blinker('choose-title-cursor', 500);
	var facebook = new Facebook();
	self.title = new Typer('');
	self.myFriends = new ko.observableArray([]);
	self.isShowingChoices = new ko.observable(true);
	self.isShowingFriends = new ko.observable(false);

	self.onSwitchTo = function(done) {
		self.title.write('Choose your partner', 50);
		self.isShowingFriends(false);
		self.isShowingChoices(true);
		cursor.start();
		if (done) {
			done();
		}
	};

	self.onClickRandom = function() {
		cursor.stop();
		self.isShowingChoices(false);
		self.title.write('Loading...', 50);
		app.setScreen(SCREEN_TYPE.CODE, {'type' : MODE.RANDOM});
	};

	self.onClickFriends = function() {
		self.isShowingChoices(false);
		self.isShowingFriends(true);
		self.title.write('Checking friends online now...', 50);
		facebook.getFriendsOnline(function(friends) {
			if(friends.length > 0) {
				self.myFriends(friends);
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