const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./phoneBook.db');

class Group{
  static save(groupName){
    db.run(`INSERT INTO groups (name) VALUES ("${groupName}")`);
  }

  static delete(groupName){
    db.run(`DELETE FROM groups WHERE name = "${groupName}"`);
  }

  static update(groupName, newName){
    db.run(`UPDATE groups SET name = "${newName}" WHERE name = "${groupName}"`);
  }
}

module.exports = Group;