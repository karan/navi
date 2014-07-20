function AppViewModel() {
	var self = this;

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
		var viewModel = screenTypeToVM(screen);
		viewModel.onSwitchTo(function() {
			self.currentScreen(screen);
		}, optData);
	};
}