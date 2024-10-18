const express = require("express");
const router = express.Router();
const machinesController = require("../controllers/machines");
const validation = require("../middleware/machines_validator");
const { IsAuthenticated } = require("../middleware/authenticate");

// Gets all of the machines in the database
router.get("/", machinesController.getAll);

// Gets a single machine in the database with the userId
router.get("/:Id", machinesController.getSingle);

// Creates a machine
router.post("/", IsAuthenticated, validation.validate, machinesController.createMachine);

// Updates a machine
router.put("/:Id", IsAuthenticated, validation.validate, machinesController.updateMachine);

// Deletes a machine
router.delete("/:Id", IsAuthenticated, machinesController.deleteMachine);


module.exports = router;