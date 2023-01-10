let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const session = require('express-session');
/////////////////////////////////////
const {Server} = require("socket.io");
const http = require("http");
/////////////////////////////////////


let contactRouter = require('./routes/contact');
let loginRouter = require('./routes/login');
let registroRouter = require('./routes/registro');
let twitterRouter = require('./routes/twitter');
let chatRouter = require('./routes/chat');
let publicarRouter = require('./routes/publicacion');
let tablonRouter = require('./routes/tablon');
let modificarRouter = require('./routes/modificar');


let app = express();

///////////////////////////
const httpServer = http.createServer(app);
const io = new Server(httpServer);
io.on("connection", (socket) => {
  console.log("A new user has connected");
  socket.on("chat", (msg) => {
    console.log(msg);
    io.emit("chat", msg);
  });
  socket.on("disconnect",()=>{
    console.log("A user has disconnected");
  });
});
//////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'El secreto que queramos nosotros'
}));

app.use(function(req, res, next){
  let error = req.session.error;
  let message = req.session.message;
  delete req.session.error;
  delete req.session.message;
  res.locals.error = "";
  res.locals.message = "";
  if (error) res.locals.error = `<p>${error}</p>`;
  if (message) res.locals.message = `<p>${message}</p>`;
  next();
});

app.use('/contacto', restrict,contactRouter);
app.use('/', loginRouter);
app.use('/twitter', restrict,twitterRouter);
app.use('/registro',restictRegistro,registroRouter);
app.use('/logout', function(req, res, next){
  req.session.destroy(function(){
    res.redirect("/");
  })
});
app.use('/chat',restrict,chatRouter);
app.use('/publicacion',restrictRedactor,publicarRouter);
app.use('/tablon',restrict,tablonRouter);
app.use('/modificar',restrictModificar,modificarRouter);

function restrict(req, res, next){
  if(req.session.user){
    next();
  } else {
    req.session.error = "Unauthorized access";
    res.redirect("/");
  }
}

function restictRegistro(req, res, next){
  if(req.session.user){
    res.redirect("/tablon");
  } else {
    next();
  }
}

function restrictRedactor(req, res, next){
  if(req.session.rol==="redactor"){
    next();
  } else {
    req.session.error = "Unauthorized access";
    res.redirect("/");
  }
}
function restrictModificar(req, res, next){
  if(req.session.rol==="redactor" || req.session.rol==="admin"){
    next();
  } else {
    req.session.error = "Unauthorized access";
    res.redirect("/");
  }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app, httpServer};
