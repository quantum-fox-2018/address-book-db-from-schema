const sqlite3 = require('sqlite3').verbose();

class Database {
  static db() {
    let db = new sqlite3.Database('./address_book.db');
    return db
  }
}

module.exports = Database.db()