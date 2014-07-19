function Facebook() {
  var self = this;

  self.getUserData = function(callback) {
    $.getJSON('/user', function(data) {
      callback(data);
    })
  };

  self.connectToFriend = function(callback) {
    // See README.md
    $.getJSON("/start?option=friend", function(data) {
      callback(data);
    });
  };

  self.connectToRandom = function(callback) {
    // See README.md
    $.getJSON("/start?option=all", function(data) {
      callback(data);
    });
  };

  self.finalizeSession = function(user_solution, score, problem_session, callback) {
    // See README.md
    $.post("/finalize_session", {
        user_solution: user_solution, score: score, problem_session: problem_session
      }, function(data) {
        console.log("EMITTING END SESSION...");
        app.getSocket().emit('endSession');
        callback(data);
      });
  }
}
