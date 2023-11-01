const promoteBusiness = require('../models/promoteBusinessModel');
const fs = require('fs');
const cloudinary = require('../uploads/cloudinary')
// Function to create a new promoteBusiness
exports.createPromoteBusiness = async (req, res) => {
  const {
    businessName,address,hours,category,contact,residentName
  } = req.body;
  const { path } = req.file;

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(path, {
      folder: 'promotebusiness',
    });

    const newPromoteBusiness = new promoteBusiness({
      businessName,address,hours,category,contact,residentName,
      filename: {
        url: result.secure_url, 
        public_id: result.public_id,
      },
    });


    await newPromoteBusiness.save();
    res.status(201).send('File and text data saved to MongoDB and Cloudinary');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving data to MongoDB and Cloudinary');
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
    // Upload the new image to Cloudinary
    const result = await cloudinary.uploader.upload(newFile.path, {
      folder: 'promotebusiness', // The folder for new images
    });

    // Update the announcement data with the new image URL
    existingPromoteBusiness.filename = {
      url: result.secure_url,
      public_id: result.public_id,
    };
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
