const userBarangayID = require('../models/barangayIDModel');

// Controller functions

module.exports = {
  createBarangayId: async (req, res) => {
    const{residentName,userId,address,reasonOfRequest,pickUpDate,modeOfPayment,reference}=req.body=req.body
  const data = 
  {
    residentName:residentName,
    userId: userId,
    address:address,
    reasonOfRequest:reasonOfRequest,
    pickUpDate:pickUpDate,
    modeOfPayment:modeOfPayment,
    reference:reference
    }

  try{
    const check=await userBarangayID.findOne({$and:[{residentName:residentName},{pickUpDate:pickUpDate}]})
    if(check){
      res.status(400).json("exist")
    }
    else{
      res.status(201).json("notexist")
      await userBarangayID.insertMany([data])
    }
  }
  catch(e){
    res.json("notexist")
  }
  },

  getAllBarangayIds: async (req, res) => {
    try {
      const data = await userBarangayID.find();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteBarangayId: async (req, res) => {
    try {
      const deletedDocument = await userBarangayID.findByIdAndDelete(req.params.id);
      if (!deletedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.json({ message: 'Document deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateBarangayId: async (req, res) => {
  const id = req.params.id;
  const updatedData= req.body;
  try {
    const updatedUserBarangayID = await userBarangayID.findByIdAndUpdate(
      id,updatedData,{ new: true } 
    );

    if (!updatedUserBarangayID ) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedUserBarangayID );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  },

  getUserBrgyID: async (req, res) => {
    try {
      const userId = req.params.id;
      const data = await userBarangayID.find({ userId });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
