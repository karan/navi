function CodeViewModel() {
	var self = this;
	var firePad = null;
	var facebook = new Facebook();
	var fireChat = null;

	var setUpFirePad = function(done, problem) {
		// TODO: Problem will be a Problem object
		firePad = new FirePad(function() {
			self.setProblem(problem);
			done();
		});
	};

	var setUpFireChat = function(done) {
		fireChat = new FireChat(function() {
			done();
		});
	};

	var setUpFriend = function(game, done) {
		// TODO
		var problem = new Problem(game.problem);
		self.tester.setTests(problem.tests);
		done(problem);
	};

	var setUpRandom = function(game, done) {
		// TODO
		var problem = new Problem(game.problem);
		self.tester.setTests(problem.tests);
		done(problem);
	};

	self.currentProblem = new ko.observable();
	self.tester = new Tester();

	self.runTests = function() {
		self.tester.setUserCode(firePad.getCode());
		self.tester.run();
	};

	self.setProblem = function(problem) {
		// TODO: make problem part of firePad
		console.log(problem);
		self.currentProblem(problem);
		firePad.setCode(problem.description + problem.starterCode);
	};

	self.onSwitchTo = function(done, info) {
		if (info.type == MODE.FRIENDS) {
			setUpFriend(info.game, function(problem) {
				setUpFirePad(done, problem);
				setUpFireChat(done);
			});
		} else if (info.type == MODE.RANDOM) {
			setUpRandom(info.game, function(problem) {
				setUpFirePad(done, problem);
				setUpFireChat(done);
			});
		} else {
			throw {name: 'FatalError', message: 'Unsupport mode'};
		}
	};

	self.sendMessage = function(model, event) {
		event.currentTarget.value = '';
	}
}
