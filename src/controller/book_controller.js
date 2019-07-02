const Book = require('../model/book');

function getBooks(req, res) {
  const query = Book.find({});
  query.exec((err, books) => {
    res.json(books);
  });
}

function postBook(req, res) {
  const newBook = new Book(req.body);
  newBook.save((err, book) => {
    res.status(201);
    res.json(book);
  });
}

function getBook(req, res) {
  Book.findById(req.params.id, (err, book) => {
    if (book) {
      res.json(book);
    } else {
      res.status(404);
      res.send();
    }
  });
}

function updateBook(req, res) {
  Book.findById({ _id: req.params.id }, (err, book) => {
    if (book) {
      Object.assign(book, req.body).save((nextErr) => {
        res.send();
      });
    } else {
      res.status(404);
      res.send();
    }
  });
}

function deleteBook(req, res) {
  Book.remove({ _id: req.params.id }, (err) => {
    res.status(204);
    res.send();
  });
}

module.exports = {
  getBooks,
  postBook,
  getBook,
  deleteBook,
  updateBook,
};
