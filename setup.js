const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('addressbook.db');

db.serialize(function(){
  let Contact = `CREATE TABLE IF NOT EXISTS Contacts (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR,
                        company VARCHAR,
                        phone text not null UNIQUE,
                        email VARCHAR
                      );`;
  let ContactGroup = `CREATE TABLE IF NOT EXISTS Contact_groups (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              contactId INT,
                              groupId INT,
                                FOREIGN KEY(contactId) REFERENCES Contacts(id),
                                FOREIGN KEY(groupId) REFERENCES Groups(id)
                            );`;
  let Group = `CREATE TABLE IF NOT EXISTS Groups (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              group_name varchar
                            );`;
  db.run(Contact);
  db.run(ContactGroup);
  db.run(Group);
});
db.close()
