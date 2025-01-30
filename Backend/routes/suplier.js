const express = require("express");
const router = express.Router();

const ControllersSupplier = require("../controllers/supplier");

router.get("/supplier", ControllersSupplier.supplier)

module.exports = router;