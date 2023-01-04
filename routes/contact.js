var express = require('express');
var router = express.Router();
const db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contacto', user: req.session.user,rol:req.session.rol});
});
router.post('/', function(req, res, next){
  
  let nombre=req.body.nombre;
  let email= req.body.email;
  let mensaje = req.body.mensaje;
  if (nombre!=undefined && email!=undefined && mensaje!=undefined){
    db.newContacto(nombre,email, mensaje,function(){
      
      console.log("Contacto.");
      res.redirect("/contacto");
  })}
  

  }


);

module.exports = router;