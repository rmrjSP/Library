var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/books', bookController.viewAll);
router.get('/books/profile/:id', bookController.viewProfile);
module.exports = router;
