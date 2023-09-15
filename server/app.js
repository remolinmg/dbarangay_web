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
  }
});
const userCertificate = mongoose.model("barangaycertificate",barangayCertificate);

app.post("/barangaycertificate",async(req,res)=>{
  const{residentName,address,reasonOfRequest,pickUpDate}=req.body=req.body
  const data = 
  {
    residentName:residentName,
    address:address,
    reasonOfRequest:reasonOfRequest,
    pickUpDate:pickUpDate
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
  }
});
const userBusinessClearance = mongoose.model("businessclearance",businessClearance);

app.post("/businessclearance",async(req,res)=>{
  const{businessName,address,residentName,type,reasonOfRequest,pickUpDate}=req.body=req.body
  const data = 
  {
    businessName:businessName,
    address:address,
    residentName:residentName,
    type:type,
    reasonOfRequest:reasonOfRequest,
    pickUpDate:pickUpDate
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
  }
});
const userBarangayID = mongoose.model("barangayid",barangayID);

app.post("/barangayid",async(req,res)=>{
  const{residentName,address,reasonOfRequest,pickUpDate}=req.body=req.body
  const data = 
  {
    residentName:residentName,
    address:address,
    reasonOfRequest:reasonOfRequest,
    pickUpDate:pickUpDate
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
  }
});
const userInstallation = mongoose.model("installation",installation);

app.post("/installation",async(req,res)=>{
  const{residentName,address,reasonOfRequest,pickUpDate}=req.body=req.body
  const data = 
  {
    residentName:residentName,
    address:address,
    reasonOfRequest:reasonOfRequest,
    pickUpDate:pickUpDate
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
  }
});
const userConstruction = mongoose.model("construction",construction);

app.post("/construction",async(req,res)=>{
  const{residentName,address,reasonOfRequest,pickUpDate}=req.body=req.body
  const data = 
  {
    residentName:residentName,
    address:address,
    reasonOfRequest:reasonOfRequest,
    pickUpDate:pickUpDate
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

app.listen(8000,()=>{
  console.log("port connected");
})