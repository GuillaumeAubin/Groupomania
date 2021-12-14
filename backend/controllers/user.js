const db = require("../models");
const { User } = db.sequelize.models;

// Import du package de chiffrement bcrypt
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all user
exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

// Get one
exports.getOneUser = (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error }));
};

// delete user
exports.deleteUser = (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((User) => {
      User.destroy({ id: req.params.id });
    })
    .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

// last signup

exports.getLastSignup = (req, res) => {
  User.findAll({
    limit: 3,
    order: [["createdAt", "DESC"]],
  })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

// signup
exports.signup = async (req, res, next) => {
  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            moderator: req.body.moderator,
          });
          user
            .save()
            .then(() => res.status(201).json({ message: user }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message:
                "Mot de passe incorrect !" +
                console.log(req.body.password + "    " + user.password),
            });
          }
          res.status(200).json({
            moderator: user.moderator,
            userId: user.id,
            message: "utilisateur trouvé",
            token: jwt.sign(
              { userId: user.id, moderator: user.moderator },
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
