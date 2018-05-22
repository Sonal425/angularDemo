
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    projectId : {type:String, require:true},
    employeeId: {type:String, require:true}
});

module.exports = mongoose.model('employee_project',schema);