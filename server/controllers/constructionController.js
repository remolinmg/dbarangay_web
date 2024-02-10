const userConstruction = require('../models/constructionModel');
const StaffLogs = require("../models/staffLogsModel");

async function createConstruction(req, res) {
  const { residentName, userId, address, reasonOfRequest, pickUpDate, modeOfPayment, reference, tFirstName, tLastName } = req.body = req.body
  const data =
  {
    residentName: residentName,
    userId: userId,
    address: address,
    reasonOfRequest: reasonOfRequest,
    pickUpDate: pickUpDate,
    modeOfPayment: modeOfPayment,
    reference: reference
  }

  try {
    const check = await userConstruction.findOne({ $and: [{ residentName: residentName }, { reasonOfRequest: reasonOfRequest }, { pickUpDate: pickUpDate }] })
    if (check) {
      res.status(400).json("exist")
    }
    else {
      res.status(201).json("notexist")
      const date = new Date();
      const accessDate = date.toISOString().slice(0, 10);
      const accessTime =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const name = tFirstName + " " + tLastName;
      const activity = "Created a Construction Request";

      const newCustomData = new StaffLogs({
        name: name,
        accessDate: accessDate,
        accessTime: accessTime,
        activity: activity,
      });
      await newCustomData.save();
      await userConstruction.insertMany([data]);
    }
  }
  catch (e) {
    res.json("notexist")
  }
}


async function getConstruction(req, res) {
  try {
    const data = await userConstruction.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function deleteConstruction(req, res) {
  try {
    const deletedDocument = await userConstruction.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    const { tFirstName, tLastName } = req.body = req.body
    const date = new Date();
    const accessDate = date.toISOString().slice(0, 10);
    const accessTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const name = tFirstName + " " + tLastName;
    const activity = "Deleted a Construction Permit Request";

    const newCustomData = new StaffLogs({
      name: name,
      accessDate: accessDate,
      accessTime: accessTime,
      activity: activity,
    });
    await newCustomData.save();
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


async function updateConstruction(req, res) {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const updatedUserConstruction = await userConstruction.findByIdAndUpdate(
      id, updatedData, { new: true }
    );

    if (!updatedUserConstruction) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedUserConstruction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getUserConstructionPermit(req, res) {
  try {
    const userId = req.params.id;
    const data = await userConstruction.find({ userId });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createConstruction,
  getConstruction,
  deleteConstruction,
  updateConstruction,
  getUserConstructionPermit
};

