const plaid = require("plaid");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "plaid-link.html"));
});

app.post('/create_link_token', async function(request, response, next) {
  // 1. Grab the client_user_id by searching for the current user in your database
  //const user = await User.find(...);
  //const clientUserId = user.id;

  // 2. Create a link_token for the given user
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

    // 3. Send the data to the client
    response.json({ link_token });
  });
});

app.post("/plaid_token_exchange", async (req, res) => {
  const { link_token } = req.body;

  const { access_token } = await client
    .exchangePublicToken(publicToken)
    .catch(console.error);

  const { accounts, item } = await client
    .getAccounts(access_token)
    .catch(console.error);

    
  console.log({
    accounts,
    item
  });
});

app.listen(8080, () =>
  console.log("Server started. Listening at localhost:8080")
);