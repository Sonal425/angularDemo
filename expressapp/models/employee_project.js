
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new Schema({
    projectId : {type:ObjectId, require:true, ref: 'User'},
    employeeId: {type:ObjectId, require:true, ref: 'User'}
});

module.exports = mongoose.model('employee_project',schema);