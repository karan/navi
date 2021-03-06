function CodeViewModel() {
	var self = this;
	var firePad = null;
	var roomId = null;
	var game = null;
	var facebook = new Facebook();
	self.fireChat = null;

	var setUpFirePad = function(done, problem) {
		console.log("SETTING UP FIRE PAD");
		// TODO: Problem will be a Problem object
		firePad = new FirePad(roomId, function() {
			self.setProblem(problem);
			done();
		});
	};

	var setUpFireChat = function(done, info) {
		console.log("SETTING UP FIRE CHAT");
		self.fireChat = new FireChat(roomId, info, function() {
			$('#code').slideDown('slow');
			done();
		});
	};

	var setUpFriend = function(done) {
		console.log("SETTING UP FRIEND PROBLEM");
		var problem = new Problem(game.problem);
		self.tester.setTests(problem.tests);
		done(problem);
	};

	var setUpRandom = function(done) {
		console.log("SETTING UP RANDOM PROBLEM");
		var problem = new Problem(game.problem);
		self.tester.setTests(problem.tests);
		done(problem);
	};

	self.currentProblem = new ko.observable();
	self.tester = new Tester();
	self.runningTests = new ko.observable(false);
	self.friendUrl = new ko.observable('');

	self.onRunTestsClick = function() {
		if(!self.runningTests()) {
			console.log("EMITTING RUN TESTS");
			app.getSocket().emit('runTests', game, app.getUser()._id);
			self.runTester();
		}
	};

	var getFriendProfilePictureSrc = function() {
		return 'http://graph.facebook.com/' + game.users[1].fbId + '/picture?type=large&width=100&height=100';
	};

	self.runTester = function() {
		self.runningTests(true);
		self.tester.setUserCode(firePad.getCode());
		self.tester.run(function(allPassed) {
			self.runningTests(false);
			if (allPassed) {
				self.finishedProblem();
			}
		});
	};

	self.finishedProblem = function() {
		// TODO: Do some victory animation
		//
		facebook.finalizeSession(self.tester.getUserCode(), self.tester.testsPassed,  roomId, function() {
			$('#profile').slideDown('slow');
			app.setScreen(SCREEN_TYPE.PROFILE);
		});
	};

	self.setProblem = function(problem) {
		self.currentProblem(problem);
		firePad.setCode(problem.starterCode);
	};

	self.onSwitchTo = function(done, info) {
		console.log("SWITCHING TO CODE VIEW");
		roomId = info.game.problemsession;
		game = info.game;
		self.friendUrl(getFriendProfilePictureSrc());
		if (roomId && game) {
			if (info.type == MODE.FRIENDS) {
				setUpFriend(function(problem) {
					setUpFirePad(done, problem);
					setUpFireChat(done, info);
				});
			} else if (info.type == MODE.RANDOM) {
				setUpRandom(function(problem) {
					setUpFirePad(done, problem);
					setUpFireChat(done, info);
				});
			} else {
				throw {name: 'FatalError', message: 'Unsupport mode'};
			}
		} else {
			throw {name: 'FatalError', message: 'No problem session ID'};
		}
	};

	self.onConnectedToSocket = function() {
		app.getSocket().on('runMyTests', self.onRunTests);
	};

	self.onClickBack = function() {
		facebook.finalizeSession(self.tester.getUserCode(), self.tester.testsPassed,  roomId, function() {
			app.setScreen(SCREEN_TYPE.CHOOSE);
		});
	};


	self.onRunTests = function() {
		console.log("RUNNING TESTS FROM OTHER");
		self.runTester();
	};

	self.sendMessage = function(model, event) {
		self.fireChat.sendMessage(event.currentTarget.value);
		event.currentTarget.value = '';
	};
}
