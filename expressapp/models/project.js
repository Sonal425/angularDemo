
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    title : {type:String, require:true},
    description: {type:String, require:true},
    clientName : {type:String, require:true},
    projectType:{type:String, require:true},
    technology: {type:Array ,"default" : [], require:true},
    image:{type:String, require:true},
    creation_dt:{type:Date, require:true}
});

module.exports = mongoose.model('Project',schema);