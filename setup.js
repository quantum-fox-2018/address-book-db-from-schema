const sqlite = require('sqlite3').verbose();

class Database {
  static db() {
    return new sqlite.Database('address_book_database.db')
  }

  static createTableContact() {
    var db = this.db();
    db.run('CREATE TABLE contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(10), phoneNumber VARCHAR(15), address VARCHAR(15))')
  }

  static createTableGroup() {
    var db = this.db();
    var query = 'CREATE TABLE contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, groupName VARCHAR(10))'
    db.run(query)
  }
}

Database.createTableContact();
Database.createTableGroup();

module.exports = Database
