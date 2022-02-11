const {Book} = require('../models');

//view all
module.exports.viewAll = async function(req, res){
    const books = await Book.findAll();
    res.render('book/view_all', {books});
}
//profile
module.exports.viewProfile= async function(req,res){
    const book = await Book.findByPk(req.params.id);
    res.render('course/profile', {book})
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