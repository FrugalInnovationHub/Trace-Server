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
const port = 3001;

app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// REST Endpoints


// User Endpoints
app.get('/api/login/', routeHandler.user.login);
app.get('/api/protected', auth.isToken , routeHandler.product.test);

// Product Endpoints
app.get('/api/product/', routeHandler.product.get);
app.post('/api/product/', routeHandler.product.post);
app.put('/api/product/', routeHandler.product.put);
app.delete('/api/product/', routeHandler.product.delete);


// Start the server, and have it listen on port 3000
app.listen(port, () => console.log(`App listening on port ${port}!`));

