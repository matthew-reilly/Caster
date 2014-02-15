var mongoose = require('mongoose');

//USER MODEL

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , salt = 'mySaltyString'

//Create User schema
UserSchema = new Schema({
	user_id: { type: String, required: true, unique: true },
	name: { type:  String, required: true },
	joined_dt: { type: Date, default: Date.now }
}); 
 
var User = mongoose.model('user', UserSchema);