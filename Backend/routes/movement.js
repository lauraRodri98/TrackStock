const express = require("express");
const router = express.Router();

const ControllersMoviment = require("../controllers/movement");

router.get("/moviment", ControllersMoviment.moviments)

module.exports = router;