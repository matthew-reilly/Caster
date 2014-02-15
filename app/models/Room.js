var mongoose = require('mongoose');

//ROOM MODEL

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , salt = 'mySaltyString'
 
//Create Player schema
PlayerSchema = new Schema({
	user_id: { type: String, required: true, unique: true },
	name: { type:  String, required: true },
	status: { type:  String, required: true },
	turn_order: { type: Number, required: true, unique: true },
	joined_dt: { type: Date, default: Date.now }
});

//Create Playcard schema

PlaycardSchema = new Schema({
	card_id: { type: String, required: true, unique: true },
	text: { type: String, required: true, unique: true },
	status: { type: String, required: true },
	color: { type: String, required: true },
	owner_winner: { type: String, required: true }
});

//Create Room schema
RoomSchema = new Schema({
	name: { type: String, required: true },
	pass: { type: String, required: true },
	status: { type: String, required: true },
	creator_id: { type: String, required: true },
	players: [PlayerSchema],
	cards: [PlaycardSchema],
	created_dt: { type: Date, default: Date.now }
});
 
//Create Player model
var Player = mongoose.model('player', PlayerSchema);
 
//Create Room model 
var Room = mongoose.model('room', RoomSchema);