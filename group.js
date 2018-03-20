const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

class Group{
  static save(groupName){
    db.run(`INSERT INTO Groups (group_name) VALUES ("${groupName}")`);
  }

  static delete(groupName){
    db.run(`DELETE FROM Groups WHERE group_name = "${groupName}"`);
  }

  static update(groupName, newName){
    db.run(`UPDATE Groups SET group_name = "${newName}" WHERE group_name = "${groupName}"`);
  }
}

module.exports = Group;
