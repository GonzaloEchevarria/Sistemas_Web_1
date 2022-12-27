const express = require('express');
const db = require('../database');
const router = express.Router();
const users = require('../users');

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

    if(users[user]){
        req.session.error = "This Username is in use!";
        res.redirect("/registro");
    }
    
    else if (1 <= longitud_user && 8 <= longitud_pass && password == rep_password){ //&& users.registro_completo(user, password,rep_password)==true){
        console.log("ok");
        db.register(user,password,rol, function(){
            req.session.user = users[user]; /* para iniciar sesión automáticamente tras el registro */
            //req.session.message = "Register CORRECT!";
            res.redirect("/restricted");
        });
    }

    else{
        req.session.error = "ERROR, Asegurese de que las contraseñas coinciden y que su longitud es igual o mayor a 8";
        res.redirect("/registro"); /* para que salga el mensaje es importante tener una res */
    }
});

module.exports = router;





/* GET home page. 
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

*/


  module.exports = router;