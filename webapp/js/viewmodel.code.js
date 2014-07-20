function CodeViewModel() {
	var self = this;
	self.header = new ko.observable('Code Page');
	new FirePad();
}
