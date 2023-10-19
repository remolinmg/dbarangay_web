const userIndigency = require('../models/barangayIndigencyModel');

// POST /barangayindigency
exports.createIndigency = async (req, res) => {
  const { residentName, address, reasonOfRequest, pickUpDate, modeOfPayment, reference } = req.body;

  try {
    const check = await userIndigency.findOne({
      $and: [{ residentName }, { reasonOfRequest }, { pickUpDate }],
    });

    if (check) {
      res.status(400).json('exist');
    } else {
      res.status(201).json('notexist');
      await userIndigency.create({
        residentName,
        address,
        reasonOfRequest,
        pickUpDate,
        modeOfPayment,
        reference,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// GET /get/barangayindigency
exports.getIndigencyList = async (req, res) => {
  try {
    const data = await userIndigency.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// DELETE /delete/barangayindigency/:id
exports.deleteIndigency = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDocument = await userIndigency.findByIdAndDelete(id);

    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// PUT /update/barangayindigency/:id
exports.updateIndigency = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const updatedIndigency = await userIndigency.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedIndigency) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedIndigency);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};
