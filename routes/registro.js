const express = require('express');
const db = require('../database');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();


router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Register', user: req.session.user}); /* registro y titulo */
});


router.post('/', function(req, res, next){
    let user = req.body.user;
    let password = req.body.pass;
    let rep_password = req.body.pass2;
    let rol = req.body.rol;
    let longitud_pass = password.length;
    let longitud_user = user.length;

    db.registroExiste(user,function(response){
      if (response===true){
        console.log("USUARIO EXISTENTE");
        req.session.error = "Incorrect user or password";
        res.redirect("/registro");
      }
      else{
        if (1 <= longitud_user && 8 <= longitud_pass && password == rep_password){
          db.register(user,password,rol, function(){
              req.session.user = user;
              req.session.rol=rol;
              //req.session.message = "Register CORRECT!";
              res.redirect("/restricted");
          });
      }
        else{
            console.log("CONTRASEÑA ERROR");
            req.session.error = "Incorrect user or password";
            res.redirect("/registro"); 
          }
      }
    })
      
     

    
    
});

module.exports = router;



