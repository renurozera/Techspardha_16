var express = require('express');
var session = require('express-session');
var router = express.Router();
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var bcrypt=require('bcryptjs');

var connection=mongoose.createConnection('mongodb://localhost/ts16D');
var userSchema = require('../models/userSchema');

//autoIncrement for creating the object id to be autoincrementing
autoIncrement.initialize(connection);
console.log('auto increment added to userschema');
userSchema.plugin(autoIncrement.plugin,'userSchema');

/* GET users listing. */
var userSchema = mongoose.model('userSchema',userSchema);
//var sess = {}; //will be used for session variables

router.post('/register', function(req, res, next) {
    //console.log(req.body);
    var name = req.body.Name;
    var userName = req.body.userName;
    //var passwordHash = req.body.password;
    var passwordHash = bcrypt.hashSync(req.body.password,8); //hashing the password
    var admin = new userSchema({
       name:name,
       userName:userName,
       password:passwordHash
    });
    console.log('values retrieved');
    admin.save(function(err,data){
        if(err)
        {
            console.log(err.code+err);
            if(err.code === 11000){
            var error='the user with the username:'+userName+' already exists';
            }
            else{
            var error='something bad happened';
            }
            res.send(error);
        }
        else
        {
            console.log(admin.userName + "inserted");
            // res.send('registered');
            res.redirect('/login');
        }
    });
});

router.post('/loginValidate', function(req, res, next){
    var sentUsername = req.body.userName;
    var sentpassword = req.body.password;
    userSchema.findOne({ userName : sentUsername},function(err,user){
        if(err)
        {
            console.log("error occurred:"+err);
        }
        if(user)
        {
            if(bcrypt.compareSync(sentpassword,user.password)){
             req.session.userName = sentUsername;
             req.session.userId = user._id;
             //console.log(sess);
             res.redirect('../events/postEvent');
            }
            else{
                console.log('password mismatch');
                res.send('you entered invalid password');
            }
        }
        else
        {
            console.log('no match found');
            res.send('you entered invaid emailId');
        }
    });
});

module.exports = router;
