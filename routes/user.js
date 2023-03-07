const express = require("express");
const { User } = require("../models")
const {Op} = require("sequelize")
const router = express.Router();

router.post('/', (req, res) => {
    const { name, lastName, email, UID, isAdmin, address } = req.body;
    User.create({ name, lastName, email, UID, isAdmin, address }).then((newUser) => {
        res.status(201).send(newUser)
    })
    .catch((err) => res.status(400).send(err))
    
})

router.post('/login', (req, res) => {
    User.findOrCreate({
        where: {
            [Op.and]: [
            { UID: req.body.UID }, { email: req.body.email}
        ]
        }
    }).then((logUser) => res.status(205).send(logUser))
    .catch((err) => res.status(401).send({error: "password or email don't match"}))
})

router.put(`/edit/:id`, (req, res) => {
    const {name, lastName, UID} = req.body
    User.update({name: name, lastName: lastName, UID: UID}, {
        where: { email: req.body.email}, returning: true, plain: true }).then((editUser) => res.status(201).send(editUser))
    .catch(() => res.status(400).send({error: "failed to edit a"}))
})

router.get(`/:id`, (req, res) => {
    const { id } = req.params
    User.findOne({where: { id: id}}).then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send(err))
})


router.delete("/:id/logout", (req, res) => {
    (req.session) ? req.session.destroy((err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.status(200).send('Logout successful')
        }
      })) :  res.end()

})




module.exports = router