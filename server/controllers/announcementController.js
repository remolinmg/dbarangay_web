const announcement = require('../models/announcementModel');
const fs = require('fs');

exports.createAnnouncement = async (req, res) => {
  const { what, where, when, who } = req.body;
  const { filename } = req.file;

  
  try {
    const newAnnouncement = new announcement({ what, where, when, who, filename });
    await newAnnouncement.save();
    res.send('File and text data saved to MongoDB');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving data to MongoDB');
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
  const newFile = req.file;

  try {
    // First, find the existing announcement
    const existingAnnouncement = await announcement.findById(id);

    if (!existingAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    // Check if a new file was uploaded
    if (newFile) {
      // Delete the old file if it exists
      if (existingAnnouncement.filename) {
        const filepath = `./uploads/announcement/${existingAnnouncement.filename}`;
        fs.unlink(filepath, (err) => {
          if (err) {
            console.error('Error deleting old file:', err);
          }
        });
      }

      // Update the announcement with the new file
      existingAnnouncement.filename = newFile.filename;
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