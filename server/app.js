const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://dbarangay:dIgrzUEvSPjrUWxu@dbarangay.nszcm1t.mongodb.net/")
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log(e);
});
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const multer = require('multer');
const cookieParser = require('cookie-parser');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const barangayCertificateRoutes =  require('./routes/barangayCertificateRoutes');
const businessClearanceRoutes =  require('./routes/businessClearanceRoutes');
const barangayIndigencyRoutes =  require('./routes/barangayIndigencyRoutes');
const barangayIDRoutes =  require('./routes/barangayIDRoutes');
const installationRoutes =  require('./routes/installationRoutes');
const constructionRoutes =  require('./routes/constructionRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const officialRoutes = require('./routes/officialRoutes');
const promoteBusinessRoutes =require('./routes/promoteBusinessRoutes');
const livelihoodRoutes =  require('./routes/livelihoodRoutes');
const feedbackRoutes =  require('./routes/feedbackRoutes');
const blotterRoutes = require('./routes/blotterRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');
const StaffLogsRoutes = require('./routes/staffLogsRoutes');
const healthRoutes = require('./routes/healthRoutes');
const { frameguard, referrerPolicy } = require("helmet");


/********USER*******/
app.use('/', userRoutes); //user login and signup
app.use(adminRoutes);//admin log in


/********BARANGAY CERTIFICATE*******/
app.use('/barangaycertificate',barangayCertificateRoutes); //add barangay certificate
app.use('/get/barangaycertificate',barangayCertificateRoutes); //get barangay certificate
app.use('/update/barangaycertificate', barangayCertificateRoutes); //update barangay certificate
app.use('/delete/barangaycertificate', barangayCertificateRoutes); //delete barangay certificate

/********BUSINESS CLEARANCE*******/
app.use('/businessclearance',businessClearanceRoutes); //add business clearance
app.use('/get/businessclearance',businessClearanceRoutes); //get business clearance
app.use('/update/businessclearance', businessClearanceRoutes); //update business clearance
app.use('/delete/businessclearance', businessClearanceRoutes); //delete business clearance

/********INDIGENCY*******/
app.use('/barangayindigency',barangayIndigencyRoutes); //add barangay indigency
app.use('/get/barangayindigency',barangayIndigencyRoutes); //get barangay indigency
app.use('/update/barangayindigency', barangayIndigencyRoutes); //update barangay indigency
app.use('/delete/barangayindigency', barangayIndigencyRoutes); //delete barangay indigency

/********BARANGAY ID*******/
app.use('/barangayid',barangayIDRoutes); //add barangayid
app.use('/get/barangayid',barangayIDRoutes); //get barangayid
app.use('/update/barangayid', barangayIDRoutes); //update barangayid
app.use('/delete/barangayid', barangayIDRoutes); //delete barangayid

/********INSTALLATION*******/
app.use('/installation',installationRoutes); //add installation
app.use('/get/installation',installationRoutes); //get installation
app.use('/update/installation', installationRoutes); //update installation
app.use('/delete/installation', installationRoutes); //delete installation

/********CONSTRUCTION*******/
app.use('/construction',constructionRoutes); //add construction
app.use('/get/construction',constructionRoutes); //get construction
app.use('/update/construction', constructionRoutes); //update construction
app.use('/delete/construction', constructionRoutes); //delete construction

/********BLOTTER*******/
app.use('/blotter',blotterRoutes);//add blotter
app.use('/get/blotter',blotterRoutes); //get blotter
app.use('/update/blotter',blotterRoutes);//update blotter
app.use('/delete/blotter',blotterRoutes);//delete blotter

/********COMPLAINT*******/
app.use('/complaint',complaintRoutes);//add complaint
app.use('/get/complaint',complaintRoutes); //get complaint
app.use('/update/complaint',complaintRoutes);//update complaint
app.use('/delete/complaint',complaintRoutes);//delete complaint

/********HEALTH*******/
app.use('/health',healthRoutes);//add health
app.use('/get/health',healthRoutes); //get health
app.use('/update/health',healthRoutes);//update health
app.use('/delete/health',healthRoutes);//delete health

/********ANNOUNCEMENT*******/
app.use('/announcement', announcementRoutes);//add announcement
app.use('/get/announcement', announcementRoutes); //get announcement
app.use('/update/announcement', announcementRoutes); //update announcement
app.use('/delete/announcement', announcementRoutes);//delete announcement

/********OFFICIAL*******/
app.use('/official',officialRoutes);//add official
app.use('/get/official',officialRoutes); //get official
app.use('/update/official',officialRoutes);//update official
app.use('/delete/official',officialRoutes);//delete official

/********PROMOTE BUSINESS*******/
app.use('/promotebusiness',promoteBusinessRoutes);//add promotebusiness
app.use('/get/promotebusiness',promoteBusinessRoutes); //get promotebusiness
app.use('/update/promotebusiness',promoteBusinessRoutes);//update promotebusiness
app.use('/delete/promotebusiness',promoteBusinessRoutes);//delete promotebusiness

/********LIVELIHOOD*******/
app.use('/livelihood',livelihoodRoutes);//add livelihood
app.use('/get/livelihood',livelihoodRoutes); //get livelihood
app.use('/update/livelihood',livelihoodRoutes);//update livelihood
app.use('/delete/livelihood',livelihoodRoutes);//delete livelihood

/********FEEDBACK*******/
app.use('/feedback',feedbackRoutes); //add feedback
app.use('/get/feedback',feedbackRoutes); //get feedback
app.use('/delete/feedback',feedbackRoutes); //delete feedback


/********EMERGENCY*******/
app.use('/emergency',emergencyRoutes); //add emergency
app.use('/get/emergency',emergencyRoutes); //get emergency
app.use('/delete/emergency',emergencyRoutes); //delete emergency

/*******STAFFLOGS*******/
app.use('/get/stafflogs', StaffLogsRoutes) // get stafflogs


app.use(helmet());

// Add more specific CSP rules if needed
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
  })
);

// X-Frame-Options
app.use(
  helmet.frameguard({
    action: 'deny',
  })
);

// Referrer-Policy
app.use(
  helmet.referrerPolicy({
    policy: 'same-origin',
  })
);

// Permissions-Policy
app.use(
  helmet.permissionsPolicy({
    features: {
      geolocation: ["'self'"],
    },
  })
);




app.listen(8000,()=>{
  console.log("port connected");
})
