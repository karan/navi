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

	self.onConnectedToGameSession = function(game) {
	    console.log("I'm the other client " + socket);
	    console.log("connecting to game session ");
	    console.log(game);
	    app.setScreen(SCREEN_TYPE.CODE, {'type' : MODE.RANDOM, 'game' : game});
	};

	self.onClickRandom = function() {
		cursor.stop();
		self.isShowingChoices(false);
		self.title.write('Searching...', 50);
		facebook.connectToRandom(function(game) {
			self.title.write('Found! Loading...', 50);
			socket.emit('sessionConnected', game, MODE.RANDOM);
		});
	};

	self.onClickFriends = function() {
		self.isShowingChoices(false);
		self.title.write('Checking friends online now...', 50);
		facebook.connectToFriend(function(game) {
			if(game) {
				self.title.write('Found! Loading...', 50);
				socket.emit('sessionConnected', game, MODE.FRIENDS);
			} else {
				self.title.write('Sorry, no friends online', 50, function() {
					cursor.stop();
					self.onSwitchTo();
				});
			}
		});
	};


	self.onClickProfile = function() {
		cursor.stop();
		app.setScreen(SCREEN_TYPE.PROFILE);
	};


}
