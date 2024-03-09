const health = require("../models/healthModel");
const StaffLogs = require("../models/staffLogsModel");
// Function to create a new health
exports.createHealth = async (req, res) => {
  const {
    date,
    reporter,
    respondents,
    type,
    address,
    status,
    documentation,
    tFirstName,
    tLastName,
  } = (req.body = req.body);

  const data = {
    date,
    reporter,
    respondents,
    type,
    address,
    status,
    documentation,
  };

  try {
    const check = await health.findOne({
      $and: [{ date }, { reporter }, { respondents }, { type }],
    });

    if (check) {
      return res.status(400).json("Error saving data to MongoDB");
    }

    const currentDate = new Date();
    const accessDate = currentDate.toISOString().slice(0, 10);
    const accessTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    const name = `${tFirstName} ${tLastName}`;
    const activity = "Created a Medical Report";

    const newCustomData = new StaffLogs({
      name,
      accessDate,
      accessTime,
      activity,
    });

    await newCustomData.save();
    await health.insertMany([data]);
    //sadasaw

    return res.status(201).send("File and text data saved to MongoDB");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error saving data to MongoDB");
  }
};

// Function to get all health
exports.getHealth = async (req, res) => {
  try {
    const data = await health.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete an health by ID
exports.deleteHealth = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDocument = await health.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json({ message: "Document and file deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to update an health by ID
exports.updateHealth = async (req, res) => {
  const id = req.params.id;
  const formData = req.body;

  try {
    // First, find the existing health
    const updatedHealth = await health.findByIdAndUpdate(id, formData, {
      new: true,
    });

    if (!updatedHealth) {
      return res.status(404).json({ message: "Health not found" });
    }
    res.status(200).json(updatedHealth);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
