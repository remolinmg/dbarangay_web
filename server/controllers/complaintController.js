const complaint = require('../models/complaintModel');

// Function to create a new complaint
exports.createComplaint = async (req, res) => {
  const {
    date,complainant,defendant,complainttype,address,kind,status, documentation
  } = req.body;

  try {
    const newComplaint = new complaint({
      date,complainant,defendant,complainttype,address,kind,status, documentation
    });
    await newComplaint.save();
    res.status(201).send('File and text data saved to MongoDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving data to MongoDB');
  }
};

// Function to get all complaint
exports.getComplaint = async (req, res) => {
  try {
    const data = await complaint.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete an complaint by ID
exports.deleteComplaint = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDocument = await complaint.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
      res.json({ message: 'Document and file deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update an complaint by ID
exports.updateComplaint = async (req, res) => {
  const id = req.params.id;
  const formData = req.body;

  try {
    // First, find the existing complaint
    const existingComplaint = await complaint.findById(id);

    if (!existingComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    existingComplaint.set(formData);
    const updatedComplaint = await existingComplaint.save();
    res.status(200).json(updatedComplaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
