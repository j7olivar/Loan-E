const moment = require("moment");
const plaid = require("plaid");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const admin = require('firebase-admin');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let ACCESS_TOKEN = null;
let ITEM_ID = null;
let UID = null;

var serviceAccount = require("../../admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loane-9156e.firebaseio.com"
});

var db = admin.firestore();

let userRef = null;

let transRef = null;

const plaidClient = new plaid.Client({
  clientID: '5f2c09a81ae49000136084e2',
  secret: 'd1e8e03605c935f124cf898eaafcc5',
  env: plaid.environments.sandbox
});

app.get("/", (req, res) => {
  console.log("plaid started")
  res.sendFile(path.join(__dirname, "plaid-link.html"));
});

app.post('/send_uid', function(request, response, next) {
  console.log("send_uid started!")
  admin.auth().verifyIdToken(request.body.idToken)
    .then(function(decodedToken) {
      UID = decodedToken.uid;
      // ...
      console.log(UID);
      userRef = db.collection('users').doc(UID);
      transRef = db.collection('transactions').doc(UID);
    }).catch(function(error) {
        var msg = 'Could not fetch auth!';
        console.log(msg + '\n' + JSON.stringify(error));
        return response.json({
          error: error,
        });
    });
});

app.post('/create_link_token', async function(request, response, next) {
  // 1. Grab the client_user_id by searching for the current user in your database
  //const user = await User.find(...);
  //const clientUserId = user.id;

  // 2. Create a link_token for the given user

  console.log("token generation started")

  plaidClient.createLinkToken({
    user: {
      client_user_id: '9WkwcJa3gbSOCquQGynLOYEt7VV2',
    },
    client_name: 'Loan-E',
    products: ['transactions'],
    country_codes: ['US'],
    language: 'en',
    webhook: 'https://sample.webhook.com',
  }, (err, res) => {
    const link_token = res.link_token;

    console.log("token generated: " + link_token)

    // 3. Send the data to the client
    response.json({ link_token });
  });
});

app.post('/get_access_token', function(request, response, next) {
  
  console.log("token exchange started: " + request.body.public_token);
  
  const public_token = request.body.public_token;
  plaidClient.exchangePublicToken(public_token, function(error, tokenResponse) {
    if (error != null) {
      var msg = 'Could not exchange public_token!';
      console.log(msg + '\n' + JSON.stringify(error));
      return response.json({
        error: msg
      });
    }

    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;

    console.log("Access Token: " + ACCESS_TOKEN + " Item ID: " + ITEM_ID)

    console.log(UID);

    userRef.update({
      accessToken: ACCESS_TOKEN,
      itemID: ITEM_ID
    })

    console.log("Write Success");

    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: false
    });
  });
});

app.get('/auth', function(request, response, next) {

  console.log("auth fetch started: " + ACCESS_TOKEN);

  plaidClient.getAuth(ACCESS_TOKEN, function(error, authResponse) {
    if (error != null) {
      var msg = 'Could not fetch auth!';
      console.log(msg + '\n' + JSON.stringify(error));
      return response.json({
        error: error,
      });
    }
    //console.log(JSON.stringify(authResponse, null, 2));
    response.json({error: null, auth: authResponse});
  });
});

app.get('/transactions', async function(request, response, next) {
  // Pull transactions for the Item for the last 30 days
  const loadDoc1 = await userRef.get();
	if(loadDoc1.data().accessToken != null){
    ACCESS_TOKEN = loadDoc1.data().accessToken;
    console.log(ACCESS_TOKEN);
  }
  else {
    console.log('No such access document!');
    return response.json({
      error: error
    });
  }
  var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  var endDate = moment().format('YYYY-MM-DD');
  plaidClient.getTransactions(ACCESS_TOKEN, startDate, endDate, {
    count: 250,
    offset: 0,
  }, function(error, transactionsResponse) {
    if (error != null) {
      console.log(JSON.stringify(error));
      return response.json({
        error: error
      });
    } else {
      //console.log(JSON.stringify(transactionsResponse, null, 2));
      transRef.update({
        accounts: transactionsResponse.accounts,
        transactions: transactionsResponse.transactions,
        date: moment().format('YYYY-MM-DD')
      })
      console.log('Transactions pulled!');
      response.json({error: false, transactions: transactionsResponse});
    }
  });
});

app.listen(8080, () =>
  console.log("Server started. Listening at localhost:8080")
);