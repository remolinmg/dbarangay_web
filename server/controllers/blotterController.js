const blotter = require('../models/blotterModel');

// Function to create a new blotter
exports.createBlotter = async (req, res) => {
  const {
    date,complainant,defendant,type,address,kind,status,documentation
  } = req.body;

  try {
    const newBlotter = new blotter({
      date,complainant,defendant,type,address,kind,status,documentation
    });
    await newBlotter.save();
    res.status(201).send('File and text data saved to MongoDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving data to MongoDB');
  }
};

// Function to get all blotter
exports.getBlotter = async (req, res) => {
  try {
    const data = await blotter.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete an blotter by ID
exports.deleteBlotter = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDocument = await blotter.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
      res.json({ message: 'Document and file deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update an blotter by ID
exports.updateBlotter = async (req, res) => {
  const id = req.params.id;
  const formData = req.body;

  try {
    // First, find the existing blotter
    const existingBlotter = await blotter.findById(id);

    if (!existingBlotter) {
      return res.status(404).json({ message: 'Blotter not found' });
    }
    existingBlotter.set(formData);
    const updatedBlotter = await existingBlotter.save();
    res.status(200).json(updatedBlotter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};