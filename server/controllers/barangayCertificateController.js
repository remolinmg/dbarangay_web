const userCertificate = require("../models/barangayCertificateModel");
const StaffLogs = require("../models/staffLogsModel");

exports.createCertificate = async (req, res) => {
  const {
    residentName,
    userId,
    address,
    reasonOfRequest,
    pickUpDate,
    modeOfPayment,
    reference,
    tFirstName,
    tLastName,
  } = (req.body = req.body);
  const data = {
    residentName: residentName,
    userId: userId,
    address: address,
    reasonOfRequest: reasonOfRequest,
    pickUpDate: pickUpDate,
    modeOfPayment: modeOfPayment,
    reference: reference,
  };

  try {
    const check = await userCertificate.findOne({
      $and: [
        { residentName: residentName },
        { reasonOfRequest: reasonOfRequest },
        { pickUpDate: pickUpDate },
      ],
    });
    if (check) {
      res.status(400).json("exist");
    } else {
      res.status(201).json("notexist");
      const date = new Date();
      const accessDate = date.toISOString().slice(0, 10);
      const accessTime =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const name = tFirstName + " " + tLastName;
      const activity = "Created a Barangay Certificate Request";

      const newCustomData = new StaffLogs({
        name: name,
        accessDate: accessDate,
        accessTime: accessTime,
        activity: activity,
      });
      await newCustomData.save();
      await userCertificate.insertMany([data]);
    }
  } catch (e) {
    res.json("notexist");
  }
};

exports.getCertificates = async (req, res) => {
  try {
    const data = await userCertificate.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCertificate = async (req, res) => {
  const id = req.params.id;
  const { updatedData } = req.body;

  try {
    if (!updatedData) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const updatedUserCertificate = await userCertificate.findByIdAndUpdate(
      id,
      {
        residentName: updatedData.residentName,
        address: updatedData.address,
        reasonOfRequest: updatedData.reasonOfRequest,
        pickUpDate: updatedData.pickUpDate,
        modeOfPayment: updatedData.modeOfPayment,
        reference: updatedData.reference,
        status: updatedData.status,
      },
      { new: true }
    );

    if (!updatedUserCertificate) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Add your custom data logging logic if needed
    // const date = new Date();
    // const accessDate = date.toISOString().slice(0, 10);
    // const accessTime =
    //   date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    // const name = updatedData.tFirstName + " " + updatedData.tLastName;
    // const activity = "Edited a Barangay Certificate Request";

    // const newCustomData = new StaffLogs({
    //   name: name,
    //   accessDate: accessDate,
    //   accessTime: accessTime,
    //   activity: activity,
    // });
    // await newCustomData.save();

    res.status(200).json(updatedUserCertificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.deleteCertificate = async (req, res) => {
  try {
    const deletedDocument = await userCertificate.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    const { tFirstName, tLastName,reasonDelete} = req.body;
    const date = new Date();
    const accessDate = date.toISOString().slice(0, 10);
    const accessTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const name = tFirstName + " " + tLastName;
    const activity = "Deleted a Barangay Certificate Request due to " + reasonDelete;

    const newCustomData = new StaffLogs({
      name: name,
      accessDate: accessDate,
      accessTime: accessTime,
      activity: activity,
    });
    await newCustomData.save();

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserBrgyCert = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await userCertificate.find({ userId });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
