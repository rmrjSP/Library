'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: DataTypes.STRING,
    publisher: DataTypes.STRING,
    authors: DataTypes.STRING,
    genre: DataTypes.STRING,
    cover: DataTypes.STRING,
    pageCount: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
    timestamps:false,
    tableName: 'books'
  });
  return Book;
};