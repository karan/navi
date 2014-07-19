function Problem(json) {
	console.log(json);
	var self = this;
	self.title = ko.observable(json.title);
	self.description = json.description + '\n';
	self.starterCode = json.starterCode;
	self.tests = [];
	for(var i = 0; i < json.tests.length; i++) {
		var test = new Test();
		test.setTestExpression(json.tests[i].code);
		test.setExpected(json.tests[i].expected);
		self.tests.push(test);
	}
};