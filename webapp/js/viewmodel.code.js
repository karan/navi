function CodeViewModel() {
	var self = this;
	var firePad = null;
	var problemBank = new ProblemBank();

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

	var setUpFriend = function(done) {
		// TODO
		problemBank.getRandomProblem(function(problem) {
			self.tester.setTests(problem.tests);
			done(problem);
		});
	};

	var setUpRandom = function(done) {
		// TODO
		problemBank.getRandomProblem(function(problem) {
			console.log(problem);
			self.tester.setTests(problem.tests);
			done(problem);
		});
	};

	self.currentProblem = new ko.observable();
	self.tester = new Tester();

	self.runTests = function() {
		self.tester.setUserCode(firePad.getCode());
		self.tester.run();
	};

	self.setProblem = function(problem) {
		// TODO: make problem part of firePad
		self.currentProblem(problem);
		firePad.setCode(problem.starterCode);
	};

	self.onSwitchTo = function(done, mode) {
		if (mode.type == MODE.FRIENDS) {
			setUpFriend(function(problem) {
				setUpFirePad(done, problem);
				setUpFireChat(done);
			});
		} else if (mode.type == MODE.RANDOM) {
			setUpRandom(function(problem) {
				setUpFirePad(done, problem);
				setUpFireChat(done);
			});
		} else {
			throw {name: 'FatalError', message: 'Unsupport mode'};
		}
	};
}
