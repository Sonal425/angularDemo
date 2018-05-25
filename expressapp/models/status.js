
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var ObjectId = mongoose.Schema.Types.ObjectId;
var schema = new Schema({
    to: {type:ObjectId, require:true},
    employeeId:{type:ObjectId, require:true},
    statusDate: {type:Date, require:true},
    inTime : {type:String, require:true},
    outTime:{type:String, require:true},
    breakTime:{type:String, require:true},
    type : {type:String, require:true},
    projectName:{type:String, require:true},
    workTime:{type:String, require:true},
    status:{type:String, require:true},
    task:{type:String, require:true},
    creation_dt:{type:Date, require:true}
});

module.exports = mongoose.model('status',schema);