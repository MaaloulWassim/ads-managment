const express = require("express");
const { check } = require("express-validator");

const adsControllers = require("../controllers/ads-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:aid", adsControllers.getAdById);

router.get("/user/:uid", adsControllers.getAdsByUserId);

router.use(checkAuth);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("category").not().isEmpty(),
  ],
  adsControllers.createAd
);

module.exports = router;
