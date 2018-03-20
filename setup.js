"use strict"
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

class Table {
    static creatTable() {
        let queryContact = `CREATE TABLE IF NOT EXISTS Contacts 
                                (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                 name VARCHAR, 
                                 email VARCHAR NOT NULL UNIQUE,
                                 phone VARCHAR NOT NULL UNIQUE);`;
        let contact_group = `CREATE TABLE IF NOT EXISTS Contact_Group
                                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                 contact_id REFERENCES Contacts(id),
                                 group_id REFERENCES Groups(id));`;
        let queryGroup = `CREATE TABLE IF NOT EXISTS Groups 
                            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                             name VARCHAR);`;
        db.run(queryContact);
        db.run(contact_group);
        db.run(queryGroup);
    }
}