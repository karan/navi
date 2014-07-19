function ProblemBank() {
	var self = this;

	self.getRandomProblem = function(callback) {
		// implement
		var json = {
			'description' : 'this is your task.. blah blah',
			'starterCode' : 'function square(x) { //implement here }',
			'tests' : [
				{
					'code' : 'square(3);',
					'expected' : 9
				},
				{
					'code' : 'square(2);',
					'expected' : 4
				}
			]
		};
		var problem = new Problem(json);
		callback(problem);
	};
}