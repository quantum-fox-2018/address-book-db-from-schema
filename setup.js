const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('addressBook.db')


  db.run(`CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, phone NUMBER, email VARCHAR, address VARCHAR);`,function (err) {
      if (err) {

        console.log(`table is already exists`);

      } else {

        console.log(`done add contacts table !`);

      }
  })

  db.run(`CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, groupName VARCHAR);`,function (err) {
      if (err) {

        console.log(`table is already exists`);

      } else {

        console.log(`done add groups table !`);

      }
  })

  db.run(`CREATE TABLE IF NOT EXISTS contactGroups(id INTEGER PRIMARY KEY AUTOINCREMENT, contactId INTEGER, groupId INTEGER);`,function (err) {
      if (err) {

        console.log(`table is already exists`);

      } else {

        console.log(`done add contactGroups table !`);

      }
  })
