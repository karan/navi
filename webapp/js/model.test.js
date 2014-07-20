function Test() {
	var self = this;

	var expected = null;
	var expression = null;

	self.setTestExpression = function(exp) {
		expression = exp;
	};

	self.getTestExpression = function() {
		return expression;
	};

	self.setExpected = function(value) {
		expected = value;
	};

	self.getExpected = function() {
		return expected;
	};
}