'use strict';

// Application dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');


// Load environment variables from .env file
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 4000;
app.set('view engine', 'ejs');// tell it we're using ejs
app.use(cors());

app.get('/', (request, response) => response.render('pages/index'));
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
