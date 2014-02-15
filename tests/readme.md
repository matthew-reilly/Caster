##API Test Cases

###List All Users
* URL
 * localhost:8080/api/users/
 
###Create User
* URL
 * localhost:8080/api/users/create
* Body Params
 * user_name
* JSON in body
```javascript
	{
		"user_name": "",
	}
```

###List All Rooms
* URL
 * localhost:8080/api/room/

###Find Room
* URL
 * localhost:8080/api/room/:room_id  
* URL Params
 * room_id

###Create Room
* URL
 * localhost:8080/api/room/create
* Caveats
 * Though not required, try to use a user ID that exists in the Users collection. View current users by requesting localhost:8080/api/users/  
* Body Params
 * user_id
 * room_name
 * room_pass
* JSON in body
```javascript
	{
		"user_id": "",
		"room_name": "",
		"room_pass": ""
	}
```

###Add Player to Room
* URL
 * localhost:8080/api/room/create
* Caveats
 * User ID must exist in users collection. View current users by requesting localhost:8080/api/users/
 * Room ID must exist in rooms collection. View current users by requesting localhost:8080/api/room/
* Body Params
 * user_id
 * room_name
 * room_pass
* JSON in body
```javascript
	{
		"user_id": "",
		"room_id": ""
	}
```
