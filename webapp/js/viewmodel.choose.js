function ChooseViewModel() {
	var self = this;
	self.header = new ko.observable('Choose Page');

	self.onSwitchTo = function(done) {
		// Do initialization on a new
		// switch
		done();
	};
}