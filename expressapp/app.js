var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var routes = require('./routes/index');
var userApi = require('./routes/userApi');
var cors= require('cors');
var app = express();
var port = 3003;
var Project = require('./models/project');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({

  origin:['http://localhost:4200','http://127.0.0.1:4200','*'],
  credentials:true
}));

var passport =require("passport");
var session= require("express-session");
app.use(session({
  name:'myname.sid',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
    maxAge:36000000,
    httpOnly:false,
    secure:false
  }  
}));

require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/userApi', userApi);

var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/assignment');


var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, '/home/rails/angular/assignment2/frontend/src/assets/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname+ "-"+Date.now());
  }
});

var upload = multer({ storage: storage });
// var upload = multer({ dest: './public/images/' })

app.post("/upload", upload.single("uploads[]"), function (req, res) {
 addToDB(req,res);
  res.send(req.file);
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
 async function addToDB(req, res) {
  console.log(req.body)
  var pro= JSON.parse(req.body.form);

  var project = new Project({
    title : pro.title,
    description:pro.des,
    clientName : pro.cname,
    projectType:pro.type,
    technology:pro.tech,
    image:req.file.filename,
    creation_dt: Date.now()
  });

  try {
    doc =  project.save();
    console.log(doc);
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

module.exports = app;
