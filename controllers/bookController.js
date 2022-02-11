const {Book, Author, AuthorsBooks} = require('../models');

//view all
module.exports.viewAll = async function(req, res){
    const books = await Book.findAll();
    res.render('book/view_all', {books});
}
//profile
module.exports.viewProfile= async function(req,res){
    const book = await Book.findByPk(req.params.id, {
        include: 'authors'
    });
    const authors = await Author.findAll();
    let availableAuthors = [];
    for (let i=0; i<authors.length; i++) {
        if (!bookHasAuthor(book, authors[i])) {
            availableAuthors.push(authors[i]);
        }
    }
    res.render('course/profile', {book,availableAuthors})
}
//render add
module.exports.renderAddForm = function (req,res){
    const book = {
        name: '',
        publisher: '',
        authors: '',
        genre: '',
        cover: '',
        pageCount: '',
        description: ''
    }
    res.render('book/add', {book})
}
//add
module.exports.addBook = async function(req,res) {
    const book = await Book.create( {
        title: req.body.title,
        publisher: req.body.publisher,
        authors: req.body.authors,
        genre: req.body.genre,
        cover: req.body.cover,
        pageCount: req.body.pageCount,
        description: req.body.description,
    });
    res.redirect(`/books/profile/${book.id}`)
}
//render edit
module.exports.renderEditForm = async function(req,res){
    const book = await Book.findByPk(req.params.id);
    res.render('book/edit', {book})
}
//update
module.exports.updateBook = async function(req,res){
    const book = await Book.update( {
        title: req.body.title,
        publisher: req.body.publisher,
        authors: req.body.authors,
        genre: req.body.genre,
        cover: req.body.cover,
        pageCount: req.body.pageCount,
        description: req.body.description,
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/books/profile/${req.params.id}`)
}
//delete
module.exports.deleteBook = async function(req,res){
    await Book.destroy( {
        where: {
            id: req.params.id
        }
    });
    res.redirect('/books');
}

function bookHasAuthor(book, author) {
    for (let i=0; i<book.authors.length; i++){
        if (author.id === book.authors[i].id){
            return true
        }
    }
    return false
}

module.exports.addAuthor = async function(req, res) {
    await AuthorsBooks.create( {
        author_id: req.body.author,
        book_id: req.params.bookId

    });
    res.redirect(`/books/profile/${req.params.bookId}`)
}

module.exports.removeAuthor = async function(req, res) {
    await AuthorsBooks.destroy({
        where: {
            book_id: req.params.bookId,
            author_id: req.params.authorId
        }
    });
    res.redirect(`/authors/profile/${req.params.bookId}`);
}