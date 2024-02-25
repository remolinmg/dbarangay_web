const complaint = require('../models/complaintModel');
const StaffLogs = require("../models/staffLogsModel");

// Function to create a new complaint
exports.createComplaint = async (req, res) => {
  const {
    date, complainant, defendant, complainttype, address, kind, status, documentation, tFirstName, tLastName
  } = req.body = req.body
  const data =
  {
    date: date,
    complainant: complainant,
    defendant: defendant,
    complainttype: complainttype,
    address: address,
    kind: kind,
    status: status,
    documentation: documentation
  }

  try {
    const check = await complaint.findOne({ $and: [{ date: date }, { complainant: complainant }, { defendant: defendant }, { complainttype: complainttype }] })
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
      const activity = "Created a Barangay Complaint Data";

      const newCustomData = new StaffLogs({
        name: name,
        accessDate: accessDate,
        accessTime: accessTime,
        activity: activity,
      });
      await newCustomData.save();
      await complaint.insertMany([data])
    }
  }
  catch (e) {
    res.status(500).send('Error saving data to MongoDB');
  }
};

// Function to get all complaint
exports.getComplaint = async (req, res) => {
  try {
    const data = await complaint.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete an complaint by ID
exports.deleteComplaint = async (req, res) => {
  const id = req.params.id;

  try {

    const { tFirstName, tLastName } = req.body
    const date = new Date();
    const accessDate = date.toISOString().slice(0, 10);
    const accessTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const name = tFirstName + " " + tLastName;
    const activity = "Deleted a Barangay Complaint Data";

    const newCustomData = new StaffLogs({
      name: name,
      accessDate: accessDate,
      accessTime: accessTime,
      activity: activity,
    });
    await newCustomData.save();
    const deletedDocument = await complaint.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document and file deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update an complaint by ID
exports.updateComplaint = async (req, res) => {
  const id = req.params.id;
  const formData = req.body;

  try {
    // First, find the existing complaint
    const updatedComplaint = await complaint.findByIdAndUpdate(
      id, formData, { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(updatedComplaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
