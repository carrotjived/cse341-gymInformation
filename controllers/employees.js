const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Employees']
  //#swagger.summary = "Get All Employees"
  mongodb
    .getDatabase()
    .db()
    .collection("employees")
    .find()
    .toArray()
    .then((err, employees) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(employees);
      }
    });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Employees']
  //#swagger.summary = "Get One Employee by Id"

  if (!ObjectId.isValid(req.params.Id)) {
    res.status(400).json("Must use a valid employee id to find employee.");
  }
  const employeeId = ObjectId.createFromHexString(req.params.Id);
  mongodb
    .getDatabase()
    .db()
    .collection("employees")
    .find({ _id: employeeId })
    .toArray()
    .then((err, employees) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(employees[0]);
      }
    });
};

const createEmployee = async (req, res) => {
  //#swagger.tags=['Employees']
  //#swagger.summary = "Create an Employee Information"

  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email,
    employeeLevel: req.body.employeeLevel,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("employees")
    .insertOne(employee);

  console.log(response);

  if (response.acknowledged) {
    res.send(`New employeeId: ${response.insertedId}`);
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while creating the employee.");
  }
};

const updateEmployee = async (req, res) => {
  //#swagger.tags=['Employees']
  //#swagger.summary = "Update an Employee Information"

  if (!ObjectId.isValid(req.params.Id)) {
    res.status(400).json("Must use a valid employee id to update employee.");
  }
  const employeeId = ObjectId.createFromHexString(req.params.Id);
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email,
    employeeLevel: req.body.employeeLevel,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("employees")
    .replaceOne({ _id: employeeId }, employee);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while updating the employee.");
  }
};

const deleteEmployee = async (req, res) => {
  //#swagger.tags=['Employees']
  //#swagger.summary = "Delete an Employee Infromation by Id"
  if (!ObjectId.isValid(req.params.Id)) {
    res.status(400).json("Must use a valid employee id to delete employee.");
  }
  const employeeId = ObjectId.createFromHexString(req.params.Id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("employees")
    .deleteOne({ _id: employeeId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while deleting the employee.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
