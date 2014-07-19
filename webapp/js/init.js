var app = new AppViewModel(facebookUser, function(app) {
	if (app.isAuthenticated()) {
	  	console.log("EMITTING JOIN ROOM...");
	  	app.getSocket().emit('joinRoom', app.getUser()._id);
		app.setScreen(SCREEN_TYPE.CHOOSE);
	} else {
		app.setScreen(SCREEN_TYPE.LOGIN);
	}
});
ko.applyBindings(app, document.getElementById('app'));