const announcement = require('../models/announcementModel');
const fs = require('fs');
const cloudinary = require('../uploads/cloudinary')
const StaffLogs = require('../models/staffLogsModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.createAnnouncement = async (req, res) => {
  const { what, where, when, who } = req.body;
  const { path } = req.file;

  const token = 'access_token';
  const secretKey = 'y7y9u92348y5789yye789yq234785y78q34y78oghio';

  try {
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
      } else {
        const userId = decoded.id;
        const userEmail = decoded.email;
        const userFirstName = decoded.firstName;
        const userLastName = decoded.lastName;
        const userType = decoded.type;

        const date = new Date();
        const accessDate = date.toISOString().slice(0, 10);
        const accessTime =
          date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const name = userFirstName + ' ' + userLastName;
        const activity = 'Created an announcement';

        console.log(name);

        // Here, you can perform operations that use the decoded data
        const newCustomData = new StaffLogs({
          name: name,
          email: userEmail,
          accessDate: accessDate,
          accessTime: accessTime,
          activity: activity,
        });

        // Save the new staff log data
        await newCustomData.save();
      }
    });



    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(path, {
      folder: 'annoucement',
    });

    const newAnnouncement = new announcement({
      what: what,
      where: where,
      when: when,
      who: who,
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
