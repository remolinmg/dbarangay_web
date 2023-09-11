const mongoose=require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/capstone")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
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
    }
})

const user = mongoose.model("user",newSchema)

module.exports=user