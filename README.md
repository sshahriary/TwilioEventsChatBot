<h1>Twilio ChatBot</h1>
Chat Bot that acts as an RSVP system for an event

<h2>Tech Stack</h2>
* Twilio (cloud communications provider) SMS API - send and receive text messages
* Node.js (Express) - server side/public endpoint for communication.
* Mongoose (mongodb for node.js) - object modeling tool
* mLab (mongodb cloud provider) - data store
* ngrok - secure forwarding of localhost to live domain

<h2>Project Setup</h2>
* Download Node.js and run `npm install` to download all dependencies
  * run server using `npm start` (default port 3000)
* Download ngrok and run `ngrok http 3000`. localhost now mapped to public server domain.
* Provide the mapped ngrok domain to your registered Twilio phone number's SMS POST messaging request

<h2>Project Design</h2>
* Application prompts client to RSVP to and event by typing `RSVP`
* App then prompts for `group name`, `total adults attending`, and lastly `total children attending`.

<h2>Design Choices</h2>
* application maintains state in order to keep track of RSVP conversation
  * Based on what's available in the DB, we know at which point in the conversation we are at (example: if the phone number and group name are in the DB, then we prompt for total adults then total children).
* functionality for service and error handling is modularized to reduce redundant code (broad and simple error response - don't provide too much detail to leave app open for exploitation).

<h2>Challenges and Thoughts</h2>
* Learning Twilio API and finding free database service.
* Quick and simple app idea to learn and get familiar with Twilio API - very straight forward and simple API/provides diverse functionality.
* Planning on developing more with Twilio API and building out this current project for more complex flow structures.
