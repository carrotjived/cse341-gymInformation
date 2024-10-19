const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Machines']
  //#swagger.summary = "Get all Machine Information"
  mongodb
    .getDatabase()
    .db()
    .collection("machines")
    .find()
    .toArray()
    .then((err, machines) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(machines);
      }
    });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Machines']
  //#swagger.summary = "Get one Machine Information by Id"
  if (!ObjectId.isValid(req.params.Id)) {
    res.status(400).json("Must use a valid id to find machine.");
  }
  const machineId = ObjectId.createFromHexString(req.params.Id);
  mongodb
    .getDatabase()
    .db()
    .collection("machines")
    .find({ _id: machineId })
    .toArray()
    .then((err, machines) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(machines[0]);
      }
    });
};

const createMachine = async (req, res) => {
  //#swagger.tags=['Machines']
  //#swagger.summary = "Create a new Machine Information"
  const machine = {
    name: req.body.name,
    requiredMembershipLevel: req.body.requiredMembershipLevel,
    amountOwned: req.body.amountOwned,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("machines")
    .insertOne(machine);

  console.log(response);

  if (response.acknowledged) {
    res.send(`New machineId: ${response.insertedId}`);
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while creating the machine.");
  }
};

const updateMachine = async (req, res) => {
  //#swagger.tags=['Machines']
  //#swagger.summary = "Update Machine by Id"
  if (!ObjectId.isValid(req.params.Id)) {
    res.status(400).json("Must use a valid machine id to update machine.");
  }
  const machineId = ObjectId.createFromHexString(req.params.Id);
  const machine = {
    name: req.body.name,
    requiredMembershipLevel: req.body.requiredMembershipLevel,
    amountOwned: req.body.amountOwned,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("machines")
    .replaceOne({ _id: machineId }, machine);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while updating the machine.");
  }
};

const deleteMachine = async (req, res) => {
  //#swagger.tags=['Machines']
  //#swagger.summary = "Delete Machine by Id"
  if (!ObjectId.isValid(req.params.Id)) {
    res.status(400).json("Must use a valid machine id to delete machine.");
  }
  const machineId = ObjectId.createFromHexString(req.params.Id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("machines")
    .deleteOne({ _id: machineId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while deleting the machine.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createMachine,
  updateMachine,
  deleteMachine,
};
