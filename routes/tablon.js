const { response } = require('express');
const express = require('express');
const db = require('../database');
const router = express.Router();

//let publicaciones="";
//db.allPublicaciones(function(response){
  //publicaciones=response;
//})

//let comentarios2="";
  //db.allComentarios(function(response){
    //    comentarios2=response;
      //});
 

router.get('/', function(req, res, next) {
  db.allPublicaciones(function(publicaciones){
    db.allComentarios(function(comments){
      res.render('tablon', { title: 'Tablón', user: req.session.user, rol:req.session.rol, publicaciones: publicaciones, comentarios:comments});  
    })
  })     
    });

router.post('/', function(req, res, next){
      let id = req.body.idPub;
      let comentario = req.body.inputComentario;
      db.comentar(id,req.session.user,comentario,function(response){
        res.redirect("/tablon");
      })

  });


module.exports = router;