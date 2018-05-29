var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new Schema({
  to:{type:ObjectId, require:true, ref: 'User'},
  from:{type:ObjectId, require:true,ref: 'User'},
  message: {type:String, require:true},
  status: {type:String, require:true},
  sentDate:{type:Date, require:true}
});

module.exports = mongoose.model('notifications',schema);