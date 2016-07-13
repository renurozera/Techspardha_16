var mongoose=require('mongoose');
var eventSchema=new mongoose.Schema({
 nameOfEvent:{                                                                  //each event will have a unique name
   type:String,
   unique:true
 },
 description:String,
 rules:String,
 dateOfEvent:String,
 timeOfEvent:String,
 venue:String,
 coordinator_1:String,                                                           //name of first coordinator
 coordinator_2:String,                                                           //name of second coordinator
 phoneno_1:String,
 phoneno_2:String,
 category:String,
 reference_url:String,                                                           //for the reference
 userId:Number                                                                   //the userid of the logged in admin who will register for the event
 });

 module.exports = eventSchema;                                                   //define the model
