const fs = require('fs'); 
const csv = require('csv-parser');

const accountSid = process.env.TWILIO_ACCOUNT_SID || 'ACxx';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'xx';
const messagingService = process.env.TWILIO_MSG_SVC_SID ||'MGxx';
const client = require('twilio')(accountSid, authToken);

var inputFilePath = 'test-set.csv'

fs.createReadStream(inputFilePath)
.pipe(csv())
.on('data', function(data){
    try {
        console.log("Name is: "+data.NAME);
        console.log("Number is: "+data.NUMBER);
        console.log("Message is: "+data.MESSAGE);
        console.log("Schedule send is: "+data.SENDAT);
        if (data.SENDAT) twilioMessageSchedule(data.NUMBER, data.MESSAGE, data.SENDAT)
        if (! data.SENDAT)twilioMessageSchedule(data.NUMBER, data.MESSAGE)
        //perform the operation
    }
    catch(err) {
        console.log("error", err);
    }
})
.on('end',function(){
    console.log("finished");
});

function twilioMessageSchedule(number, message, sendMessageAt){
    if (sendMessageAt){
        client.messages
      .create({
         messagingServiceSid: messagingService,
         body: message,
         sendAt: sendMessageAt,
         scheduleType: 'fixed',
         to: number
       })
      .then(message => console.log(message.sid));
    } else {
        client.messages
      .create({
         messagingServiceSid: messagingService,
         body: message,
         to: number
       })
      .then(message => console.log(message.sid));
    }
}
    

