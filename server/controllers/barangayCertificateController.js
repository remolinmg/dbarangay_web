const userCertificate = require('../models/barangayCertificateModel');

exports.createCertificate = async (req, res) => {
  const{residentName,address,reasonOfRequest,pickUpDate,modeOfPayment,reference}=req.body=req.body
  const data = 
  {
    residentName:residentName,
    address:address,
    reasonOfRequest:reasonOfRequest,
    pickUpDate:pickUpDate,
    modeOfPayment:modeOfPayment,
    reference:reference
    }

  try{
    const check=await userCertificate.findOne({$and:[{residentName:residentName},{reasonOfRequest:reasonOfRequest},{pickUpDate:pickUpDate}]})
    if(check){
      res.json("exist")
    }
    else{
      res.json("notexist")
      await userCertificate.insertMany([data])
    }
  }
  catch(e){
    res.json("notexist")
  }
};

exports.getCertificates = async (req, res) => {
  try {
    const data = await userCertificate.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateCertificate = async (req, res) => {
  const id = req.params.id;
  const updatedData= req.body;
  try {
    const updatedUserCertificate = await userCertificate.findByIdAndUpdate(
      id,updatedData,{ new: true } 
    );

    if (!updatedUserCertificate) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedUserCertificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const deletedDocument = await userCertificate.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};