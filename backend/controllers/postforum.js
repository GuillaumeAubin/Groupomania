const db = require("../models");
const { Category, Topic } = db.sequelize.models;
const fs = require("fs");

// Get all categories
exports.getAllCategories = (req, res) => {
  Category.findAll()
    .then((categories) => res.status(200).json(categories))
    .catch((error) => res.status(400).json({ error }));
};

//Create a topic
exports.getAllTopicsCat1 = (req, res) => {
  Topic.findAll({
    where: { categoryId: "1" },
  })
    .then((topics) => res.status(200).json(topics))
    .catch((error) => res.status(400).json({ error }));
};