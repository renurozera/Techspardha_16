var mongoose = require('mongoose');
var gcmUserSchema = new mongoose.Schema({
  name : String,
  email : {
  	type : String,
  	unique : true,
  },
  registrationId : String
});

module.exports = gcmUserSchema;
