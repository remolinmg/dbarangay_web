const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/login",cors(),(req,res)=>{

})

app.post("/login",async(req,res)=>{
  const{email,password}=req.body

  try{
    const check=await collection.findOne({email:email})
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
    const check=await collection.findOne({email:email})
    if(check){
      res.json("exist")
    }
    else{
      res.json("notexist")
      await collection.insertMany([data])
    }
  }
  catch(e){
    res.json("notexist")
  }
})

app.listen(8000,()=>{
  console.log("port connected");
})