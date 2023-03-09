const express = require("express");
const { User } = require("../models");
const router = express.Router();

// GET PARA TRAER TODOS LOS USUARIOS

router.get("/", (req, res) => {
  User.findAll()
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((err) => res.status(400).send(err));
});

// GET PARA BUSCAR UN USUARIO POR ID

router.get(`/:id`, (req, res) => {
  const { id } = req.params;
  User.findOne({ where: { id: id } })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(404).send({ error: "failed to find the user" }));
});

// POST PARA CREAR EL USUARIO
// pasar info de el usuario a crear por body (name, lastName, uid, email)
router.post("/", (req, res, next) => {
  const { name, lastName, email, uid } = req.body;
  User.findOrCreate({ where: { name, lastName, email, uid } })
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch(next);
});

// PUT PARA EDITAR EL USUARIO
// pasar lo que se quiere modificar por body (name, lastName, uid, email)
router.put(`/edit/:id`, (req, res, next) => {
  const { name, lastName, uid, email } = req.body;
  User.findByPk(req.params.id)
    .then((user) => {
      user
        .update({ name, lastName, uid, email })
        .then((editUser) => res.status(201).send(editUser))
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
