var app = new AppViewModel(facebookUser, function(app) {
	if (app.isAuthenticated()) {
		app.setScreen(SCREEN_TYPE.CHOOSE);
	} else {
		app.setScreen(SCREEN_TYPE.LOGIN);
	}
});
ko.applyBindings(app, document.getElementById('app'));