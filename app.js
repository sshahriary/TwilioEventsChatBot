/* npm modules */
const express = require('express');
const mongoose = require('mongoose');
const twilio = require('twilio');
const dotenv = require('dotenv').config();      //retrieve local environment variables
const bodyParser = require('body-parser');      //parse incoming requests

/* node modules */
const inboundHandler = require('./routes/inbound.js')


/* retrieve environment variables and set variables */
const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const dbUser = process.env.MONGOOSE_USER;
const dbPass = process.env.MONGOOSE_PASSWORD;
const mongoURI = 'mongodb://'+dbUser+':'+dbPass+'@ds217351.mlab.com:17351/chatbotdb';
let messageSchema = new mongoose.Schema({ phoneNumber: String, groupName: String, totalAdults: String, totalKids: String });

/* application setup */
const app = express();
const client = new twilio(accountSID, authToken);
let Message = mongoose.model('Message', messageSchema);                                                     //create model
app.use(bodyParser.urlencoded({extended: false}));                                                          //format incoming requests
/* connect to mongodb */
mongoose.connect(mongoURI, { useNewUrlParser: true }, function(err){
  if(err){
    new error = new Error('connection to database failed');
    error.status = 500;
    next(error);
  }
});

/* application */
app.get('/', function(req, res, next){
  res.end();
});

/* on text to chatbot service */
app.post('/inbound', function(req, res, next){
  inboundHandler(req, res, next, Message, client);
});

/* error handler: handles specific errors with custom response object */
app.use(function (error, req, res, next) {
  res.status(error.status).send({'status': error.status, 'message': error.message});
});

module.exports = app;
