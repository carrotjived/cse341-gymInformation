const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


const getAll = async (req, res) => {
    mongodb.getDatabase()
    .db()
    .collection("members")
    .find()
    .toArray()
    .then((err, members) => {
        if (err) {
            res.status(500).json({ message: err});
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(members);
        }
    });
};

const getSingle = async (req, res) => {
    const memberId = ObjectId.createFromHexString(req.params.Id);
    mongodb.
    getDatabase()
    .db()
    .collection("members")
    .find({ _id: memberId })
    .toArray()
    .then((err, members) => {
        if (err) {
            res.status(500).json({ message: err});
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(members[0]);
        }
    });
};

const createMember = async (req, res) => {
    const member = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        membershipLevel: req.body.membershipLevel,
        membershipStartDate: req.body.membershipStartDate
    };

    const response = await mongodb.getDatabase().db().collection("members").insertOne(member);

    console.log(response);

    if (response.acknowledged) {
        res.send(`New memberId: ${response.insertedId}`);
    }
    else {
        res.status(500).json(response.error || "An error occurred while creating the member.");
    }
}

const updateMember = async (req, res) => {
    if (!ObjectId.isValid(req.params.Id)) {
        res.status(400).json("Must use a valid member id to update member.");
    }
    const memberId = ObjectId.createFromHexString(req.params.Id);
    const member = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        membershipLevel: req.body.membershipLevel,
        membershipStartDate: req.body.membershipStartDate
    };

    const response = await mongodb.getDatabase().db().collection("members").replaceOne({ _id: memberId }, member);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while updating the member.");
    }
}

const deleteMember = async (req, res) => {
    if (!ObjectId.isValid(req.params.Id)) {
        res.status(400).json("Must use a valid member id to delete member.");
    }
    const memberId = ObjectId.createFromHexString(req.params.Id);
    const response = await mongodb.getDatabase().db().collection("members").deleteOne({ _id: memberId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while deleting the member.");
    }
}

module.exports = {
    getAll,
    getSingle,
    createMember,
    updateMember,
    deleteMember
}