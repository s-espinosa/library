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

app.get('/api/v1/papers', papersController.index);
app.post('/api/v1/papers', papersController.create);

app.get('/api/v1/footnotes', footnotesController.index);
app.post('/api/v1/papers/:id/footnotes', footnotesController.create);

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
