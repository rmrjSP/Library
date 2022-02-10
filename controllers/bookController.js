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

//add

//render edit

//update

//delete