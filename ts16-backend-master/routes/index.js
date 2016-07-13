var express = require('express');
var session = require('express-session');
var router = express.Router();

//middleware for checking if user exists or not
function checkUser(req,res,next){
  console.log('IN THE USER CHECKLOGIN MIDDLEWARE');
  if(req.session && req.session.userName){
    next();
  }
  else{
    res.redirect('/login');
  }
}

function redirectToDash(req,res,next){
  if(req.session && req.session.userName){
    res.render('dashboard');
  }
  else{
    next();
  }
}

router.get('/login',redirectToDash,function(req,res,next){
  res.render('login');
});

router.get('/',redirectToDash,function(req, res, next) {
  res.render('login');
});

router.get('/registerAdmin', function(req,res){
    res.render('register');
});

router.get('/addevent',checkUser, function(req, res){
   res.render('addEvent');
});

router.get('/notification',function(req,res){
  res.render('notification');
});
/*
router.post('/registerAdmin',function(req,res){
  res.json(req.body);
});
*/
router.get('/logout',function(req,res){
 req.session.destroy();
 res.redirect('login');
});

router.get('/sessionName',function(req,res){   //demo for session
    var userName=req.session.userName;
    if(userName)
    {
        res.send('Hello'+' '+userName);
    }
    else
    {
        res.render('login');
    }
});


module.exports = router;
