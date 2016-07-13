var mongoose = require('mongoose');
var departmentSchema = new mongoose.model({
  departmentName:String,
  departmentId:Number
});

var departmentSchema = mongoose.model('departmentSchema',departmentSchema);
module.exports = departmentSchema;
