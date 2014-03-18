var mongoose = require('mongoose');

//CARD MODEL

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , Validations = require('./validations.js')
  , salt = 'mySaltyString'
  , SHA2 = new (require('jshashes').SHA512)()
 
 
 
var GroupSchema = new Schema({
    nick        : {type: String, required: true, unique: true, trim: true }
  , email       : {type: String, required: true, unique: true, trim: true, lowercase: true }
  , password    : {type: String, set: encodePassword, required: true }
});
 
 
mongoose.model('Group', GroupSchema);