const express = require('express');
const db = require('../database');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.render('publicacion', { title: 'Publicar', user: req.session.user, rol:req.session.rol});
});


router.post('/', function(req, res, next){
    let titular = req.body.titular;
    let cuerpo = req.body.cuerpo;
    let user = req.session.user;

    db.newPublicacion(user,titular,cuerpo,function(response){
        console.log(response);
        res.redirect("/publicacion");
        console.log("noticia añadida");
    })    
});

module.exports = router;