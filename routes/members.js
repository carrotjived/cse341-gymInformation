const express = require("express");
const router = express.Router();
const membersController = require("../controllers/members");
const validation = require("../middleware/members_validator");
const { IsAuthenticated } = require("../middleware/authenticate");

// Gets all of the members in the database
router.get("/", IsAuthenticated, membersController.getAll);

// Gets a single member in the database with the userId
router.get("/:Id", IsAuthenticated, membersController.getSingle);

// Creates a member
router.post("/", IsAuthenticated, validation.validate, membersController.createMember);

// Updates a member
router.put("/:Id", IsAuthenticated, validation.validate, membersController.updateMember);

// Deletes a member
router.delete("/:Id", IsAuthenticated, membersController.deleteMember);


module.exports = router;