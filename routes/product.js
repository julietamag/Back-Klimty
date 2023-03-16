const express = require("express");
const router = express.Router();
const product_controller = require("../controlers/product_controller")

router
    .get("/", product_controller.find_all_get)


// SEED
    .post("/", product_controller.create_bulk_by_artist_post)

// ruta para buscar producto por ID

    .get("/:id", product_controller.find_by_id_get)

    .delete("/:userId/:productId", product_controller.admin_by_product_id_delete)

    .post("/:userId/add", product_controller.admin_add_post)

    .put("/:userId/edit/:productId", product_controller.admin_edit_product_put)

module.exports = router;
