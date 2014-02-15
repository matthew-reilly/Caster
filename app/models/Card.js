var mongoose = require('mongoose');

//CARD MODEL

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , salt = 'mySaltyString'
 
//Create Card schema
CardSchema = new Schema({
	card_id: {type: Number, required: true, unique: true },
	card_text: { type:  String, required: true },
	card_type: { type:  String, required: true },
	special_type: { type: String },
	card_source: { type: String }
});
 
//Create Card model
var Card = mongoose.model('card', CardSchema);
