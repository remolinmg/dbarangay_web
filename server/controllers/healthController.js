const health = require('../models/healthModel');
const fs = require('fs');

// Function to create a new health
exports.createHealth = async (req, res) => {
  const {
    date,reporter,respondents,type,address,status,documentation
  } = req.body;


  try {
    const newHealth = new health({
      date,reporter,respondents,type,address,status, documentation
    });
    await newHealth.save();
    res.status(201).send('File and text data saved to MongoDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving data to MongoDB');
  }
};

// Function to get all health
exports.getHealth = async (req, res) => {
  try {
    const data = await health.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete an health by ID
exports.deleteHealth= async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDocument = await health.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
      res.json({ message: 'Document and file deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update an health by ID
exports.updateHealth = async (req, res) => {
  const id = req.params.id;
  const formData = req.body;

  try {
    // First, find the existing health
    const existingHealth = await health.findById(id);

    if (!existingHealth) {
      return res.status(404).json({ message: 'Health not found' });
    }
    existingHealth.set(formData);
    const updatedHealth = await existingHealth.save();
    res.status(200).json(updatedHealth);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
