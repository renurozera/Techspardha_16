var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var gcm = require('node-gcm');
var connection = mongoose.createConnection('mongodb://localhost/ts16DB');
var gcmUserSchema = require('../models/gcmUserSchema');


var gcmUserSchema = mongoose.model('gcmUserSchema',gcmUserSchema);

router.get('/',function(req,res,next){
	res.send("Hello");
	console.log('Get');
});
router.post('/register',function(req,res) {
	console.log(req.body);
	var name = req.body.name;
	var email = req.body.email;
	var registrationId = req.body.regId;

	var gcmUser = new gcmUserSchema({
		name : name,
		email : email,
		registrationId : registrationId
	});

	gcmUser.save(function(err,data){
		if(err){
			console.log("Error while adding GCM User " + name);
			res.send("Error while adding GCM User " + name);
		}
		else{
			console.log("User Added");
			res.send("User Added");
		}
	});
	
	console.log("Registered");
});

router.post('/sendNoti',function(req,res){
	res.send(req.body);
	var message = new gcm.Message({
		collapseKey: 'demo',
		priority: 'high',
		contentAvailable: true,
		delayWhileIdle: true,
		timeToLive: 3,
		dryRun: true,
		data: {
			key1: 'message1'
		},
		notification: {
			title: "Hello, World",
			body: "This is a notification that will be displayed ASAP."
		}
	});
	var regTokens = ['APA91bHOkWpV6NwKjuV-q1EyeK-2prBadyw244GMEL0uBWHalZDf98-drj1YtY_vYX-zRx-qRFYQ6JV94VmGoOXJefAVSIf5oeqp4abNA6pz0rpWi0pnrIM'];
	 
	// Set up the sender with you API key 
	var sender = new gcm.Sender('AIzaSyBNgLjVgE00K4Fq10LpS3bzg8icduH0Ots');
	 
	// Now the sender can be used to send messages 
	sender.send(message, { registrationTokens: regTokens }, function (err, response) {
		if(err) console.error("Error : " + err);
		else 	console.log("Response : " + response);
	});
	 
	// Send to a topic, with no retry this time 
	sender.sendNoRetry(message, { topic: '/topics/global' }, function (err, response) {
		if(err) console.error("Error : " + err);
		else 	console.log("Response : " + response);
	});
});
module.exports = router;