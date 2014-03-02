'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var response = require('../models/Response').response;
var Room = mongoose.model('room', RoomSchema);
var PlayingCard = mongoose.model('playcard', PlaycardSchema);
var Player = mongoose.model('player', PlayerSchema);
var User = mongoose.model('user', UserSchema);
var Card = mongoose.model('card', CardSchema);

var Response
/**
 * Create new room
 */
exports.create = function(req, res) {
    var room = new Room({
        name: req.body.room_name,
        pass: req.body.room_pass,
        status: "init",
        creator_id: req.body.user_id
        //players: [], //create method to add players
        //cards: [] //create method to deal cards
    });
    room.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.jsonp(room);
        }
    });
};

function verifyRoom(room_id, callback) {
    Room.findById(room_id, function(err, room) {
        if (err) {
            response.success = false;
            response.result = null;
            response.msg = "No room";
            console.log(err);
        }
        if (room == null) {
            console.log(2);
            response.msg = "No room found.";
            response.success = false;
        } else {
            console.log("found room");
            callback(null, room)
            return true;
        }
    });
}



//Add valid card
/*{
  "room_id": "5312447715a6faae4e31abb3",
  "color"
}*/



//Count player cards
/*{
  "room_id": "5312447715a6faae4e31abb3",
  "owner"
  "color"
}*/


//Replenish cards
//make sure we have 7 cards
/*{
  "room_id": "5312447715a6faae4e31abb3",
}*/


//Replenish cards
//make sure we have 7 cards
/*{
  "room_id": "5312447715a6faae4e31abb3",
}*/


//Find next player
/*{
  "room_id": "5312447715a6faae4e31abb3",
}*/



//Edit a curently playing card
//JSON
/*{
  "card_id": "5312447715a6faae4e31abb3",
  "status" : "inplay"
  
}*/
exports.editCard = function(req, res) {
    verifyRoom(req.params.room_id, function(err, room) {
        if (err) {
            //error occured above;
        } else {
            //success
            var card;
            for (var x = 0; x < room.cards.length; x++) {
                if (room.cards[x]._id == req.body.card_id) {
                    card = room.cards[x];
                    console.log(card);
                }
            }
            //edit card
            card["status"] = req.body.status;
         
            //save room
            room.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.jsonp(room);
                }
            });
            //console.log(room);
        }
    });
}
exports.addCard = function(req, res) {
    var cards = [];
    Room.findById(req.params.room_id, function(err, room) {
        if (err) {
            response.success = false;
            response.result = null;
            response.msg = "No room";
            console.log(err);
        }
        if (room == null) {
            console.log(2);
            response.msg = "No room found.";
            response.success = false;
        } else {
            var user = req.body.user_id;
            for (var x = 0; x < room.cards.length; x++) {
                cards.push(room.cards[x].id);
            }
            console.log(req.body);
            //find cards available 
            Card.find({
                _id: {
                    $nin: cards
                },
                card_type: "black"
            }, function(err, cards) {
                console.log(cards);
                if (err) {
                    console.log(err);
                }
                //console.log(room);
                var index = Math.floor((Math.random() * cards.length) + 1);
                //get one card
                var card = cards[index];
                //turn it into playing card
                var card1 = new PlayingCard({
                    owner_winner: user,
                    status: "active",
                    card_id: card.card_id,
                    text: card.card_text,
                    color: "white"
                });
                console.log(card1);
                //add to array
                room.cards.push(card1);
                //save
                room.save(function(err) {
                    if (err) {
                        console.log("Room Save Error: ");
                        console.log(err);
                    } else {
                        response.result = room;
                    }
                });
            });
        }
        res.jsonp(response);
    });
};
exports.findPlayers = function(req, res) {
    var players = {
        "players": []
    };
    Room.findById(req.params.room_id, function(err, room) {
        if (err) {
            response.success = false;
            response.result = null;
            response.msg = "No room";
            console.log(err);
        }
        if (room == null) {
            console.log(2);
            response.msg = "No room found.";
            response.success = false;
        } else {
            for (var x = 0; x < room.players.length; x++) {
                players.players.push(room.players[x].id);
            }
            response.success = true;
            response.result = players;
        }
        res.jsonp(response);
    });
};
/**
 * Create new room
 */
exports.create = function(req, res) {
    var room = new Room({
        name: req.body.room_name,
        pass: req.body.room_pass,
        status: "init",
        creator_id: req.body.user_id
        //players: [], //create method to add players
        //cards: [] //create method to deal cards
    });
    room.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.jsonp(room);
        }
    });
};
/**
 * Add new player
 */
exports.addplayer = function(req, res) {
    User.findById(req.body.user_id, function(err, user) {
        if (err) {
            console.log("User error: ");
            console.log(err);
        } else {
            Room.findById(req.body.room_id, function(err, room) {
                if (err) {
                    console.log("Room error: ");
                    console.log(err);
                } else {
                    //insert to room
                    var player = new Player({
                        user_id: req.body.user_id,
                        name: user.name,
                        status: "active",
                        turn_order: -1 //figure out good way to calculate turn order
                    });
                    room.players.push(player);
                    room.save(function(err) {
                        if (err) {
                            console.log("Room Save Error: ");
                            console.log(err);
                        } else {
                            res.jsonp(room);
                        }
                    });
                }
            });
        }
    });
};
/**
 * Return room by id
 */
exports.findone = function(req, res) {
    Room.findById(req.params.room_id, function(err, room) {
        if (err) {
            response.success = false;
            response.result = null;
            response.msg = "No room";
            console.log(err);
        }
        if (room == null) {
            console.log(2);
            response.msg = "No room found.";
            response.success = false;
        } else {
            console.log(3);
            response.success = true;
            response.result = room;
        }
        res.jsonp(response);
    });
};
/**
 * List of Rooms
 */
exports.all = function(req, res) {
    Room.find().exec(function(err, rooms) {
        if (err) {
            res.render(err);
        } else {
            res.jsonp(rooms);
        }
    });
};