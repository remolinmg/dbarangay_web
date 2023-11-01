const announcement = require('../models/announcementModel');
const fs = require('fs');
const cloudinary = require('../uploads/cloudinary')

exports.createAnnouncement = async (req, res) => {
  const { what, where, when, who } = req.body;
  const { path } = req.file;

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(path, {
      folder: 'annoucement',
    });

    const newAnnouncement = new announcement({
      what:what,
      where:where,
      when:when,
      who:who,
      filename: {
        url: result.secure_url, 
        public_id: result.public_id,
      },
    });

    await newAnnouncement.save();
    res.send('File and text data saved to MongoDB and Cloudinary');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving data to MongoDB and Cloudinary');
  }
};



exports.getAllAnnouncements = async (req, res) => {
  try {
    const data = await announcement.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDocument = await announcement.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const filename = `./uploads/announcement/${deletedDocument.filename}`;
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

// Function to update an announcement by ID
exports.updateAnnouncement = async (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  const newFile = req.file; // The new image file

  try {
    // First, find the existing announcement
    const existingAnnouncement = await announcement.findById(id);

    if (!existingAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    // Check if a new file was uploaded
    if (newFile) {
      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(newFile.path, {
        folder: 'announcement', // The folder for new images
      });

      // Update the announcement data with the new image URL
      existingAnnouncement.filename = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Update the announcement with new data (excluding the file)
    existingAnnouncement.set(formData);

    const updatedAnnouncement = await existingAnnouncement.save();

    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
