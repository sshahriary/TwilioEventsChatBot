/* npm modules */
const express = require('express');
const mongoose = require('mongoose');
const twilio = require('twilio');
const dotenv = require('dotenv').config();      //retrieve local environment variables
const bodyParser = require('body-parser');      //parse incoming requests



/* retrieve environment variables */
const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const dbUser = process.env.MONGOOSE_USER;
const dbPass = process.env.MONGOOSE_PASSWORD;

/* application setup */
const app = express();
const client = new twilio(accountSID, authToken);
