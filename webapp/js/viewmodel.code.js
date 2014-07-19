function CodeViewModel() {
	var self = this;
	var firePad = null;
	self.header = new ko.observable('Code Page');
	self.onSwitchTo = function(done) {
		// Do initialization on a new
		// switch
		firePad = new FirePad();
		done();
	};
}
