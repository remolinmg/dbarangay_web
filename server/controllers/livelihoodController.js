const livelihood = require('../models/livelihoodModel');
const fs = require('fs');
const cloudinary = require('../uploads/cloudinary');

// Function to create a new livelihood
exports.createLivelihood = async (req, res) => {
  const { what, where, when, who } = req.body;
  const { path } = req.file;

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(path, {
      folder: 'livelihood', // You can change the folder name as needed
    });

    const newLivelihood = new livelihood({
      what,
      where,
      when,
      who,
      filename: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });

    await newLivelihood.save();
    res.status(201).send('File and text data saved to MongoDB and Cloudinary');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving data to MongoDB and Cloudinary');
  }
};


// Function to get all livelihood
exports.getAllLivelihood = async (req, res) => {
  try {
    const data = await livelihood.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete an livelihood by ID
exports.deleteLivelihood = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDocument = await livelihood.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    const filename = `./uploads/livelihood/${deletedDocument.filename}`;
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

// Function to update an livelihood by ID
// Function to update a livelihood by ID
exports.updateLivelihood = async (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  const newFile = req.file;

  try {
    // First, find the existing livelihood
    const existingLivelihood = await livelihood.findById(id);

    if (!existingLivelihood) {
      return res.status(404).json({ message: 'Livelihood not found' });
    }

    // Check if a new file was uploaded
    if (newFile) {
      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(newFile.path, {
        folder: 'livelihood', // The folder for new images
      });

      // Update the livelihood data with the new image URL
      existingLivelihood.filename = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Update the livelihood with new data (excluding the file)
    existingLivelihood.set(formData);

  const updatedLivelihood = await existingLivelihood.save();

  res.status(200).json(updatedLivelihood);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
};
