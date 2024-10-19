const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Locations']
  //#swagger.description = "Get all Locations"
  mongodb
    .getDatabase()
    .db()
    .collection("locations")
    .find()
    .toArray()
    .then((err, locations) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(locations);
      }
    });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Locations']
  //#swagger.description = "Get one Location by Id"
  if (!ObjectId.isValid(req.params.Id)) {
    res.status(400).json("Must use a valid Id to find a location.");
  }
  const locationId = ObjectId.createFromHexString(req.params.Id);
  mongodb
    .getDatabase()
    .db()
    .collection("locations")
    .find({ _id: locationId })
    .toArray()
    .then((err, locations) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(locations[0]);
      }
    });
};

const createLocation = async (req, res) => {
  //#swagger.tags=['Locations']
  //#swagger.description = "Create a new Location"
  const location = {
    address: req.body.address,
    open: req.body.open,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("locations")
    .insertOne(location);

  console.log(response);

  if (response.acknowledged) {
    res.send(`New locationId: ${response.insertedId}`);
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while creating the location.");
  }
};

const updateLocation = async (req, res) => {
  //#swagger.tags=['Locations']
  //#swagger.description = "Update a Location by Id"
  if (!ObjectId.isValid(req.params.Id)) {
    res.status(400).json("Must use a valid location id to update location.");
  }
  const locationId = ObjectId.createFromHexString(req.params.Id);
  const location = {
    address: req.body.address,
    open: req.body.open,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("locations")
    .replaceOne({ _id: locationId }, location);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while updating the location.");
  }
};

const deleteLocation = async (req, res) => {
  //#swagger.tags=['Locations']
  //#swagger.description = "Delete Location by Id"
  if (!ObjectId.isValid(req.params.Id)) {
    res.status(400).json("Must use a valid location id to delete location.");
  }
  const locationId = ObjectId.createFromHexString(req.params.Id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("locations")
    .deleteOne({ _id: locationId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while deleting the location.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createLocation,
  updateLocation,
  deleteLocation,
};
