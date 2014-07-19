function CodeViewModel() {
	var self = this;
	var firePad = null;

	var setUpFirePad = function(done, problem) {
		// TODO: Problem will be a Problem object
		firePad = new FirePad(function() {
			setProblem(problem);
			done();
		});
	};

	var setUpFriend = function(done) {
		// TODO
		done();
	};

	var setUpRandom = function(done) {
		// TODO
		done();
	};

	self.setProblem = function(problem) {
		// TODO: make problem part of firePad
	};

	self.onSwitchTo = function(done, mode) {
		if (mode.type == MODE.FRIENDS) {
			setUpFriend(function(problem) {
				setUpFirePad(done, problem);
			});
		} else if (mode.type == MODE.RANDOM) {
			setUpRandom(function(problem) {
				setUpFirePad(done, problem);
			});
		} else {
			throw {name: 'FatalError', message: 'Unsupport mode'};
		}
	};
}
