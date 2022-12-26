const express = require('express');
const router = express.Router();
const users = require('../users');
const db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("0");
  res.render('login', { title: 'Login', user: req.session.user});
  
});

router.post('/', function(req, res, next){
    let user = req.body.user;   
    db.login(req.body.user,req.body.pass,function(err, result){
        if(result){
            req.session.user = users[user];
            //req.session.message = "Welcome!"
            res.redirect("/restricted");
        } else {
            req.session.error="Incorrect user or password";
            res.redirect("/");
        }
    });
    
   
});

module.exports = router;
