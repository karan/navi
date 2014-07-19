function LoginViewModel() {
	var self = this;

	var cursor = new Blinker('logo-cursor', 500);
	self.tagline = new Typer('');

	var WORDS = ['code.', 'innovate.', 'invent.', 'launch.', 'pioneer.'];
	var wordIndex = 0;
	var wordInterval = null;

	var changeText = function() {
		var word = WORDS[wordIndex];
		self.tagline.write(word, 50);
		wordIndex++;
		if (wordIndex >= WORDS.length) {
			wordIndex = 0;
		}
	};

	self.login = function() {
		window.location = '/auth/facebook';
	}

	self.onSwitchTo = function(done) {
		// Do initialization on a new
		// switch
		cursor.start();
		wordInterval = setInterval(changeText, 2000);
		done();
	};

	self.onConnectedToSocket = function() {

	};
}