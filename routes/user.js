const express = require("express");
const { User } = require("../models");
const router = express.Router();
const seedAdmin = require("../config/seedAdmin.js");

// GET PARA TRAER TODOS LOS USUARIOS
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.send(users);
  } catch (err) {
    return next(err);
  }
});

router.get("/:userId/all", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user.isAdmin === true) {
      const users = await User.findAll();
      return res.status(200).send(users);
    } else return res.status(401).send({ error: "Your account is not admin" });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:userId/delete/:DeleteUserID", async (req, res, next) => {
  try {
    const admin = await User.findByPk(req.params.userId);
    if (admin.isAdmin === true) {
      const userToDelete = await User.findByPk(req.params.DeleteUserID);
      const deletedUser = await userToDelete.destroy();
      return res.status(204).send(deletedUser);
    }
    return res.status(401).send({ error: "Your account is not admin" });
  } catch (err) {
    return next(err);
  }
});

router.put(`/:userId/edit/:newAdminId`, async (req, res, next) => {
  try {
    const admin = await User.findByPk(req.params.userId);
    if (admin.isAdmin === true) {
      const userToMakeAdmin = await User.findByPk(req.params.newAdminId);
      const newAdmin = await userToMakeAdmin.update({ isAdmin: true });
      return res.status(200).send(newAdmin);
    }
    return res.status(401).send({ error: "Your account is not admin" });
  } catch (err) {
    return next(err);
  }
});

// GET PARA BUSCAR UN USUARIO POR ID

router.get(`/:id`, async (req, res) => {
  try {
    const userToFind = await User.findByPk(req.params.id);
    return res.status(200).send(userToFind);
  } catch (err) {
    return next(err);
  }
});

router.get(`/:uid`, async (req, res) => {
  try {
    const userToFind = await User.findOne({ where: { uid: req.params.uid } });
    return res.status(200).send(userToFind);
  } catch (err) {
    return next(err);
  }
});

// POST PARA CREAR EL USUARIO

router.post("/", async (req, res, next) => {
  try {
    const { name, lastName, email, uid } = req.body;
    const NewUser = await User.findOrCreate({
      where: { name, lastName, email, uid },
    });
    return res.status(201).send(NewUser);
  } catch (err) {
    return next(err);
  }
});

// PUT PARA EDITAR EL USUARIO

router.put(`/edit/:id`, async (req, res, next) => {
  try {
    const { name, lastName, uid, isAdmin } = req.body;

    const userToUpdate = await User.findByPk(req.params.id);
    const updatedUser = await userToUpdate.update({
      name,
      lastName,
      uid,
      isAdmin,
    });
    return res.status(200).send(updatedUser);
  } catch (err) {
    return next(err);
  }
});

// GET USER UID
router.get("/uid/:uid", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { uid: req.params.uid.toString() },
    });
    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

// SEED ADMIN
router.post("/admin", async (req, res, next) => {
  try {
    const NewUser = await User.create(seedAdmin);
    return res.status(201).send(NewUser);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
