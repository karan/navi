function Facebook() {
  var self = this;

  self.connectToFriend = function(callback) {
    // See README.md
    $.getJSON("/start?option=friend", function(data) {
      console.log("EMITTING JOIN ROOM...");
      socket.emit('joinRoom', app.getUser()._id);
      callback(data);
    });
  };

  self.connectToRandom = function(callback) {
    // See README.md
    $.getJSON("/start?option=all", function(data) {
      console.log("EMITTING JOIN ROOM...");
      socket.emit('joinRoom', app.getUser()._id);
      callback(data);
    });
  };

  self.finalizeSession = function(user_solution, score, problem_session, callback) {
    // See README.md
    $.post("/finalize_session", {
        user_solution: user_solution, score: score, problem_session: problem_session
      }, function(data) {
        console.log("EMITTING END SESSION...");
        socket.emit('endSession');
        callback(data);
      });
  }
}
