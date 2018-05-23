var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Project = require('../models/project');
var employee_project =require('../models/employee_project');
var passport = require('passport');
var mongoose = require('mongoose');
var Promise = require('promise');
var Q=require('q');
router.post('/register', function (req, res, next) {
  addToDB(req, res);
});

router.post('/login',function(req,res,next){

  passport.authenticate('local', function(err, user, info) { 
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({user});
    });
  })(req, res, next);
});

router.get('/admin',function(req, res,next){
  var adminLogin = mongoose.model("User");
  var show;
  adminLogin.find({}, function(err, data){ 
    return res.status(200).json({data});    
  });
});

router.get('/showProject',function(req, res,next){
  var project = mongoose.model("Project");
  var show;
  project.find({}, function(err, data){  
    return res.status(200).json({data});    
  });
});
//  router.get('/register',function(req,res,next){
//   var auth;
//  if(! req.isAuthenticated()) 
//   auth="allowed";
//   else
//     auth="not"
// console.log(auth)
//   return res.json(auth);
// });
    
router.get('/logout', function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

router.delete('/admin', function(req, res, next) { 
  User.findByIdAndRemove(req.query.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/edit/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body,function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/getuser/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/showEmployee',function(req, res,next){
  var emp = mongoose.model("User");
  emp.find({ 'type': 'employee' }, '_id email name technology', function(err, data){ 
    if (err) return next(err);
    return res.status(200).json({data});    
  });
});

router.post("/assignProject",function(req,res){
  console.log(req)
  assignProject(req,res);
})

 async function showprojects(req,res,callback){
  var projects=mongoose.model("employee_project");
  projects.find({'employeeId':req.params.id},'projectId',async function(err,data){
    var de=[],show;
    if (err) return next(err);
    for(let i=0; i<data.length;i++){
    show= showProjectDetails(data[i]['projectId'])
    de.push(show);
    console.log(de);
    }
    callback(de); 
  })   
}
async function showProjectDetails(id,callback){
  var projectDetails=mongoose.model("Project");
  projectDetails.findById(id,function(err,post){
  if (err) return next(err);
  console.log("post "+post)
  callback(post);

  })
}
router.get('/getAssignedProject/:id',function(req,res){
  var detail=[];
  detail= showprojects(req,res);
  console.log(detail)
})


// router.get('/showAssignedProject',function(req,res,next){
//   var projects=mongoose.model("Project");
//   var projectid=[];
//   console.log(req.body)
//   projectid=req.body.params.projectid;
//  for(let i=0; i<projectid.length;i++){
//   projects.find({'_id':projectid[i]},function(err,data){
//     if (err) return next(err);
//     console.log(data)
//     return res.status(200).json({data});   
//   })
// }
// })

async function addToDB(req, res) {
  var user = new User({
    name:req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    type:req.body.type,
    technology:req.body.skills,
    creation_dt: Date.now()
  });

  try {
    doc =  user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}
 async function assignProject(req, res) {
  var assign = new employee_project({
    projectId: req.body.params.projectid,
    employeeId: req.body.params.employeeid
  });

  try {
    doc =  assign.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

module.exports = router;
