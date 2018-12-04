'use strict';

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
const pg = require('pg');

// Application Setup
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());

// Application Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

// SQL Database
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// API Routes
app.get('/', getBooks);
// Renders the search form
app.get('/searches/new', newSearch);
// Creates a new search to the Google Books API
app.post('/searches', createSearch);

// app.post('/books', addBook); // DB action from results view
// app.get('/books/:id', getBook); // detail view

// Catch-all
app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// HELPER FUNCTIONS
function Book(info) {
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';

  this.title = info.title || 'No title available';
  this.isbn = info.industryIdentifiers ? info.industryIdentifiers[0].identifier : 'No ISBN available';
  this.author = info.authors || 'No author available';
  this.description = info.description || 'No description available';
  this.image_url = info.imageLinks ? info.imageLinks.smallThumbnail : placeholderImage;
}

function newSearch(request, response) {
  response.render('pages/searches/new');
}

// Render saved books on first visit
function getBooks(request, response) {
  let SQL = 'SELECT * FROM books;';

  return client.query(SQL)
    .then(results => {
      if(results.rows.length === 0) {
        response.render('pages/searches/new');
      } else {
        response.render('pages/index', {books: results.rows})
      }
    })
    .catch(err => handleError(err, response))
}

// No API key required
function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?maxResults=10&q=';
  console.log(request.body);

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }
  console.log('URL: ', url);

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', {searchResults: results}))
    .catch(err => handleError(err, response));
}

function handleError(error, response) {
  console.log(error);
  response.render('pages/error', {error: error});
}
