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
        dealer_id: req.body.user_id,
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
 * Verify that room exists
 */
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
            callback(null, room)
            return true;
        }
    });
}

//Deal hands
//Either at start of game or start of each round, make sure all players have 7 cards.
//URL parameters
/*{
  "room_id": "XXXXXXXXXXXXXX",
  "card_color": "white"/"black"
}*/
exports.dealCards = function(req, res) {
    verifyRoom(req.body.room_id, function(err, room) {
        if (err) {
            respose.success = false;
            response.msg = err;
        } else {
            var player_cards = [];
            //Create list of cards in play
            for (var x = 0; x < room.cards.length; x++) {
                player_cards.push(room.cards[x].card_id);
            }
            //Create object of cards available for dealing
            Card.find({card_id: {$nin: player_cards}, card_type: req.body.card_color}, function(err, cards) {
                if (err) {
                    response.success = false;
                    response.msg = err;
                } else {
                    
                    //Get shuffled deck of new cards
                    var shuffled_cards = newCardsShuffled(cards);
                    //Using this cursor will simulate dealing from the top of the shuffled deck, down
                    var deal_cursor = 0;
                    //For each player in the room
                    room.players.forEach(function(player_i) {
                        //Count player's dealt cards
                        var playerCardCount = countPlayerCards(room, player_i._id, req.body.card_color, "dealt");
                        //Deal player cards until they have 7 cards
                        for (var x = playerCardCount; x < 7; x++) {
                            //Create obj of next card to be dealt
                            var card_to_deal = shuffled_cards[deal_cursor];
                            //Iterate dealer
                            deal_cursor++;
                            //Create playing card object
                            var playing_card = new PlayingCard({
                                owner_winner: player_i._id,
                                status: "dealt",
                                card_id: card_to_deal.card_id,
                                text: card_to_deal.card_text,
                                color: req.body.card_color
                            });
                            console.log(player_i.name + ' gets card with text "' + card_to_deal.card_text + '"');
                            room.cards.push(playing_card);
                        }
                    });
                    //Save room with newly dealt cards
                    room.save(function(err) {
                        if (err) {
                            console.log("Room Save Error: ");
                            console.log(err);
                        } else {
                            response.result = room;
                            response.success = true;
                            response.msg = "cards dealt";

                            res.jsonp(response);
                        }
                    });
                }
            });
        }
    });
};
//End Deal Cards

function newCardsShuffled(cards) {
    var new_cards = [];

    //Create list of card ids available for dealing
    cards.forEach(function(card_i) {
        new_cards.push(card_i.card_id);
    });
    //Shuffle card ids
    shuffle(new_cards);
    //Create array of shuffled card objects
    var shuffled_cards = [];
    for (var x = 0; x < new_cards.length; x++) {
        cards.forEach(function(card_obj) {
            if (new_cards[x] == card_obj.card_id)
            {
                shuffled_cards.push(card_obj);
            }
        });
    }
    return shuffled_cards;
}

//Shuffle list. This is the most efficient way to return a randomized list, as seen here http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }
    return array;
}

//Function countPlayerCards
/*{
  "room_id": "5312447715a6faae4e31abb3",
  "owner"
  "color"
}*/
function countPlayerCards(room, playerid, card_color, card_status) {
    var player_hand = [];
    for (var x = 0; x < room.cards.length; x++) {
        if (room.cards[x].owner_winner == playerid && room.cards[x].status == card_status && room.cards[x].color == card_color)
        {
            player_hand.push(room.cards[x].id);
        }
    }
    console.log(playerid+" has "+player_hand.length+" cards");
    return player_hand.length;
}

//Find next player
/*{
  "room_id": "5312447715a6faae4e31abb3",
}*/
exports.nextRound = function(req, res) {
    verifyRoom(req.body.room_id, function(err, room) {
        if (err) {
            respose.success = false;
            response.msg = err;
        } else {
            //Set the next player to be dealer
            var next_dealer = findNextDealer(room);
            //Deal card to next player (in the next sections)
            var player_cards = [];
            //Create list of cards in play
            for (var x = 0; x < room.cards.length; x++) {
                player_cards.push(room.cards[x].card_id);
            }
            //Create object of cards available for dealing
            Card.find({card_id: {$nin: player_cards}, card_type: "black"}, function(err, cards) {
                if (err) {
                    response.success = false;
                    response.msg = err;
                } else {
                    //Get shuffled deck of new cards
                    var shuffled_cards = newCardsShuffled(cards);
                    //Create new card object and push to room
                    var card_to_deal = shuffled_cards[0];
                    var playing_card = new PlayingCard({
                        owner_winner: "nowwinner",
                        status: "queued",
                        card_id: card_to_deal.card_id,
                        text: card_to_deal.card_text,
                        color: "black"
                    });
                    room.cards.push(playing_card);
                    //Set current dealer
                    room["dealer_id"] = next_dealer;
                    //Save room with new card and dealer
                    room.save(function(err) {
                        if (err) {
                            console.log("Room Save Error: ");
                            console.log(err);
                        } else {
                            response.result = room;
                            response.success = true;
                            response.msg = "cards dealt";

                            res.jsonp(response);
                        }
                    });
                }
            });
        }
    });
};

function findNextDealer(room) {
    //Grab current next_dealer
    var current_dealer = room["dealer_id"];
    console.log(current_dealer);
    //Grab list of players in the room
    var room_player_ids = [];
    room.players.forEach(function(player) {
        room_player_ids.push(player._id);
    });
    //Sort list of players
    room_player_ids.sort();
    //Find player ID of player after current dealer
    for (var x = 0; x < room_player_ids.length; x++) {
        if (room_player_ids[x] == current_dealer) {
            //Return next player
            x++;
            if (room_player_ids.length != x)
            {
                return room_player_ids[x];
            } else {
                //This captures if the current dealer is the last in the list, so reiterate
                return room_player_ids[0];
            }
        }
    }
}

//Edit a curently playing card
//URL
//Room ID
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
};

//Add a card to the room
//URL Structure - api/room/:room_id/addCard
//Example URL - api/room/5312447715a6faae4e31abb3/addCard
//JSON Parameters
/*{
  "card_id": "5312447715a6faae4e31abb3",
  "status" : "inplay"
  
}*/
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

//List all players in a room
//URL Structure - api/room/:room_id/players
//Example URL - api/room/5312447715a6faae4e31abb3/players
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