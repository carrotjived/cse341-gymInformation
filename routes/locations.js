const express = require("express");
const router = express.Router();
const locationsController = require("../controllers/locations");
const validation = require("../middleware/locations_validator");
const { IsAuthenticated } = require("../middleware/authenticate");

// Gets all of the locations in the database
router.get("/", locationsController.getAll);

// Gets a single location in the database with the userId
router.get("/:Id", locationsController.getSingle);

// Creates a location
router.post(
  "/",
  IsAuthenticated,
  validation.validate,
  locationsController.createLocation
);

// Updates a location
router.put(
  "/:Id",
  IsAuthenticated,
  validation.validate,
  locationsController.updateLocation
);

// Deletes a location
router.delete("/:Id", IsAuthenticated, locationsController.deleteLocation);

module.exports = router;
