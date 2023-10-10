const promoteBusiness = require('../models/promoteBusinessModel');
const fs = require('fs');

// Function to create a new promoteBusiness
exports.createPromoteBusiness = async (req, res) => {
  const {
    businessName,address,hours,category,contact,residentName
  } = req.body;
  const { filename } = req.file;

  try {
    const newPromoteBusiness = new promoteBusiness({
      businessName,address,hours,category,contact,residentName, filename
    });
    await newPromoteBusiness.save();
    res.status(201).send('File and text data saved to MongoDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving data to MongoDB');
  }
};

// Function to get all promoteBusiness
exports.getPromoteBusiness = async (req, res) => {
  try {
    const data = await promoteBusiness.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete an promoteBusiness by ID
exports.deletePromoteBusiness = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDocument = await promoteBusiness.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    const filename = `./uploads/promotebusiness/${deletedDocument.filename}`;
    fs.unlink(filename, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error deleting file' });
      }
      res.json({ message: 'Document and file deleted successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update an promoteBusiness by ID
exports.updatePromoteBusiness = async (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  const newFile = req.file;

  try {
    // First, find the existing promoteBusiness
    const existingPromoteBusiness = await promoteBusiness.findById(id);

    if (!existingPromoteBusiness) {
      return res.status(404).json({ message: 'Promote Business not found' });
    }

    // Check if a new file was uploaded
    if (newFile) {
      // Delete the old file if it exists
      if (existingPromoteBusiness.filename) {
        const filepath = `./uploads/promotebusiness/${existingPromoteBusiness.filename}`;
        fs.unlink(filepath, (err) => {
          if (err) {
            console.error('Error deleting old file:', err);
          }
        });
      }

      // Update the promoteBusiness with the new file
      existingPromoteBusiness.filename = newFile.filename;
    }

    // Update the promoteBusiness with new data (excluding the file)
    existingPromoteBusiness.set(formData);

    const updatedPromoteBusiness = await existingPromoteBusiness.save();

    res.status(200).json(updatedPromoteBusiness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
