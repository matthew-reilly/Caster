var app = angular.module('GroupCtrl', [], function() {})
app.controller('GroupController', function($scope, $http) {
    $scope.tagline = 'Nothing beats a pocket protector!';
    $scope.groupName2 = 'guest';
    $http.get('/api/groups').
    success(function(data, status, headers, config) {
        $scope.items = data;
    });

});
app.controller('GroupDetailController', function($scope, $http, $routeParams) {

    $scope.messages = new Array();

    $http.get('/api/room/' + $routeParams.groupId).
    success(function(data, status, headers, config) {
        if (data.success) {
            $scope.room = data.result;
            console.log("Room error: ");
        } else $scope.errorMsg = data.msg;
    });
    //this is where we get the details of the group. Cards played, cards dealt, etc.
    //$scope.groupId = $routeParams.groupId;
    //current card
    var socket = io.connect('http://localhost:8080');



    var room = "abc123";
 
	socket.on('connect', function() {
	   // Connected, let's sign-up for to receive messages for this room
	   socket.emit('room', room);
	});
	 
	socket.on('message', function(data) {
	   console.log('Incoming message:', data);
	   $scope.messages.push("test");
	   console.log($scope.messages);
	   $scope.$apply();
	   addCard();
	});


	var addCard = function() {

	 $http.get('/api/room/' + $routeParams.groupId + '/addCard').
	    success(function(data, status, headers, config) {
	        if (data.success) {
	            
	            console.log("Card added");
	        }
	    });

	}



    $scope.addMessage = function() {
         socket.emit('message', room); //emit to 'room' except this socket
        console.log("Room error: ");
    };
     socket.on('news', function(data) {
        console.log(data);
        socket.emit('my other event', {
            my: 'data'
        });
    });
    $scope.name = $scope.name;
    //played cards
    $scope.played;
});