const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const Book = require('../../../src/model/book');
const dummyServer = require('../../../src/index');

chai.use(chaiHttp);

const bookRequestFixture = {
    title: "Title from test",
    author: "Dummy Server",
    isbn: "ISBN 978-602-8519-93-4",
    publishedOn: 1970,
    numberOfPages: 963
}

const bookRequestUpdateFixture = {
  title: "Updated title from test",
  author: "Updated dummy Server",
  isbn: "ISBN 2123-602-8519-93-4",
  publishedOn: 2010,
  numberOfPages: 18
}

describe('Books success case', () => {
  beforeEach((done) => {
    Book.remove({}, (err) => { 
       done();
    });
  });
  
  describe('/GET books', () => {
    it('it should GET all the books', (done) => {
      chai.request(dummyServer)
        .get('/books')
        .end((err, res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.eql(0);
          done();
      });
    });
  });

  describe('/POST books', () => {
    it('it should POST a book ', (done) => {
      chai.request(dummyServer)
        .post('/books')
        .send(bookRequestFixture)
        .end((err, res) => {
          expect(res.statusCode).to.eql(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('_id');
          expect(res.body).to.have.a.property('title');
          expect(res.body).to.have.a.property('author');
          expect(res.body).to.have.a.property('isbn');
          expect(res.body).to.have.a.property('numberOfPages');
          expect(res.body.title).to.eql(bookRequestFixture.title);
          expect(res.body.author).to.eql(bookRequestFixture.author);
          expect(res.body.isbn).to.eql(bookRequestFixture.isbn);
          expect(res.body.numberOfPages).to.eql(bookRequestFixture.numberOfPages);
          done();
        });
    });
  });

  describe('/GET/:id books', () => {
    it('it should GET a book by the given id', (done) => {
      const book = new Book(bookRequestFixture);
      book.save((err, book) => {
        chai.request(dummyServer)
        .get('/books/' + book.id)
        .end((err, res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('_id');
          expect(res.body).to.have.a.property('title');
          expect(res.body).to.have.a.property('author');
          expect(res.body).to.have.a.property('isbn');
          expect(res.body).to.have.a.property('numberOfPages');
          expect(res.body.title).to.eql(bookRequestFixture.title);
          expect(res.body.author).to.eql(bookRequestFixture.author);
          expect(res.body.isbn).to.eql(bookRequestFixture.isbn);
          expect(res.body.numberOfPages).to.eql(bookRequestFixture.numberOfPages);
          done();
        });
      });
    });

    it('it should return not found given non exist id', (done) => {
      const book = new Book(bookRequestFixture);
      book.save((err, book) => {
        chai.request(dummyServer)
        .get('/books/' + 1234567890)
        .end((err, res) => {
          expect(res.statusCode).to.eql(404);
          expect(res.body).to.be.empty;
          done();
        });
      });
    });
  });

  describe('/PUT/:id books', () => {
    it('it should UPDATE a book given the id', (done) => {
      const book = new Book(bookRequestFixture);
      book.save((err, book) => {
        chai.request(dummyServer)
        .put('/books/' + book.id)
        .send(bookRequestUpdateFixture)
        .end((err, res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.body).to.be.empty;
          done();
        });
      });
    });

    it('it should return not found given non exist id', (done) => {
      const book = new Book(bookRequestFixture);
      book.save((err, book) => {
        chai.request(dummyServer)
        .put('/books/' + 1234567890)
        .send(bookRequestUpdateFixture)
        .end((err, res) => {
          expect(res.statusCode).to.eql(404);
          expect(res.body).to.be.empty;
          done();
        });
      });
    });
  });

  describe('/DELETE/:id books', () => {
    it('it should DELETE a book given the id', (done) => {
      const book = new Book(bookRequestFixture);
      book.save((err, book) => {
        chai.request(dummyServer)
          .delete('/books/' + book.id)
          .end((err, res) => {
            expect(res.statusCode).to.eql(204);
            expect(res.body).to.be.empty;
            done();
          });
      });
    });
  });

});