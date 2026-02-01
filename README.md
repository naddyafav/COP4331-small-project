# COP4331-small-project
## API Documentation:
### Search Endpoint:
Needs the following information to be sent:
* Part of the first or last name of contact to search for
* User ID

Requests the following information about a contact from the database:
* Contact ID
* First Name
* Last Name
* Phone Number
* Email Address

If contact exists, API will send back a JSON file with headers:
* contactId
* firstName
* lastName
* phone
* email

### Delete Endpoint:
Needs the following information to be sent:
* Contact ID
* User ID

API will send back a message if contact was successfully deleted or not.
