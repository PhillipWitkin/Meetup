var net = require('net');
var fs = require('fs');

var server = net.createServer();

var meetup = JSON.parse(fs.readFileSync('./meetup.json'));

var RSVP_help = "To RSVP for the next meetup use three arguments: \nThe first argument should be RSVP, \nThe second argument should be the user name as a single word, \nwithout any internal spacing; use _ instead; ex: firstname_lastname, \nThe third argument should be the user email. \n"

var general_help = "To see the date and topic of the next meetup, enter 'event-date'.\nTo see how many developers are attending, enter 'attending'.\n"

var password = "hipster5490"

server.on('connection', function(client) {
  console.log("client connected");

  client.setEncoding('utf8');

  client.on('data', function(inputFromClient) {
    var cleanInputFromClient = inputFromClient.trim();

    var inputArray = cleanInputFromClient.split(" ");
    var command = inputArray[0] 
    
    var replyNames = []
    var replyEmails = []

    if (command === "event-date"){
      client.write("The next meetup is on " + meetup.admin.date + "\n");
      client.end();
    
    }else if (command === "attending"){
      var dateString = meetup.replies.length.toString();
      client.write(dateString + " attending next meetup.\n");
      // console.log(meetup.replies.length);
      client.end();
    
    }else if (command === "RSVP"){
      var inputName = inputArray[1];
      var inputEmail = inputArray[2];
      //Checking for duplicate emails / arguments
      function nameInUserArray(element, index, array){
        return element === inputName;
      };

      function nameInEmailArray(element, index, array){
        return element === inputEmail;
      };

      meetup.replies.forEach(function(entry){
        replyNames.push(entry.name)
      });

      meetup.replies.forEach(function(entry){
        replyEmails.push(entry.email)
      });
      // console.log(replyNames);

      if (replyEmails.some(nameInEmailArray) === false && inputArray.length === 3) { 

        newObject = {
          name: inputName,
          email: inputEmail
        }

        meetup.replies.push(newObject);
        var meetupToJson = JSON.stringify(meetup);
        fs.writeFileSync('./meetup.json', meetupToJson);

        client.write(inputName + " just submitted an RSVP \n");
        client.end();

      }else if (replyEmails.some(nameInEmailArray) === true) {
        client.write(inputName + " with email " + inputEmail + " already submitted an RSVP \n");
        client.end();

      }else {
        client.write(RSVP_help);
        client.end()

      };

    }else if (command === "admin"){

      if (inputArray[1] === password){
        // password protected administrator actions
        if (inputArray[2] === "set-date" && inputArray.length === 4){
          var newDate = inputArray[3];
          meetup.admin.date = newDate;
          client.write(newDate + " set as meetup date\n");

          var meetupToJson = JSON.stringify(meetup);
          fs.writeFileSync('./meetup.json', meetupToJson);
          client.end();


        }else if (inputArray[2] === "set-topic" && inputArray.length === 4){
          var newTopic = inputArray[3];
          meetup.admin.topic = newTopic;
          client.write(newTopic + " set as meetup topic" + " on " + meetup.admin.date + "\n");

          var meetupToJson = JSON.stringify(meetup);
          fs.writeFileSync('./meetup.json', meetupToJson);
          client.end();


        }else if (inputArray[2] === "clear-RSVP"){

          meetup.replies = [];
          client.write("All RSVP entries cleared\n")

          var meetupToJson = JSON.stringify(meetup);
          fs.writeFileSync('./meetup.json', meetupToJson);
          client.end();


        }else if (inputArray[2] === "list-attending"){
          meetup.replies.forEach(function(entry){
            client.write(entry.name + ", email: " + entry.email + "\n");
          })

        }else {
          client.write("Administrator request not recognized\n");
          client.end();
        };
      // no admin access 
      }else if (inputArray[1] !== password){
        client.write("Incorrect password\n");
        client.end();

      }else {
        client.write("Administrator request not recognized\n")
        client.end();
      };


    //other issue with public input format  
    }else {
      client.write("input not recognized. \n");
      client.write(general_help);
      client.write(RSVP_help);
      client.end();
    }



  });


});

server.listen(8124, function() {
  console.log("Server Listening on port 8124");
});
