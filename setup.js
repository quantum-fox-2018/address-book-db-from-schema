const sqlite = require('sqlite3').verbose();

class Database {
  static db() {
    return new sqlite.Database('address_book_database.db')
  }

  static createTableContact() {
    var db = this.db();
    db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(10), phoneNumber VARCHAR(15), address VARCHAR(15))')
  }

  static createTableGroup() {
    var db = this.db();
    db.run('CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, groupName VARCHAR(10))')
  }

  static createTableContactGroup() {
    var db = this.db();
    db.run('CREATE TABLE contact_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, member_id INTEGER, group_id INTEGER, FOREIGN KEY (member_id) REFERENCES contacts(id), FOREIGN KEY (group_id) REFERENCES groups(id))')
  }
}

Database.createTableContact();
Database.createTableGroup();
Database.createTableContactGroup();

module.exports = Database
