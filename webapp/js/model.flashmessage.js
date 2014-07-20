function FlashMessage(domId, delayTime) {
	var self = this;
	var element = document.getElementById(domId);
	var delay = delayTime;
	
	self.setMessage = function(str) {
		element.innerHTML = str;
	};

	self.flash = function() {
		$(element).fadeIn('slow').delay(delay).fadeOut('slow');
	}
}