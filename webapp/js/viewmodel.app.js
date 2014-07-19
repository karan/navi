function AppViewModel(facebookUser) {
	var self = this;
	var user = facebookUser;

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

	self.setScreen = function(screen, optData) {
		if (!self.isAuthenticated()) {
			screen = SCREEN_TYPE.LOGIN;
		}
		var viewModel = screenTypeToVM(screen);
		viewModel.onSwitchTo(function() {
			self.currentScreen(screen);
		}, optData);
	};
}
