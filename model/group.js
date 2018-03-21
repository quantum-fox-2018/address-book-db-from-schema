const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');
const controller = require('./controller.js')

class Group{
  static saveTableGroups(){
    db.serialize(function() {
      db.run(`CREATE TABLE IF NOT EXISTS groups(
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          name VARCHAR
        );`);
    });
  }
  static saveAddGroup(name){
    db.serialize(function() {
      db.run(`INSERT INTO groups(name)
              VALUES ('${name}'
        );`);
    });
  }
  static saveUpdateGroup(name,id){
    db.serialize(function() {
      db.run(`UPDATE groups SET
              name = '${name}'
              WHERE id = '${id}'`);
    });
  }
  static deletGroupDB(id){
    db.serialize(function() {
      db.run(`DELETE FROM groups
            WHERE
            id = '${id}';`);
    });
    db.serialize(function() {
      db.run(`DELETE FROM contacts_group
            WHERE
            groupId = '${id}';`);
    });
  }
}
db.close();
module.exports = Group
