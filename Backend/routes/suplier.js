const express = require("express");
const router = express.Router();

const ControllersSupplier = require("../controllers/supplier");

router.get("/supplier", ControllersSupplier.supplier)
router.delete("/deletesupplier/:id", ControllersSupplier.deleteSupplier)
router.post("/createsupplier", ControllersSupplier.create)
router.put("/updatesupplier", ControllersSupplier.updateSupplier)

module.exports = router;