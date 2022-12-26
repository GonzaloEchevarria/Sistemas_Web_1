const bcrypt = require("bcrypt");
const { resolveInclude } = require("ejs");

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('gacetilleros.db');

db.serialize(function() {
    db.all("SELECT * FROM usuarios", function(err, rows) {
        console.log(rows);
      });
    });

db.comparePass = function(pass, hash, callback){
  bcrypt.compare(pass, hash, callback);
}

db.generateHash = function(pass, callback){
  bcrypt.hash(pass, 10, callback);
}

db.register = function(username, pass, role, callback){
  db.generateHash(pass, function(err, hash){
    const bbdd= new sqlite3.Database('gacetilleros.db');
     bbdd.run("INSERT INTO usuarios (username, password, rol) VALUES(?, ?, ?);",[username,hash,role],function(error) {
      console.log("ss"+ error);
     });
      if (callback) {
          callback();
      };
      bbdd.close();
  });
}

db.register('admin2', 'admin', "admin", function(){
  console.log('BBDD correct');
}); 

db.close();

module.exports=db;