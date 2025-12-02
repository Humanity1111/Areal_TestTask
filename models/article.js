'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     */
    static associate(models) {
      // Одна статья может иметь много комментариев
      Article.hasMany(models.Comment, { 
        foreignKey: 'articleId', 
        as: 'comments', 
        onDelete: 'CASCADE' // чтобы при удалении статьи удалялись комментарии
      });
    }
  }

  Article.init({
    title: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Article',
  });

  return Article;
};
