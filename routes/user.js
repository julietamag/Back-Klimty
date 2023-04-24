const express = require("express");
const { User } = require("../models");
const router = express.Router();
const Checkout = require("../models/Checkout");
const user_controler = require("../controlers/user_controller")

// GET PARA TRAER TODOS LOS USUARIOS
router
    .get('/', user_controler.users_get)
    .post("/:userId/status/:checkoutId", user_controler.checkout_status_post)
    .get("/:userId/all", user_controler.admin_all_get)
    .delete("/:userId/delete/:deleteUserID", user_controler.admin_user_delete)
    .put(`/:userId/edit/:newAdminId`, user_controler.admin_new_admin_put)
    .get(`/:id`, user_controler.user_find_by_id_get)
    .post("/", user_controler.user_create_post)
    .put(`/edit/:id`, user_controler.user_edit_put)
    .get("/uid/:uid", user_controler.user_find_by_uid_get)
    .post("/admin", user_controler.user_seed_admin)

module.exports = router;
