const express = require("express");
const router = express.Router();

const ControllersProducts = require("../controllers/products");

router.get("/product", ControllersProducts.product)
router.delete("/deleteproduct/:id", ControllersProducts.deleteProduct)
router.post("/create", ControllersProducts.create)
router.put("/update", ControllersProducts.update)


module.exports = router;