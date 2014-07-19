function AppViewModel(facebookUser, init) {
	console.log("APP STARTUP");
	var self = this;
	var user = facebookUser;
	var socket = io();

	self.VM = {
		code : new CodeViewModel(),
		login : new LoginViewModel(),
		choose : new ChooseViewModel(),
		profile : new ProfileViewModel()
	};

	var screenTypeToVM = function(screen) {
		var viewModel = null;
		switch(screen) {
			case SCREEN_TYPE.CODE:
				viewModel = self.VM.code;
				break;
			case SCREEN_TYPE.LOGIN:
				viewModel = self.VM.login;
				break;
			case SCREEN_TYPE.CHOOSE:
				viewModel = self.VM.choose;
				break;
			case SCREEN_TYPE.PROFILE:
				viewModel = self.VM.profile;
				break;
		}
		return viewModel;
	};

	self.currentScreen = new ko.observable('');

	self.isAuthenticated = function() {
		return user != null && user != {} && user.fbId;
	};

	self.getUser = function() {
		return user;
	};

	self.getSocket = function() {
		return socket;
	};

	self.getProfilePictureSrc = function() {
		if(self.isAuthenticated()) {
			return 'http://graph.facebook.com/' + self.getUser().fbId + '/picture?type=large';
		}
		return null;
	};

	self.isCodeVisible = function() {
		return self.currentScreen() == SCREEN_TYPE.CODE;
	};

	self.isLoginVisible = function() {
		return self.currentScreen() == SCREEN_TYPE.LOGIN;
	};

	self.isChooseVisible = function() {
		return self.currentScreen() == SCREEN_TYPE.CHOOSE;
	};

	self.isProfileVisible = function() {
		return self.currentScreen() == SCREEN_TYPE.PROFILE;
	};

	self.onConnectedToSocket = function() {
		console.log("CONNECTED TO SOCKET. APPLYING BINDINGS...");
		self.VM.code.onConnectedToSocket();
		self.VM.login.onConnectedToSocket();
		self.VM.choose.onConnectedToSocket();
		self.VM.profile.onConnectedToSocket();
	  	console.log("EMITTING JOIN ROOM...");
	  	app.getSocket().emit('joinRoom', app.getUser()._id);
		init(self);
	};

	self.setScreen = function(screen, optData) {
		if (!self.isAuthenticated()) {
			screen = SCREEN_TYPE.LOGIN;
		}
		var viewModel = screenTypeToVM(screen);
		viewModel.onSwitchTo(function() {
			self.currentScreen(screen);
		}, optData);
	};

	socket.on('connect', self.onConnectedToSocket);
}
