const express = require("express");
const router = express.Router();

const ControllersCategory = require("../controllers/category");

router.get("/category", ControllersCategory.categories);
router.post("/createcategory", ControllersCategory.newCategory);

module.exports = router;