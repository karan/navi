function Typer(initalText) {
	var self = this;
	var typing = false;
	var typingQueue = [];
	self.text = new ko.observable(initalText);

	var writeOut = function(sentence, delay, callback) {
		if (sentence.length > 0) {
			self.text(self.text() + sentence.substring(0, 1));
			sentence = sentence.substring(1);

			if (sentence.length > 0) {
				setTimeout(function() {
								writeOut(sentence, delay, callback);
							}, delay);
			} else {
				typing = false;
				if (callback) {
					callback();
				}
				if (typingQueue.length > 0) {
					var item = typingQueue.shift();
					self.write(item.sentence, item.delay, item.callback);
				}
			}
		}
	};

	self.write = function(sentence, delay, callback) {
		if(typing) {
			// do it later
			typingQueue.push({
				'sentence' : sentence,
				'delay' : delay,
				'callback' : callback
			});
		} else {
			typing = true;
			self.text('');
			writeOut(sentence, delay, callback);
		}
	};
}