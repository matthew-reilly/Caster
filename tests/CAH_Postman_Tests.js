{"id":"b78a6266-afb1-d972-43d4-b7aa08f27f62","name":"CastAgainstHumanity","timestamp":1392431425881,"requests":[{"collectionId":"b78a6266-afb1-d972-43d4-b7aa08f27f62","id":"34062aab-a64f-a2b1-6a72-e6bca789bd58","name":"Create Room","description":"user_id, room_name, room_pass","url":"localhost:8080/api/room/create","method":"POST","headers":"Content-Type: application/json\n","data":"{\n  \"user_id\": \"52fed739e233307e1af0b89c\",\n  \"room_name\": \"JaredsRoom\",\n  \"room_pass\": \"password\"\n}","dataMode":"raw","timestamp":0,"version":2,"time":1392433032346},{"collectionId":"b78a6266-afb1-d972-43d4-b7aa08f27f62","id":"ac6ec2de-7ef8-a4c6-6dab-b33498103147","name":"Add Player to Room","description":"user_id, room_id","url":"localhost:8080/api/room/addplayer","method":"POST","headers":"Content-Type: application/json\n","data":"{\n  \"user_id\": \"52fed739e233307e1af0b89c\",\n  \"room_id\": \"\"\n}","dataMode":"raw","timestamp":0,"version":2,"time":1392433041251},{"collectionId":"b78a6266-afb1-d972-43d4-b7aa08f27f62","id":"d9676025-1ee2-dbd6-eeb5-055dbc934f21","name":"FindRoom","description":"room_id","url":"localhost:8080/api/room/52fed8f0e821cd5421a6d968","method":"GET","headers":"","data":"","dataMode":"raw","timestamp":0,"version":2,"time":1392442153358}]}