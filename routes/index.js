var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController.js');
const authorController = require('../controllers/authorController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/books', bookController.viewAll);
router.get('/books/profile/:id', bookController.viewProfile);
router.get('/books/edit/:id', bookController.renderEditForm);
router.post('/books/edit/:id', bookController.updateBook);
router.get('/books/add', bookController.renderAddForm);
router.post('books/add', bookController.addBook);
router.get('/books/delete/:id', bookController.deleteBook)

router.get('/authors', authorController.viewAll);
router.get('/authors/profile/:id', authorController.viewProfile);
router.get('/authors/edit/:id', authorController.renderEditForm);
router.post('/authors/edit/:id', authorController.updateAuthor);
router.get('/authors/add', authorController.renderAddForm);
router.post('/authors/add', authorController.addAuthor);
router.get('/authors/delete/:id', authorController.deleteAuthor);

router.post('/authors/:authorId/enroll/', authorController.addBook);
router.get('/authors/:authorId/removeBook/:bookId', authorController.removeBook);
router.post('/books/:bookId/enroll/', bookController.addAuthor);
router.get('/books/:bookId/removeAuthor/:authorId', bookController.removeAuthor);

module.exports = router;
