
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new Schema({
  employeeId:{type:ObjectId, require:true, ref: 'User'},
  leaveType: {type:String, require:true},
  fromDate: {type:Date, require:true},
  fromSession : {type:String, require:true},
  toDate:{type:Date, require:true},
  tillSession:{type:String, require:true},
  applyTo:{type:ObjectId, require:true,ref: 'User'},
  status:{type:String, require:true},
  appliedDate:{type:Date, require:true}
});

module.exports = mongoose.model('applyleaves',schema);