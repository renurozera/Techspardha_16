var mongoose=require('mongoose');
//var autoIncrement=require('mongoose-auto-increment');
var userSchema=new mongoose.Schema({
  name:String,
  userName:{
  	type:String,
  	unique:true,   //used for creating the unique fields according to the username
  },
  password:String
});
//creating the model for our schema//
module.exports = userSchema;
//module.exports=mongoose.model('userSchema',userSchema);
