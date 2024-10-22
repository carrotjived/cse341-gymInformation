const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employees");
const validation = require("../middleware/employees_validator");
const { IsAuthenticated } = require("../middleware/authenticate");


// Gets all of the employees in the database
router.get("/", IsAuthenticated, employeesController.getAll);

// Gets a single employee in the database with the userId
router.get("/:Id", IsAuthenticated, employeesController.getSingle);

// Creates a employee
router.post("/", IsAuthenticated, validation.validate, employeesController.createEmployee);

// Updates a employee
router.put("/:Id", IsAuthenticated, validation.validate, employeesController.updateEmployee);

// Deletes a employee
router.delete("/:Id", IsAuthenticated, employeesController.deleteEmployee);


module.exports = router;