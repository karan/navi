function ChooseViewModel() {
	var self = this;
	var cursor = new Blinker('choose-title-cursor', 500);
	var facebook = new Facebook();
	self.title = new Typer('');
	self.isShowingChoices = new ko.observable(true);

	self.onSwitchTo = function(done) {
		self.title.write('Choose your partner', 50);
		self.isShowingChoices(true);
		cursor.start();
		if (done) {
			done();
		}
	};

	self.onConnectedToSocket = function() {
	   app.getSocket().on('connectToGame', self.onConnectedToGameSession);
	};

	self.onConnectedToGameSession = function(game, mode) {
		console.log("CONNECTED TO GAME SESSION");
		console.log("I'm the other client " + app.getSocket());
		console.log(game);
		cursor.stop();
		app.setScreen(SCREEN_TYPE.CODE, {'type' : mode, 'game' : game});
	};

	self.onClickRandom = function() {
		cursor.stop();
		self.isShowingChoices(false);
		self.title.write('Searching...', 50);
		facebook.connectToRandom(function(game) {
			self.title.write('Found! Loading...', 50);
			console.log("EMITTING SESSION CONNECT...");
			app.getSocket().emit('sessionConnected', game, MODE.RANDOM);
			app.setScreen(SCREEN_TYPE.CODE, {'type' : MODE.RANDOM, 'game' : game});
		});
	};

	self.onClickFriends = function() {
		cursor.stop();
		self.isShowingChoices(false);
		self.title.write('Checking friends online now...', 50);
		facebook.connectToFriend(function(game) {
			if(game) {
				self.title.write('Found! Loading...', 50);
				console.log("EMITTING SESSION CONNECT...");
				app.getSocket().emit('sessionConnected', game, MODE.FRIENDS);
				app.setScreen(SCREEN_TYPE.CODE, {'type' : MODE.FRIENDS, 'game' : game});
			} else {
				self.title.write('Sorry, no friends online', 50, function() {
					self.onSwitchTo();
				});
			}
		});
	};


	self.onClickProfile = function() {
		cursor.stop();
		app.setScreen(SCREEN_TYPE.PROFILE, true);
	};


}
