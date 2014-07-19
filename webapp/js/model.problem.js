function Problem(json) {
	var self = this;
	self.description = ko.observable(json.description);
	self.starterCode = json.starterCode;
	self.tests = [];
	for(var i = 0; i < json.tests.length; i++) {
		var test = new Test();
		test.setTestExpression(json.tests[i].code);
		test.setExpected(json.tests[i].expected);
		self.tests.push(test);
	}
};