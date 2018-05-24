var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Project = require('../models/project');
var leave = require('../models/leave');
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

router.get('/showManager',function(req, res,next){
  var emp = mongoose.model("User");
  emp.find({ 'type': 'manager' }, 'name _id', function(err, data){ 
    if (err) return next(err);
    return res.status(200).json({data});    
  });
});
router.get('/showLeaveApplication/:id',function(req, res,next){
  var emp = mongoose.model("applyleaves");
  console.log(req.params.id)
  emp.find({ 'applyTo': req.params.id },function(err, data){ 
    if (err) return next(err);
    return res.status(200).json({data});    
  });
});

router.get('/myLeave/:id',function(req, res,next){
  var emp = mongoose.model("applyleaves");
  console.log(req.params.id)
  emp.find({ 'employeeId': req.params.id },function(err, data){ 
    if (err) return next(err);
    return res.status(200).json({data});    
  });
});

router.post("/assignProject",function(req,res){
  assignProject(req,res);
});

router.post("/applyleave",function(req,res){
  applyleave(req,res);
});

router.put('/leaveAction/:id', function(req, res, next) {
  leave.findByIdAndUpdate(req.params.id, req.body.params,function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



//  async function showprojects(req,res,callback){
//   var projects=mongoose.model("employee_project");
//   projects.find({'employeeId':req.params.id},'projectId',async function(err,data){
//     var de=[],show;
//     if (err) return next(err);
//     for(let i=0; i<data.length;i++){
//     await showProjectDetails(data[i]['projectId'])
//     de.push(show);
//     console.log(de);
//     }
//     return de; 
//   })   
// }
// async function showProjectDetails(id,callback){
//   var projectDetails=mongoose.model("Project");
//   projectDetails.findById(id,function(err,post){
//   if (err) return next(err);
//   console.log("post "+post)
//   return post;

//   })
// }
router.get('/getAssignedProject/:id', async function(req,res){
  // var detail=[];
  // await showprojects(req,res);
  // console.log(detail)
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost";
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment");
  dbo.collection('employee_projects').aggregate([
    { $lookup:
      {
        from: 'projects',
        localField: 'projectId',
        foreignField: '_id',
        as: 'projectdetails'
      }
    }
  ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
    return res;
  });
});


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
async function applyleave(req, res) {
  var apply = new leave({
    employeeId: req.query.employeeid,
    leaveType: req.body.leaveType,
    fromDate: req.body.fromDate,
    fromSession : req.body.fromSession,
    toDate:req.body.toDate,
    tillSession:req.body.tillSession,
    applyTo:req.body.applyTo,
    status:req.query.status,
    appliedDate: Date.now()
  });

  try {
    doc =  apply.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

module.exports = router;
