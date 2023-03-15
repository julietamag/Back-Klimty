const express = require("express");
const router = express.Router();
const product_controller = require("../controlers/product_controller")

router.get("/", product_controller.find_all_get);


// SEED
router.post("/", product_controller.create_bulk_by_artist_post);

// ruta para buscar producto por ID

router.get("/:id", product_controller.find_by_id_get);

router.delete("/:userId/:productId", product_controller.admin_by_product_id_delete);

router.post("/:userId/add", product_controller.admin_add_post);

router.put("/:userId/edit/:productId", product_controller.admin_edit_product_put);

module.exports = router;
