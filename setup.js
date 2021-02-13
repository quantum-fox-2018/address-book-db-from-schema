const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./address_book.db');

db.serialize(() => {
  db.run(`DROP TABLE contacts`)
  db.run(`CREATE TABLE IF NOT EXISTS contacts (contactId INTEGER PRIMARY KEY AUTOINCREMENT,
  contactName TEXT,phoneNumber TEXT UNIQUE)`, (err) => {
    if (err) console.log(err);
    else console.log('table contacts created successfully');
  })
  db.run(`DROP TABLE groups`)
  db.run(`CREATE TABLE IF NOT EXISTS groups (groupId INTEGER PRIMARY KEY AUTOINCREMENT,
  groupName TEXT)`,(err) => {
    if (err) console.log(err);
    else console.log('table group created successfully');
  })
  db.run(`DROP TABLE contacts_groups`)
  db.run(`CREATE TABLE IF NOT EXISTS contacts_groups (contact_groupId INTEGER PRIMARY KEY
  AUTOINCREMENT,contactId INTEGER,groupId INTEGER,
  FOREIGN KEY(contactId) REFERENCES contacts(contactId),
  FOREIGN KEY(groupId) REFERENCES groups(groupId))`,(err) => {
    if (err) console.log(err);
    else console.log('table contact group created successfully');
  })
})
