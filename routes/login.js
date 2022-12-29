const express = require('express');
const router = express.Router();
const db = require('../database');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("0");
  res.render('login', { title: 'Login', user: req.session.user,rol:req.session.rol});
  
});

router.post('/', function(req, res, next){
    let user = req.body.user;   
    db.login(req.body.user,req.body.pass,function(err, result){
        if(result){
            req.session.user = user;
            db.obtenerRol(user,function(rol){
                req.session.rol=rol;
                res.redirect("/restricted");
            })
            
        } else {
            req.session.rol=undefined;
            req.session.error="Incorrect user or password";
            res.redirect("/");
        }
    });
    
   
});

module.exports = router;
