require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const swaggerDocument = require('./swagger.json');

const BookController = require('./controller/book_controller');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// Routes could be put on seperate file/folder
// since this is simple service, let put it in here
app.route('/books')
  .get(BookController.getBooks)
  .post(BookController.postBook);

app.route('/books/:id')
  .get(BookController.getBook)
  .put(BookController.updateBook)
  .delete(BookController.deleteBook);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/health', (req, res) => res.send('{ "status": "ok" }'));

const port = process.env.PORT;
app.listen(port, () => console.log(`Service listening on port ${port}!`));

module.exports = app;