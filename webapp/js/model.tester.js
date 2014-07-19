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
		console.log("SETTING TESTS CLIENT SIDE");
		self.tests([]);
		for(var i = 0; i < newTests.length; i++) {
			self.tests.push(newTests[i]);
		}
	};

	self.clearTests = function() {
		self.tests([]);
	};

	self.run = function(callback) {
		console.log("RUNNING TESTS CLIENT SIDE");
		if (self.tests() && code) {
			var allPassed = true;
			for(var i = 0; i < self.tests().length; i++) {
				var pass = false;
				var result = null;
				try {
				    result = eval(makeCode(self.tests()[i]));
				    pass = result == self.tests()[i].getExpected();
				} catch (e) {
					pass = false;
					result = null;
				}
				allPassed = allPassed && pass;
				self.tests()[i].fails(!pass);
			}
			if (callback) {
				callback(allPassed);
			}
		}
	};

	self.setUserCode = function(userCode) {
		code = userCode;
	};

	self.getUserCode = function() {
		return code;
	};
}