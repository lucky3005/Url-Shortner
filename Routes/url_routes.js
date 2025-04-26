const express = require("express");
const router = express.Router();
const Controller = require("../controllers/url_controller");
 
router.post("/",Controller.urlPostRouteHandler);

router.get("/",Controller.homeGetRouteController);

router.get("/:id", Controller.urlGetRouteHandler);

module.exports = router;
