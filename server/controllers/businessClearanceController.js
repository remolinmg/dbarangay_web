const userBusinessClearance = require('../models/businessClearanceModule');
const StaffLogs = require("../models/staffLogsModel");

// Handle POST request
exports.createBusinessClearance = async (req, res) => {
  const { businessName, address, residentName, userId, type, reasonOfRequest, pickUpDate, modeOfPayment, reference, tFirstName, tLastName } = req.body;

  const data = {
    businessName: businessName,
    address: address,
    residentName: residentName,
    userId: userId,
    type: type,
    reasonOfRequest: reasonOfRequest,
    pickUpDate: pickUpDate,
    modeOfPayment: modeOfPayment,
    reference: reference
  }

  try {
    const check = await userBusinessClearance.findOne({ $and: [{ businessName: businessName }, { address: address }, { pickUpDate: pickUpDate }] })
    
    if (check) {
      res.status(400).json("exist");
    } else {
      res.status(201).json("notexist");

      // Move the database operation outside of the else block
      const date = new Date();
      const accessDate = date.toISOString().slice(0, 10);
      const accessTime =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const name = tFirstName + " " + tLastName;
      const activity = "Created a Business Permit Request";

      const newCustomData = new StaffLogs({
        name: name,
        accessDate: accessDate,
        accessTime: accessTime,
        activity: activity,
      });
      
      await newCustomData.save();
      await userBusinessClearance.insertMany([data]);
    }
  } catch (e) {
    res.status(500).json("error");
  }
};

// Handle GET request
exports.getBusinessClearances = async (req, res) => {
  try {
    const data = await userBusinessClearance.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Handle DELETE request
exports.deleteBusinessClearance = async (req, res) => {
  try {
    const deletedDocument = await userBusinessClearance.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    const { tFirstName, tLastName } = req.body
    const date = new Date();
    const accessDate = date.toISOString().slice(0, 10);
    const accessTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const name = tFirstName + " " + tLastName;
    const activity = "Deleted a Business Permit Request";

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
};

// Handle PUT request
exports.updateBusinessClearance = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const updatedUserBusinessClearance = await userBusinessClearance.findByIdAndUpdate(
      id, updatedData, { new: true }
    );

    if (!updatedUserBusinessClearance) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedUserBusinessClearance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserBusinessClearance = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await userBusinessClearance.find({ userId });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};