const userConstruction = require('../models/constructionModel');

async function createConstruction(req, res) {
  const{residentName,residentID,address,reasonOfRequest,pickUpDate,modeOfPayment,reference}=req.body=req.body
  const data = 
  {
    residentName:residentName,
    residentID:residentID,
    address:address,
    reasonOfRequest:reasonOfRequest,
    pickUpDate:pickUpDate,
    modeOfPayment:modeOfPayment,
    reference:reference
    }

  try{
    const check=await userConstruction.findOne({$and:[{residentName:residentName},{reasonOfRequest:reasonOfRequest},{pickUpDate:pickUpDate}]})
    if(check){
      res.status(400).json("exist")
    }
    else{
      res.status(201).json("notexist")
      await userConstruction.insertMany([data])
    }
  }
  catch(e){
    res.json("notexist")
  }
}


async function getConstruction(req, res) {
  try {
    const data = await userConstruction.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function deleteConstruction(req, res) {
  try {
    const deletedDocument = await userConstruction.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


async function updateConstruction(req, res) {
  const id = req.params.id;
  const updatedData= req.body;
  try {
    const updatedUserConstruction = await userConstruction.findByIdAndUpdate(
      id,updatedData,{ new: true } 
    );

    if (!updatedUserConstruction ) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedUserConstruction );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getUserConstructionPermit (req, res) {
  try {
    const residentID = req.params.id;
    const data = await userConstruction.find({ residentID });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createConstruction,
  getConstruction,
  deleteConstruction,
  updateConstruction,
  getUserConstructionPermit
};

