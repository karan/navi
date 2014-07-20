var express = require('express'),
    http = require('http'),
    routes = require('./private/routes'),
    path = require('path'),
    db = require('./private/db/connect'),
    passport = require('passport'),
    auth = require('./private/auth'),
    Constants = require('./private/constants');

var app = express();
var RedisStore = require('connect-redis')(express);
var redis;

if (Constants.REDISTOGO_URL) {
  console.log("using redistogo");
  rtg   = require('url').parse(Constants.REDISTOGO_URL);
  redis = require('redis').createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(':')[1]); // auth 1st part is username and 2nd is password separated by ":"
} else {
  console.log("using local redis");
  redis = require("redis").createClient();
}

app.configure(function(){
  app.set('port', process.env.PORT || 8888);
  app.set('views', __dirname + '/webapp/html');
  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);
  app.use(express.static(path.join(__dirname, 'webapp')));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({
    secret: 'YOLO',
    store: new RedisStore({ client: redis })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

//
// Routes
//

// auth
app.get('/', routes.index);
app.get('/auth/facebook', passport.authenticate("facebook", {scope: ['email', 'user_friends']}));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/error' }),
  routes.authSuccess);
app.get('/auth/error', routes.authError);

// user
app.get('/user', routes.getUser);  // get logged in user

// session
// start a session
app.get('/start', auth.requiresLogin, routes.startSession);
// end a session
app.post('/finalize_session', auth.requiresLogin, routes.finalizeSession);


require('./private/pass.js')(passport);

var server = http.createServer(app);
// Connect to socket
var io = require('socket.io')(server);
var ProblemSession = require('./private/models/problemsession');
var clients = {};

io.sockets.on('connection', function (socket) {

  // Sets up the user data
  socket.on('sessionConnected', function (game) {
    console.log("connecting to other person");
    ProblemSession.findById(game.problemsession, function(err, ps) {
      console.log(JSON.stringify(ps));
      if (!ps.connected) {
        console.log("emit to client");
        socket.broadcast.emit('connectOther', game);
      }
    });
  });

});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
