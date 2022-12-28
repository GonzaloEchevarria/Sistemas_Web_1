const express = require('express');
const db = require('../database');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();


router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Register', user: req.session.user}); /* registro y titulo */
});

function registroExiste(username) {
  return new Promise((resolve, reject) => {
    const bbdd = new sqlite3.Database('gacetilleros.db');

    const sql = 'SELECT username FROM usuarios WHERE username = ?';
    const params = [username];

    bbdd.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(!!row);
      }
      bbdd.close();
    });
  });
}
router.post('/', function(req, res, next){
    let user = req.body.user;
    let password = req.body.pass;
    let rep_password = req.body.pass2;
    let rol = req.body.rol;
    let longitud_pass = password.length;
    let longitud_user = user.length;

    if (registroExiste(user)){
    
        req.session.error = "Incorrect user or password";
        res.redirect("/registro");
    }
    else if (1 <= longitud_user && 8 <= longitud_pass && password == rep_password){
        db.register(user,password,rol, function(){
            req.session.user = user;
            //req.session.message = "Register CORRECT!";
            res.redirect("/restricted");
        });
    }

    else{
        console.log("error");
        req.session.error = "Incorrect user or password";
        res.redirect("/registro"); 
    }
    console.log("error2");
});

module.exports = router;



