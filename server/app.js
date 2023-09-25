const mongoose=require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/capstone")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
});

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//start of user login and sign up
const userRegistration=new mongoose.Schema({
  firstName:{
      type:String,
      required:true
  },
  middleName:{
      type:String,
      required:true
  },
  lastName:{
      type:String,
      required:true
  },
  gender:{
      type:String,
      required:true
  },
  religion:{
      type:String,
      required:true
  },
  civilStatus:{
      type:String,
      required:true
  },
  employmentStatus:{
      type:String,
      required:true
  },
  highestEducation:{
      type:String,
      required:true
  },
  nationality:{
      type:String,
      required:true
  },
  address:{
      type:String,
      required:true
  },
  householdMember:{
      type:String,
      required:true
  },
  dateOfBirth:{
      type:String,
      required:true
  },
  phoneNumber:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  type:{
      type:String,
      default:'resident'
  },
  status:{
      type:String,
      default:'active'
  }
});
const user = mongoose.model("user",userRegistration);

// resident login

app.get("/login",cors(),(req,res)=>{

})

app.post("/login",async(req,res)=>{
  const{email,password,status}=req.body

  try{
    const check=await user.findOne({$and:[{email:email},{password:password},{status:status}]})
    if(check){
      res.json("exist")
    }
    else{
      res.json("notexist")
    }
  }
  catch(e){
    res.json("notexist")
  }
})



// resident sign up
app.post("/signup",async(req,res)=>{
  const{firstName,middleName,lastName,gender,religion,civilStatus,employmentStatus,highestEducation,nationality,address,householdMember,dateOfBirth,phoneNumber,email,password}=req.body=req.body
  const data = 
  {
    firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      gender: gender,
      religion: religion,
      civilStatus: civilStatus,
      employmentStatus: employmentStatus,
      highestEducation: highestEducation,
      nationality: nationality,
      address: address,
      householdMember: householdMember,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
      email: email,
      password: password}

  try{
    const check=await user.findOne({email:email})
    if(check){
      res.json("exist")
    }
    else{
      res.json("notexist")
      await user.insertMany([data])
    }
  }
  catch(e){
    res.json("notexist")
  }
})

//admin log in
app.get("/adminlogin",cors(),(req,res)=>{

})

app.post("/adminlogin",async(req,res)=>{
  const{email,password,type:type}=req.body

  try{
    const check=await user.findOne({$and:[{email:email},{password:password},{type:type}]})
    if(check){
      res.json("exist")
    }
    else{
      res.json("notexist")
    }
  }
  catch(e){
    res.json("notexist")
  }
})
//end of login and sign up user


//services
//Barangay Certificate
const barangayCertificate=new mongoose.Schema({
  residentName:{
      type:String,
      required:true
  },
  address:{
      type:String,
      required:true
  },
  reasonOfRequest:{
      type:String,
      required:true
  },
  pickUpDate:{
      type:String,
      required:true
  },
  modeOfPayment:{
    type:String,
    required:true
  },
  reference:{
    type:String
  },
  status:{
    type:String,
    default:'New'
}
});
const userCertificate = mongoose.model("barangaycertificate",barangayCertificate);

app.post("/barangaycertificate",async(req,res)=>{
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
})

//end of certificate

//permit
const businessClearance=new mongoose.Schema({
  businessName:{
      type:String,
      required:true
  },
  address:{
      type:String,
      required:true
  },
  residentName:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  reasonOfRequest:{
      type:String,
      required:true
  },
  pickUpDate:{
      type:String,
      required:true
  },
  modeOfPayment:{
    type:String,
    required:true
  },
  reference:{
    type:String
  },
  status:{
    type:String,
    default:'New'
}
});
const userBusinessClearance = mongoose.model("businessclearance",businessClearance);

app.post("/businessclearance",async(req,res)=>{
  const{businessName,address,residentName,type,reasonOfRequest,pickUpDate,modeOfPayment,reference}=req.body=req.body
  const data = 
  {
    businessName:businessName,
    address:address,
    residentName:residentName,
    type:type,
    reasonOfRequest:reasonOfRequest,
    pickUpDate:pickUpDate,
    modeOfPayment:modeOfPayment,
    reference:reference
    }

  try{
    const check=await userBusinessClearance.findOne({$and:[{businessName:businessName},{address:address},{pickUpDate:pickUpDate}]})
    if(check){
      res.json("exist")
    }
    else{
      res.json("notexist")
      await userBusinessClearance.insertMany([data])
    }
  }
  catch(e){
    res.json("notexist")
  }
})
//end of business clearance
//Barangay Indigency
const barangayIndigency=new mongoose.Schema({
  residentName:{
      type:String,
      required:true
  },
  address:{
      type:String,
      required:true
  },
  reasonOfRequest:{
      type:String,
      required:true
  },
  pickUpDate:{
      type:String,
      required:true
  },
  modeOfPayment:{
    type:String,
    required:true
  },
  reference:{
    type:String,
  },
  status:{
    type:String,
    default:'New'
}
});
const userIndigency = mongoose.model("barangayindigency",barangayIndigency);

app.post("/barangayindigency",async(req,res)=>{
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
    const check=await userIndigency.findOne({$and:[{residentName:residentName},{reasonOfRequest:reasonOfRequest},{pickUpDate:pickUpDate}]})
    if(check){
      res.json("exist")
    }
    else{
      res.json("notexist")
      await userIndigency.insertMany([data])
    }
  }
  catch(e){
    res.json("notexist")
  }
})

