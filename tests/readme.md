API Test Cases

List All Users  
URL:  
	localhost:8080/api/users/
	
List All Rooms  
URL:  
	localhost:8080/api/room/  
	
Find Room  
URL:  
	localhost:8080/api/room/:room_id
Required Vars:  
	URL Params:  
		room_id
	
Create Room  
Caveats:  
	Though not required, try to use a user ID that exists in the Users collection. View current users by requesting localhost:8080/api/users/  
Required Vars:  
	URL Params:  
		(none)  
	Body Params:  
		user_id  
		room_name  
		room_pass  
URL:  
	localhost:8080/api/room/create  
JSON in body:  
	{
		"user_id": "",
		"room_name": "",
		"room_pass": ""
	}  
	
Add Player to Room  
Caveats:  
	User ID must exist in users collection. View current users by requesting localhost:8080/api/users/  
	Room ID must exist in rooms collection. View current users by requesting localhost:8080/api/room/  
Required Vars:  
	URL Params:  
		(none)  
	Body Params:  
		user_id  
		room_name  
		room_pass  
URL:  
	localhost:8080/api/room/create  
JSON in body:  
	{
		"user_id": "",
		"room_id": ""
	}