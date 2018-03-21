var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');

db.run(`CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                            first_name TEXT,
                                            last_name TEXT,
                                            email TEXT,
                                            phone TEXT)`,function(err){
                                                if(err) console.log(err)
                                                console.log('Table Contact berhasil dibuat')
                                            });
db.run(`CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                           name TEXT)`,function(err){
                                               if(err) console.log(err)
                                               console.log('Table Groups berhasil dibuat')
                                           });
db.run(`CREATE TABLE IF NOT EXISTS GroupContacts (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                  groupId INTEGER NOT NULL,
                                                  contactId INTEGER NOT NULL,
                                                  FOREIGN KEY (groupId) REFERENCES Groups(id),
                                                  FOREIGN KEY (contactId) REFERENCES Contacts(id))`,function(err){
                                                      if(err) console.log(err)
                                                      console.log('Table GroupContacts berhasil dibuat')
                                                  });
