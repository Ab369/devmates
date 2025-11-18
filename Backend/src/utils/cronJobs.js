const cron = require('node-cron');
const datefn=require('date-fns');
const connections=require('../models/connectionRequest');
const sendEmail = require('./transporter');

//uncomment and will run everyday(after checking emails in DB are not unknown as emails will be sent to them)

// cron.schedule('00 22 * * *', () => {
//   console.log('running a task every second');
//   sendEveryDayMail();
// });

//send mail to everyone who received request today

async function sendEveryDayMail(){
   //get today start and end
   const todayBegin=datefn.startOfDay(new Date());
   console.log(todayBegin)
   
   //getting userDetails of users who received requests
   const userDetails=await connections.find({
        status:'interested',
        createdAt:{
            $gt:todayBegin
        }
   }).populate('toId')
    
//    console.log(userDetails)

   //getting array of users who received requests today
   const uniqueEmails=[...new Set(userDetails.map((user)=>user.toId.email))];
//    console.log(uniqueEmails)

   //send mail to each email
   uniqueEmails.forEach(async(email)=>{
       await sendEmail(email,"New Request received","You have received new connection requests on DevMates. Go check them out!")
   })
}

