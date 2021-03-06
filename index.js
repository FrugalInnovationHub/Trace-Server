/*
 * Primary file for API
 */
require('dotenv').config(); // Sets up dotenv as soon as our application starts

"use strict";
// Dependencies
const express = require('express');
const app = express();
// require('./db/createDB.js');
const cors = require('cors');
const url = require('url');
const bodyParser = require('body-parser');

const auth = require('./helpers/auth');
const routeHandler = require('./routeHandler');
const port = process.env.PORT || 3001;

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/tarangdave.club/privkey.pem', 'utf8'),
 cert: fs.readFileSync('/etc/letsencrypt/live/tarangdave.club/fullchain.pem', 'utf8')
};

app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit : '50mb' }));

// REST Endpoints
app.get('/api/ping/',function(req,res) {
  res.type('application/json').status(200).send({Success : 'Your application is working great'});
});

// User Endpoints
app.post('/api/signup/', routeHandler.user.signup);
app.post('/api/login/', routeHandler.user.login);
// Product Endpoints
app.get('/api/product/parent/', auth.isToken , routeHandler.product.getParent);
app.get('/api/product/', auth.isToken , routeHandler.product.get);
app.post('/api/product/', auth.isToken , routeHandler.product.post);
app.put('/api/product/',auth.isToken, routeHandler.product.put);
app.delete('/api/product/', auth.isToken , routeHandler.product.delete);

// Start the server, and have it listen on port 3000
// app.listen(port, () => console.log(`App listening on port ${port}!`));
https.createServer(options, app).listen(port);

