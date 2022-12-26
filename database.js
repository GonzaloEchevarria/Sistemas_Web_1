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
     db.run("INSERT INTO usuarios (username, password, rol) VALUES(?, ?, ?);",[username,hash,role],function(error) {
      console.log(error);
     });
      if (callback) {
          callback();
      };
  });
}

db.register('user', 'user', "admin", function(){
  console.log('User admin successfully registered');
}); 

db.close();
module.exports=db;