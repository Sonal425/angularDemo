var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Project = require('../models/project');
var leave = require('../models/leave');
var status = require('../models/status');
var notifications = require('../models/notifications');
var employee_project =require('../models/employee_project');
var passport = require('passport');
var mongoose = require('mongoose');
var Promise = require('promise');

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
  adminLogin.find({}, function(err, data){ 
    return res.status(200).json({data});    
  });
});

router.get('/search',function(req, res,next){
  var user = mongoose.model("User");
  const keyword = new RegExp(req.query.keyword, 'i');
  user.find(
    {
      $and:[
      {"type":"employee"},
      {$or:[
        {"name": keyword},
        {"technology": keyword},
        {"email": keyword}
      ]}
    ]},
    function(err, userservices) { 
      if (err) return next(err);
      return res.json(userservices);
    }
  );
});

router.get('/showAllProjects',function(req, res,next){
  var project = mongoose.model("Project");
  project.find({}, function(err, data){  
    return res.status(200).json({data});    
  });
});
    
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

router.put('/editUser/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body,function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/getusers/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.get('/getNotifications/:id', function(req, res, next) {
  var notifications = mongoose.model("notifications");
  notifications.aggregate([
    { $lookup:{
      from:"users",
      localField:"from",
      foreignField:"_id",
      as:"sendBy" 
      } 
    },   
   { $lookup:{
      from:"users",
      localField:"to",
      foreignField:"_id",
      as:"sendTo" 
      } 
    }, 
    { $sort: {sentDate: -1 }}, 
    { $match : { 
        'to':  mongoose.Types.ObjectId(req.params.id)
      }
    }
  ]).exec().then(function(data) {
      return res.json(data)
    }).catch(function(err){
    console.log(err)
  })
});

router.get('/showEmployees',function(req, res,next){
  var emp = mongoose.model("User");
  emp.find({ 'type': 'employee' }, '_id email name technology', function(err, data){ 
    if (err) return next(err);
    return res.status(200).json({data});    
  });
});

router.get('/showManagers',function(req, res,next){
  var emp = mongoose.model("User");
  emp.find({ 'type': 'manager' }, 'name _id', function(err, data){ 
    if (err) return next(err);
    return res.status(200).json({data});    
  });
});

router.get('/showLeaveApplications/:id',function(req, res,next){
  var emp = mongoose.model("applyleaves");
  emp.aggregate([
    { 
      $lookup:{
        from:"users",
        localField:"employeeId",
        foreignField:"_id",
        as:"employee" 
      } 
    },   
    { $match : { 
      'applyTo':  mongoose.Types.ObjectId(req.params.id)
      }
    },
    { $sort: {fromDate: -1 }
    }
     ]).exec().then(function(data) {
      return res.json(data)
    }).catch(function(err){
      console.log(err)
  })
});

router.get('/myLeave/:id',function(req, res,next){
  var emp = mongoose.model("applyleaves");
  emp.aggregate([
  { $lookup:{
    from:"users",
    localField:"applyTo",
    foreignField:"_id",
    as:"manager" 
    } 
  },   
  { $match : { 
    'employeeId':  mongoose.Types.ObjectId(req.params.id)
    }
  },
  { $sort: {fromDate: -1 }
  }
  ]).exec().then(function(data) {
    return res.json(data)
  }).catch(function(err){
    console.log(err)
  })
});

router.get('/myStatus/:id',function(req, res,next){
  var status= mongoose.model("status");
  status.aggregate([
    { $lookup:{
        from:"users",
        localField:"to",
        foreignField:"_id",
        as:"manager" 
      } 
    },   
    { $match : { 
      'employeeId':  mongoose.Types.ObjectId(req.params.id)
      }
    },
    { $sort: {statusDate: -1 }
    }     
  ]).exec().then(function(data) {
      return res.json(data)
    }).catch(function(err){
        console.log(err)
      })
});

//   var emp = mongoose.model("status");
//   emp.find({ 'employeeId': req.params.id },null,{ sort:
//         {statusDate: -1 //Sort by Date Added DESC
//     }},function(err, data){ 
//     if (err) return next(err);
//     return res.status(200).json({data});    
//   });
// });
router.get('/allStatus/:id',function(req, res,next){
  var status = mongoose.model("status");
  status.aggregate([
    { $lookup:{
      from:"users",
      localField:"employeeId",
      foreignField:"_id",
      as:"employee" 
      } 
    },   
    { $match : { 
        'to':  mongoose.Types.ObjectId(req.params.id)
      }
    },
    { $sort: {statusDate: -1 }
    }     
  ]).exec().then(function(data) {
      return res.json(data)
    }).catch(function(err){
    console.log(err)
  })

  // emp.find({ 'to': req.params.id },null,{ sort:
  //       {statusDate: -1 //Sort by Date Added DESC
  //   }},function(err, data){ 
  //   if (err) return next(err);
  //   return res.status(200).json({data});    
  // });
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
    var emp = mongoose.model("applyleaves");
     emp.aggregate([
    { $lookup:{
      from:"users",
      localField:"employeeId",
      foreignField:"_id",
      as:"from" 
      } 
    },   
    { $lookup:{
      from:"users",
      localField:"applyTo",
      foreignField:"_id",
      as:"to" 
      } 
    },   
    { $match : { 
        '_id':  mongoose.Types.ObjectId(req.params.id)
      }
    }
  ]).exec().then(function(data) {
    addNotification(data[0].from[0]._id,data[0].to[0]._id,"has "+data[0].status+" your leave application", res);
      return res.json(data)
    }).catch(function(err){
    console.log(err)
  })

    // addNotification(,"has "+req.body.params.status+" your leave application")
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
  var myProjects = mongoose.model("employee_project");
  myProjects.aggregate([
    {$lookup:
      {
        from: 'projects',
        localField: 'projectId',
        foreignField: '_id',
        as: 'projectdetails'
      }
    },   
    { $match : { 
      'employeeId':  mongoose.Types.ObjectId(req.params.id)
      }
    }   
  ]).exec().then(function(data) {
    return res.json(data)
  }).catch(function(err){
    console.log(err)
  })
})

router.post("/sendStatus",function(req,res){
  sendStatus(req,res);
});



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
    addNotification(req.body.applyTo, req.query.employeeid,"has applied for the leave",res)
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}
async function sendStatus(req, res) {
  var Status = new status({
    employeeId: req.query.employeeid,
    to: req.body.to,
    statusDate: req.body.statusDate,
    inTime : req.body.inTime,
    outTime:req.body.outTime,
    breakTime:req.body.breakTime,
    type : req.body.type,
    projectName:req.body.projectName,
    workTime:req.body.workTime,
    status:req.body.status,
    task:req.body.task,
    creation_dt: Date.now()
  });

  try {
    doc =  Status.save();
    addNotification(req.body.to,req.query.employeeid,"has sent the status",res)
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
  
}
async function addNotification(to,from, message,res){
  var notify=new notifications({
     to: to,
     from: from,
     message:message,
     status:"unread",
     sentDate: Date.now()
  })
  try {
    doc =  notify.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

module.exports = router;
