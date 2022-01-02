"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {}
  }
  Comment.init(
    {
      content: DataTypes.TEXT,
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      userName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
