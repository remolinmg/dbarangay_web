const official = require('../models/officialModel');
const fs = require('fs');
const cloudinary = require('../uploads/cloudinary')

// Function to create a new official
exports.createOfficial = async (req, res) => {
  const {
    position, firstName, middleName, lastName, contact, address, startTerm, endTerm
  } = req.body;
  const { path } = req.file;

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(path, {
      folder: 'official',
    });

    const newOfficial = new official({
      position, firstName, middleName, lastName, contact, address, startTerm, endTerm,
      filename: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
    await newOfficial.save();
    res.status(201).send('File and text data saved to MongoDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving data to MongoDB');
  }
};

// Function to get all officials
exports.getAllOfficials = async (req, res) => {
  try {
    const data = await official.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete an official by ID
exports.deleteOfficial = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDocument = await official.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    const filename = `./uploads/official/${deletedDocument.filename}`;
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

// Function to update an official by ID
exports.updateOfficial = async (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  const newFile = req.file;

  try {
    // First, find the existing official
    const existingOfficial = await official.findById(id);

    if (!existingOfficial) {
      return res.status(404).json({ message: 'Official not found' });
    }

    // Check if a new file was uploaded
    if (newFile) {
      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(newFile.path, {
        folder: 'official', // The folder for new images
      });
      

      // Update the official with the new file
      existingOfficial.filename = {
        url: result.secure_url,
        public_id: result.public_id,
      }
    }

    // Update the official with new data (excluding the file)
    existingOfficial.set(formData);

    const updatedOfficial = await existingOfficial.save();

    res.status(200).json(updatedOfficial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
