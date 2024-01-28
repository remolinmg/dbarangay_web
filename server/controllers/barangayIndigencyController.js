const userIndigency = require('../models/barangayIndigencyModel');
const StaffLogs = require("../models/staffLogsModel");

// POST /barangayindigency
exports.createIndigency = async (req, res) => {
  const { residentName, userId, address, reasonOfRequest, pickUpDate, modeOfPayment, reference, tFirstName, tLastName } = req.body;

  try {
    const check = await userIndigency.findOne({
      $and: [{ residentName }, { reasonOfRequest }, { pickUpDate }],
    });

    if (check) {
      res.status(400).json('exist');
    } else {
      res.status(201).json('notexist');
      const date = new Date();
      const accessDate = date.toISOString().slice(0, 10);
      const accessTime =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const name = tFirstName + " " + tLastName;
      const activity = "Created a Barangay Indigency Request";

      const newCustomData = new StaffLogs({
        name: name,
        accessDate: accessDate,
        accessTime: accessTime,
        activity: activity,
      });

      await newCustomData.save();
      await userIndigency.create({
        residentName,
        userId,
        address,
        reasonOfRequest,
        pickUpDate,
        modeOfPayment,
        reference,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// GET /get/barangayindigency
exports.getIndigencyList = async (req, res) => {
  try {
    const data = await userIndigency.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// DELETE /delete/barangayindigency/:id
exports.deleteIndigency = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDocument = await userIndigency.findByIdAndDelete(id);

    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// PUT /update/barangayindigency/:id
exports.updateIndigency = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const updatedIndigency = await userIndigency.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedIndigency) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedIndigency);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

exports.getUserBrgyIndigency = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await userIndigency.find({ userId });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
