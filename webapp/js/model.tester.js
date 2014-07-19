function Tester() {
	var self = this;
	var tests = [];
	var code = null;

	var START_FUNCTION = '(function test() {';
    var RETURN = ' return ';
	var END_FUNCTION = '})();';



	var makeCode = function(test) {
		console.log(test);
		return START_FUNCTION + 
				code + 
				RETURN +
				test.getTestExpression() +
				END_FUNCTION;
	};

	self.addTest = function(test) {
		tests.push(test);
	};

	self.clearTests = function() {
		tests = [];
	};

	self.run = function() {
		if (tests && code) {
			var results = [];
			for(var i = 0; i < tests.length; i++) {
				results.push(eval(makeCode(tests[i])) == tests[i].getExpected());
			}
			console.log(results);
		}
	};

	self.setUserCode = function(userCode) {
		code = userCode;
	};
}