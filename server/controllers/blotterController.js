const blotter = require('../models/blotterModel');
const StaffLogs = require("../models/staffLogsModel");

// Function to create a new blotter
exports.createBlotter = async (req, res) => {
  const {
    date, complainant, defendant, type, address, kind, status, documentation, tFirstName, tLastName
  } = req.body = req.body
  const data =
  {
    date: date,
    complainant: complainant,
    defendant: defendant,
    type: type,
    address: address,
    kind: kind,
    status: status,
    documentation: documentation
  }

  try {
    const check = await blotter.findOne({ $and: [{ date: date }, { complainant: complainant }, { defendant: defendant }, { type: type }] })
    if (check) {
      res.status(400).json('Error saving data to MongoDB')
    }
    else {
      res.status(201).send('File and text data saved to MongoDB');
      const date = new Date();
      const accessDate = date.toISOString().slice(0, 10);
      const accessTime =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const name = tFirstName + " " + tLastName;
      const activity = "Created a Blotter Data";

      const newCustomData = new StaffLogs({
        name: name,
        accessDate: accessDate,
        accessTime: accessTime,
        activity: activity,
      });
      await newCustomData.save();
      await blotter.insertMany([data])
    }
  }
  catch (e) {
    res.status(500).send('Error saving data to MongoDB');
  }
};

// Function to get all blotter
exports.getBlotter = async (req, res) => {
  try {
    const data = await blotter.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete an blotter by ID
exports.deleteBlotter = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDocument = await blotter.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document and file deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update an blotter by ID
exports.updateBlotter = async (req, res) => {
  const id = req.params.id;
  const formData = req.body;

  try {
    // First, find the existing blotter
    const updatedBlotter = await blotter.findByIdAndUpdate(
      id, formData, { new: true }
    );

    if (!updatedBlotter) {
      return res.status(404).json({ message: 'Blotter not found' });
    }
    res.status(200).json(updatedBlotter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};