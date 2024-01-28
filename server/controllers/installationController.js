const userInstallation = require('../models/installationModel');
const StaffLogs = require("../models/staffLogsModel");

const createInstallation = async (req, res) => {
  const {
    residentName,
    userId,
    address,
    reasonOfRequest,
    pickUpDate,
    modeOfPayment,
    reference,
    tFirstName,
    tLastName
  } = req.body;

  const data = {
    residentName,
    userId,
    address,
    reasonOfRequest,
    pickUpDate,
    modeOfPayment,
    reference,
  };

  try {
    const check = await userInstallation.findOne({
      residentName,
      address,
      pickUpDate,
    });

    if (check) {
      res.status(400).json('exist');
    } else {
      const date = new Date();
      const accessDate = date.toISOString().slice(0, 10);
      const accessTime =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const name = tFirstName + " " + tLastName;
      const activity = "Created a Barangay Installation Request";

      const newCustomData = new StaffLogs({
        name: name,
        accessDate: accessDate,
        accessTime: accessTime,
        activity: activity,
      });
      await newCustomData.save();
      await userInstallation.create(data);
      res.status(201).json('notexist');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

const getInstallations = async (req, res) => {
  try {
    const data = await userInstallation.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

const deleteInstallation = async (req, res) => {
  try {
    const deletedDocument = await userInstallation.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

const updateInstallation = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const updatedInstallation = await userInstallation.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedInstallation) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedInstallation);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

async function getUserInstallationPermit(req, res) {
  try {
    const userId = req.params.id;
    const data = await userInstallation.find({ userId });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  createInstallation,
  getInstallations,
  deleteInstallation,
  updateInstallation,
  getUserInstallationPermit
};
