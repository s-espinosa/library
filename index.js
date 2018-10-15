const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


const papersController = require('./lib/controllers/papers_controller')
const footnotesController = require('./lib/controllers/footnotes_controller')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Publications';

app.get('/', (request, response) => {
  response.send('Hello, Publications');
});

const papers    = require('./lib/routes/api/v1/papers')
const footnotes = require('./lib/routes/api/v1/footnotes')

app.use('/api/v1/papers', papers)
app.use('/api/v1/footnotes', footnotes)

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
