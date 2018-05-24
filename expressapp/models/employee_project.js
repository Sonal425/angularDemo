
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new Schema({
    projectId : {type:ObjectId, require:true},
    employeeId: {type:String, require:true}
});

module.exports = mongoose.model('employee_project',schema);