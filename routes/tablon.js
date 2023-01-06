const { response } = require('express');
const express = require('express');
const db = require('../database');
const router = express.Router();
let publicaciones="";

db.allPublicaciones(function(response){
  publicaciones=response;
})
 


router.get('/', function(req, res, next) {
      res.render('tablon', { title: 'Tablón', user: req.session.user, rol:req.session.rol, publicaciones: publicaciones}); });

  



module.exports = router;