const express = require('express');
const router = express.Router();
const users = require('../users');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('registro', { title: 'Registro', user: req.session.user});
  });

router.post('/', function(req, res, next){
    console.log("usuario: " +req.body.user + " pass: " + req.body.pass);
    if(users.equalPass(req.body.pass,req.body.pass2)==true){
            console.log("voy a registrar");
            users.register(req.body.user,req.body.pass);
            console.log(" ya registrado");
            req.session.message="RG COM";
            res.redirect("/restricted");
    }
    else{
        req.session.error = "Incorrect user or password";
        res.redirect("/");
    }   
});




  module.exports = router;