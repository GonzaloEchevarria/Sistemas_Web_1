const express = require('express');
const db = require('../database');
const router = express.Router();



router.get('/', function(req, res, next) {
    
    if (req.session.rol==="admin"){
        db.allPublicaciones(function(publicaciones){
            res.render('modificar', { title: 'Modificar', user: req.session.user, rol:req.session.rol, publicaciones:publicaciones}); 
        })
    }
    else{
        db.allPublicacionesDeX(req.session.user,function(publicaciones){
            res.render('modificar', { title: 'Modificar', user: req.session.user, rol:req.session.rol, publicaciones:publicaciones});
        });
    }
});
router.post('/', function(req, res, next){
    let id = req.body.idPub;
    let body = req.body.body;
    console.log("-.-.-.-.--->"+ body);
    if (body==='eliminar'){
        db.deleteNoticia(id,function(response){
            console.log(response);
            res.redirect("/modificar");});  
    }
    else{
        db.updateNoticia(id,body,function(response){
            res.redirect("/modificar"); }) ; 
        }
   });




module.exports = router;