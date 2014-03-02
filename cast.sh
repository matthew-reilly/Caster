#!/bin/sh
# This script is used to run various commands to update and/or launch the node_server
# Must be ssh'd in to the server
# Execute script with /var/www/Caster/cast.sh or ./cast.sh from the /var/www/Caster/ folder

#If this generates the user id. It will be 0 if user has root access
uid="$(id -u)"

echo
echo "Syncing server to GitHub and launching server"

#Check for root
if [ "$uid" != 0 ]
then
	echo
    echo "root access required..."
fi

echo
sudo git pull
echo
echo "Starting HTTPS server..."
echo
sudo node server_https