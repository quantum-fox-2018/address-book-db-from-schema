const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db');
const fs = require('fs');

db.serialize(function(){
  let createContact = `CREATE TABLE IF NOT EXISTS contacts(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR,
                        company VARCHAR,
                        phone VARCHAR(12),
                        email VARCHAR,
                        CONSTRAINT phone_unique UNIQUE(phone)
                      );`;
  let createContactGroup = `CREATE TABLE IF NOT EXISTS contact_groups(
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              contactId INT,
                              groupId INT,
                                FOREIGN KEY(contactId) REFERENCES contacts(id),
                                FOREIGN KEY(groupId) REFERENCES groups(id)
                            );`;
  let createGroup = `CREATE TABLE IF NOT EXISTS groups(
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              group_name INT
                            );`;
  db.run(createContact);
  db.run(createContactGroup);
  db.run(createGroup);

  // let con = fs.readFileSync('group.json', 'utf8');
  // let parse = JSON.parse(con)
  // let insert = db.prepare("INSERT INTO groups VALUES (Null, ?)")
  // for(let i=0; i<parse.length; i++){
  //   insert.run([parse[i].name])
  // }
  // insert.finalize()
});
db.close()
