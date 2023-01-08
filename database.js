const bcrypt = require("bcrypt");
const { resolveInclude } = require("ejs");
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('gacetilleros.db');




db.serialize(function() {
    db.all("SELECT * FROM usuarios", function(err, rows) {
        console.log(rows);
      });

      db.all("SELECT * FROM publicacion", function(err, rows) {
        console.log(rows);
      });

      db.all("SELECT * FROM contacto", function(err, rows) {
        console.log(rows);
      });

      db.all("SELECT * FROM comentarios", function(err, rows) {
        console.log(rows);
      });
     
     
    });

db.comparePass = function(pass, hash, callback){
  bcrypt.compare(pass, hash, callback);
}



db.login=function(username, pass, callback){
  const bbdd= new sqlite3.Database('gacetilleros.db'); //abrir conexión
  bbdd.get("SELECT password FROM usuarios WHERE username =?",[username], function(err, row) {
   let passwordBbdd= row.password;
   bbdd.close();
  
   bcrypt.compare(pass, passwordBbdd, callback); }); 
   };

db.obtenerRol=function(username,callback){
  const bbdd = new sqlite3.Database('gacetilleros.db');
  const sql = 'SELECT rol FROM usuarios WHERE username = ?';
  const params = [username];
  bbdd.get(sql, params, (error, row) => {
    if(row){
      //{ row: admin} 
      let rol= row.rol;
      if (callback){
        return callback(rol);
      }
    }
  })
};
db.registroExiste =function(username,callback) {
    const bbdd = new sqlite3.Database('gacetilleros.db');
    const sql = 'SELECT username FROM usuarios WHERE username = ?';
    const params = [username];
    bbdd.get(sql, params, (error, row) => {
      let response;
      if (row) {
        response= true;
      } else {
        response=  false;
      }
      bbdd.close();
      if (callback){
        return callback(response);
      }
    });}


db.generateHash = function(pass, callback){
  bcrypt.hash(pass, 10, callback);
}

db.register = function(username, pass, role, callback){
   
    db.generateHash(pass, function(err, hash){
    const bbdd= new sqlite3.Database('gacetilleros.db');
     bbdd.run("INSERT INTO usuarios (username, password, rol) VALUES(?, ?, ?);",[username,hash,role]);
     array.push({username,pass,role});

     bbdd.close();
     if (callback) {
          callback();
      };
      
  });
}
db.newPublicacion = function(autor, titular, body, callback){
  console.log("voy a abrir la BBDD");
  const bbdd= new sqlite3.Database('gacetilleros.db');
   bbdd.run("INSERT INTO publicacion (autor, titular, body) VALUES(?, ?, ?);",[autor, titular, body],function(err,result){
    let response="ok";
    if (err){
      response="error";
    }
    else{
      console.log("¡Nueva publicación!");
    }
    bbdd.close();
   if (callback) {
        return callback(response);
    };
   });
   }

   db.updateNoticia = function(id, body, callback){
    const bbdd= new sqlite3.Database('gacetilleros.db');
     bbdd.run("UPDATE  publicacion SET body=? WHERE id=?;",[body, id],function(err,result){
      let response="ok";
      if (err){
        response="error";
      }
      else{
        console.log("¡Nuevo noticia!");
      }
      bbdd.close();
     if (callback) {
          return callback(response);
      };
     }); }
    
     db.deleteNoticia = function(id, callback){
      const bbdd= new sqlite3.Database('gacetilleros.db');
       bbdd.run("DELETE FROM publicacion  WHERE id=?;",[id],function(err,result){
        let response="ok";
        if (err){
          response="error";
        }
        else{
          console.log("ELIMINADA noticia!");
        }
        bbdd.close();
       if (callback) {
            return callback(response);
        };
       }); }
    
     

   


db.newContacto = function(nombre, email, mensaje, callback){
  const bbdd= new sqlite3.Database('gacetilleros.db');
   bbdd.run("INSERT INTO contacto (nombre, email, mensaje) VALUES(?, ?, ?);",[nombre, email, mensaje],function(err,result){
    let response="ok";
    if (err){
      response="error";
    }
    else{
      console.log("¡Nuevo contacto!");
    }
    bbdd.close();
   if (callback) {
        return callback(response);
    };
   }); }

//  db.newContacto("W","$","prueba",function(){
 //   console.log('BBDD correct');
  // }); 

db.allPublicaciones= function(callback){
  const bbdd = new sqlite3.Database('gacetilleros.db');
  bbdd.all("SELECT * FROM publicacion", function(err, rows) {
    bbdd.close();
    
    if (callback){
      return callback(rows);
    }
  });
}

db.allComentarios= function(callback){
  const bbdd = new sqlite3.Database('gacetilleros.db');
  bbdd.all("SELECT * FROM comentarios", function(err, rows) {
    bbdd.close();
    
    if (callback){
      return callback(rows);
    }
  });
}


db.comentar = function(id, autor, body, callback){
  console.log("------");
  const bbdd= new sqlite3.Database('gacetilleros.db');
   bbdd.run("INSERT INTO comentarios (id_noticia, autor, body) VALUES(?, ?, ?);",[id, autor, body],function(err,result){
    console.log("COMENT");
    let response="ok";
    if (err){
      response="error";
    }
    else{
      console.log("¡Nuevo comentario!");
    }
    bbdd.close();
   if (callback) {
        return callback(response);
    };
   }); }




db.allPublicaciones(function(response){
  console.log("--------");
  console.log(response);
})

db.allPublicacionesDeX= function(username,callback){
  const bbdd = new sqlite3.Database('gacetilleros.db');
  bbdd.all("SELECT * FROM publicacion WHERE autor=?", [username], function(err, rows) {
    bbdd.close();
    
    if (callback){
      return callback(rows);
    }
  });
}

db.allPublicacionesDeX("prueba2",function(response){
  console.log("///////////////////////////");
  console.log(response);
})



//db.newContacto("D","d@gmial.com","hola",function(){
  //console.log('BBDD correct');
 //}); 

//db.register('admin2', 'admin', "admin", function(){
 // console.log('BBDD correct');
//}); 

db.close();

module.exports=db;
