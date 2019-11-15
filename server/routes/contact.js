var express = require('express');
var router = express.Router();

const contactController = require("../controllers/contact");
const authMiddleware = require("../middlewares/auth");

router.get("/", contactController.getIndex);
router.get("/dashboard", contactController.getDashboard);
router.get("/add-new-airline", contactController.getAirlineInfo);
router.get("/add-new-hotel", contactController.getHotelInfo);
router.post("/add-new-hotel", contactController.postHotelInfo);
router.get("/dashboard/detail", contactController.getHotelDetail);

module.exports = router;