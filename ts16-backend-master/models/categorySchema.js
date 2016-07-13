var mongoose = require('mongoose');
var categorySchema = new mongoose.Schema({
  categoryName:String,
  categoryId :{
    type:Number,
    unique:true
  }
});
var categorySchema = mongoose.model('categorySchema',categorySchema);
module.exports = categorySchema;
