# Send SMS with Twilio using a CSV file

Excel? Export as CSV

## How to use this:
Point it to the right CSV (this one uses test-set.csv). Provide a Twilio Account SID, Auth Token, and a Messaging Service SID. 

To function: 
At a minimum it needs the number in e164 format and a body. 
To use schedule send, provide date in ISO8601 format.

`npm start`