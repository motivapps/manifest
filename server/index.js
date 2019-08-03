require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const passport = require('passport');
const plaid = require('plaid');

/**
 * express required to aid in in handeling request made to server
 * session required to aid with passport request for google authentication
 * path required to aid in redirects to avoid landing on incorrect endpoint
 * axios required to send requests
 * bodyParse required to retrieve information from body while avoiding chunks
 * passport required in retrieving info from google authentication
 */

const app = express();

/**
 * middleware assigned to app for use with incoming requests
 */

// app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({ secret: 'anything' }));
// app.use(passport.initialize());
// app.use(passport.session());


let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;

const client = new plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  plaid.environments.sandbox
);

app.post('https://sandbox.plaid.com/item/public_token/exchange', {
  client_id: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  public_token: process.env.PLAID_PUBLIC_KEY,
})
.then((response) => {
  console.log(response);
})
.catch((err) => console.error(err));


const PORT = 8080;

app.listen(PORT, () => console.log(`Your app is manifesting on port ${PORT}!`));