//end of indigency
//barangay id
const barangayID=new mongoose.Schema({
  residentName:{
      type:String,
      required:true
  },
  address:{
      type:String,
      required:true
  },
  pickUpDate:{
      type:String,
      required:true
  },
  modeOfPayment:{
    type:String,
    required:true
  },
  reference:{
    type:String,
  },
  status:{
    type:String,
    default:'New'
}
});
const userBarangayID = mongoose.model("barangayid",barangayID);

app.post("/barangayid",async(req,res)=>{
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
    const check=await userBarangayID.findOne({$and:[{residentName:residentName},{pickUpDate:pickUpDate}]})
    if(check){
      res.json("exist")
    }
    else{
      res.json("notexist")
      await userBarangayID.insertMany([data])
    }
  }
  catch(e){
    res.json("notexist")
  }
})
//end of barangayID

//installation
const installation=new mongoose.Schema({
  residentName:{
      type:String,
      required:true
  },
  address:{
      type:String,
      required:true
  },
  reasonOfRequest:{
      type:String,
      required:true
  },
  pickUpDate:{
      type:String,
      required:true
  },
  modeOfPayment:{
    type:String,
    required:true
  },
  reference:{
    type:String,
  },
  status:{
    type:String,
    default:'New'
}
});
const userInstallation = mongoose.model("installation",installation);

app.post("/installation",async(req,res)=>{
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
    const check=await userInstallation.findOne({$and:[{residentName:residentName},{address:address},{pickUpDate:pickUpDate}]})
    if(check){
      res.json("exist")
    }
    else{
      res.json("notexist")
      await userInstallation.insertMany([data])
    }
  }
  catch(e){
    res.json("notexist")
  }
})
//end of installation

//Construction
const construction=new mongoose.Schema({
  residentName:{
      type:String,
      required:true
  },
  address:{
      type:String,
      required:true
  },
  reasonOfRequest:{
      type:String,
      required:true
  },
  pickUpDate:{
      type:String,
      required:true
  },
  modeOfPayment:{
    type:String,
    required:true
  },
  reference:{
    type:String,
  },
  status:{
    type:String,
    default:'New'
}
});
const userConstruction = mongoose.model("construction",construction);

app.post("/construction",async(req,res)=>{
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
    const check=await userConstruction.findOne({$and:[{residentName:residentName},{reasonOfRequest:reasonOfRequest},{pickUpDate:pickUpDate}]})
    if(check){
      res.json("exist")
    }
    else{
      res.json("notexist")
      await userConstruction.insertMany([data])
    }
  }
  catch(e){
    res.json("notexist")
  }
})

//end of certificate

//get services
//get certificate
app.get("/get/barangaycertificate", async (req, res) => {
  try {
    const data = await userCertificate.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//end get certificate

//get business clearance
app.get("/get/businessclearance", async (req, res) => {
  try {
    const data = await userBusinessClearance.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//end get business clearance
//get indigency
app.get("/get/barangayindigency", async (req, res) => {
  try {
    const data = await userIndigency.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//end get indigency
//get get barangayid
app.get("/get/barangayid", async (req, res) => {
  try {
    const data = await userBarangayID.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//end get barangayid

//get get installation
app.get("/get/installation", async (req, res) => {
  try {
    const data = await userInstallation.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//end get installation

//get construction
app.get("/get/construction", async (req, res) => {
  try {
    const data = await userConstruction.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//end get construction

//DELETE FUNCTION
//delete barangaycertificate
app.delete(`/delete/barangaycertificate/:id`, async (req, res) => {
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
});
//end of delete barangaycertificate

//delete businessclearance
app.delete(`/delete/businessclearance/:id`, async (req, res) => {
  try {
    const deletedDocument = await userBusinessClearance.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//end of delete businessclearance
//delete barangayindigency
app.delete(`/delete/barangayindigency/:id`, async (req, res) => {
  try {
    const deletedDocument = await userIndigency.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//end of delete barangayindigency
//delete barangayid
app.delete(`/delete/barangayid/:id`, async (req, res) => {
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
});
//end of delete barangayid

//delete installation
app.delete(`/delete/installation/:id`, async (req, res) => {
  try {
    const deletedDocument = await userInstallation.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//end of delete installation

//delete construction
app.delete(`/delete/construction/:id`, async (req, res) => {
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
});
//end of delete construction
//END DELETE FUNCTION

//Edit data
//Edit certificate
app.put(`/update/barangaycertificate/:id`, async (req, res) => {
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
});
//End of Edit certificate
//Edit clearance
app.put(`/update/businessclearance/:id`, async (req, res) => {
  const id = req.params.id;
  const updatedData= req.body;
  try {
    const updatedUserBusinessClearance = await userBusinessClearance.findByIdAndUpdate(
      id,updatedData,{ new: true } 
    );

    if (!updatedUserBusinessClearance ) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedUserBusinessClearance );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//End of Edit clearance
//Edit indigency
app.put(`/update/barangayindigency/:id`, async (req, res) => {
  const id = req.params.id;
  const updatedData= req.body;
  try {
    const updatedUserIndigency = await userIndigency.findByIdAndUpdate(
      id,updatedData,{ new: true } 
    );

    if (!updatedUserIndigency) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedUserIndigency);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//End of Edit indigency
//Edit barangayid
app.put(`/update/barangayid/:id`, async (req, res) => {
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
});
//End of Edit barangayid
//Edit installation
app.put(`/update/installation/:id`, async (req, res) => {
  const id = req.params.id;
  const updatedData= req.body;
  try {
    const updatedUserInstallation = await userInstallation.findByIdAndUpdate(
      id,updatedData,{ new: true } 
    );

    if (!updatedUserInstallation ) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedUserInstallation );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//End of Edit installation
//Edit construction
app.put(`/update/construction/:id`, async (req, res) => {
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
});
//End of Edit construction
//End of Edit Data

app.listen(8000,()=>{
  console.log("port connected");
})
