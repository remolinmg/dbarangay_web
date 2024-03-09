const userEmergency = require('../models/emergencyModel');

exports.getEmergency = async (req, res) => {
    try {
      const data = await userEmergency.find().sort({createdAt: -1});
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  
exports.updateEmergency = async (req, res) => {
    const id = req.params.id;
    const updatedData= req.body;
    try {
      const updatedUserEmergency = await userEmergency.findByIdAndUpdate(
        id,updatedData,{ new: true } 
      );
  
      if (!updatedUserEmergency) {
        return res.status(404).json({ message: 'Emergency not found' });
      }else{
        res.status(200).json(updatedUserEmergency);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.deleteEmergency = async (req, res) => {
    try {
      const deletedDocument = await userEmergency.findByIdAndDelete(req.params.id);
      if (!deletedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.json({ message: 'Document deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  