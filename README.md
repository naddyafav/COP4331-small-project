# COP4331-small-project
A simple contact manager

## Tech Stack:
* LAMP Stack: Linux, Apache, MySQL, PHP
* Version Control: GitHub/Git, URL: https://github.com/naddyafav/COP4331-small-project.git
* Server Hosting: DigitalOcean, IP: 64.225.30.70
* Domain Hosting: namecheap.com, Domain Name: group9.online
* Group Communication: Discord, Link: https://discord.gg/br4vSfkn

## Process for Updating Server Files
Note: All public facing files will go into the 'html' folder. HTML files will go into the 'html' folder, API files will go into the 'html/API' folder,  JavaScript files will go into the 'html/js' folder, and CSS files will go into the 'html/css' folder.
## Steps:
1. Get files uploaded to GitHub, in the correct folder location, and ready for the remote server.
2. On the remote server, pull main so that the server has all the updated files and is in sync with GitHub.
3. Once the repo on the server is up-to-date, run the bash command './deploy.sh' while still in the /var/www/COP4331-small-project repo location.
4. Done! All files that were added or updated should now be viewable by the browser.

## API Documentation:
### Search Endpoint:
Needs the following information:
* searchName
* userId

Returns:
* contactId
* firstName
* lastName
* phone
* email

### Delete Endpoint:
Needs the following information:
* contactId
* userId

### Add Endpoint:
Needs the following information:
* firstName
* lastName 
* phone 
* email 
* userId

### Update Endpoint:
Needs the following information:
* firstName
* lastName 
* phone 
* email 
* userId
* contactId

### Login Endpoint
Needs the following information:
* login
* password

Returns:
* userId
* firstName
* lastName

### Registration Endpoint:
Needs the following information:
* firstName
* lastName
* login
* password

## A.I. Usage Disclosure

A.I. was used in the creation of this website.

Team Member: Ben Andrew\
Tool: ChatGPT (GPT-5.2), OpenAI\
Date: \
Scope: \
Usage: 