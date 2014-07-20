function Tester() {
	var self = this;
	var code = null;

	var START_FUNCTION = '(function test() {';
    var RETURN = ' return ';
	var END_FUNCTION = '})();';



	var makeCode = function(test) {
		return START_FUNCTION + 
				code + 
				RETURN +
				test.getTestExpression() +
				END_FUNCTION;
	};

	self.tests = new ko.observableArray([]);

	self.setTests = function(newTests) {
		for(var i = 0; i < newTests.length; i++) {
			self.tests.push(newTests[i]);
		}
	};

	self.clearTests = function() {
		self.tests([]);
	};

	self.run = function() {
		if (self.tests() && code) {
			for(var i = 0; i < tests.length; i++) {
				self.tests()[i].fails(eval(makeCode(self.tests()[i])) == self.tests()[i].getExpected());
			}
		}
	};

	self.setUserCode = function(userCode) {
		code = userCode;
	};
}