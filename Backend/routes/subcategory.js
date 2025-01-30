const express = require("express");
const router = express.Router();

const ControllersSubcategory = require("../controllers/subcategory");

router.get("/subcategorias", ControllersSubcategory.subcategory)

module.exports = router;