function AppViewModel() {
	var self = this;

	self.VM = {
		code : new CodeViewModel(),
		login : new LoginViewModel(),
		choose : new ChooseViewModel()
	};

	self.currentScreen = new ko.observable(SCREEN_TYPE.LOGIN);

	self.isCodeVisible = function() {
		return self.currentScreen() == SCREEN_TYPE.CODE;
	};

	self.isLoginVisible = function() {
		return self.currentScreen() == SCREEN_TYPE.LOGIN;
	};

	self.isChooseVisible = function() {
		return self.currentScreen() == SCREEN_TYPE.CHOOSE;
	};

	self.setScreen = function(screen) {
		self.currentScreen(screen);
	};
}