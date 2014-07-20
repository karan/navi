function Blinker(domId, time) {
	var self = this;
	var blinkInterval = null;
	var blinkShow = false;
	var blinkCursor = function() {
		blinkShow = !blinkShow;
		if(blinkShow) {
			document.getElementById(domId).style.display = 'inline-block';
		} else {
			document.getElementById(domId).style.display = 'none';
		}
	};

	self.start = function() {
		blinkInterval = setInterval(blinkCursor, time);
	};

	self.stop = function() {
		clearInterval(blinkInterval);
	};
}