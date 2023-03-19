// Controller
const HomeController = require("../controllers/home.controller");

// Routes
const router = require("express").Router();

router.get("/", HomeController.getHome);
// router.get("/filter", HomeController.filterPHome);
router.post("/", HomeController.filterByCategory);

module.exports = router;