/* handle client's texts to service/phone# */

function inboundHandler(req, res, next, Message, client){

  let from = req.body.From;       //client phone number
  let to = req.body.To;           //twilio phone number
  let body = req.body.Body;
  /* determine whether conversation is new or continuing by searching DB for phone number */
  Message.find({phoneNumber: from}, (err, message) => {
    /* create custom error for database search fail */
    if(err){
      var error = new Error('database error:\n\tin /inbound route:\n\t\t' + err);
      error.status = 500;
      next(error);
    }
    /* if phone number found, continuing conversation */
    else if(message.length !== 0){
      /* After first reply - add groupName - prompt for number of adults */
      if(!message[0].groupName && !message[0].totalAdults && !message[0].totalKids){
        Message.findByIdAndUpdate(message[0]._id, {"$set": {"groupName": body}}, {"new":true, "upsert":true}, () => {
          client.messages.create({
            to: from,
            from: to,
            body: 'How many adults in your group?'
          });
          res.end();
        });
        /* After second reply - add number of adults - prompt for number of kids */
      } else if(!message[0].totalAdults && !message[0].totalKids){
        Message.findByIdAndUpdate(message[0]._id, {"$set": {"totalAdults": body}}, {"new":true, "upsert":true}, () => {
          client.messages.create({
            to: from,
            from: to,
            body: 'How many kids in your group?'
          });
          res.end();
        });
      } else if(!message[0].totalKids){
        Message.findByIdAndUpdate(message[0]._id, {"$set": {"totalKids": body}}, {"new":true, "upsert":true}, () => {
          client.messages.create({
            to: from,
            from: to,
            body: 'Your spot has been reserved!'
          });
          res.end();
        });
      }
    }
    /* else, create new conversation */
    else {
      /* create entry into db */
      console.log(body.toUpperCase());
      if(body.toUpperCase() == 'RSVP') {
        let newMessage = new Message();
        newMessage.phoneNumber = from;
        /* if save successfull, return confirm text */
        newMessage.save( () => {
          /* create message with twilio with paramters */
          client.messages.create({
            to: from,
            from: to,
            body: 'What is your group name?'
          });
          res.end();
        });
      }
    }
    res.end();
  });
}

module.exports = inboundHandler;
