const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contacts.db')

console.log('Connected to database "contacts.db" succesfuly')

db.serialize((err) => {
    if(err){
        console.log(err.message)
    }
    db.run(`CREATE TABLE IF NOT EXISTS Contacts (
        contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL
    )`)
    db.run(`CREATE TABLE IF NOT EXISTS Groups (
        group_id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_name TEXT NOT NULL
    )`)
    db.run(`CREATE TABLE IF NOT EXISTS ContactGroups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contact_id INTEGER NOT NULL,
        group_id INTEGER NOT NULL,
        FOREIGN KEY (contact_id) REFERENCES Contacts(contact_id),
        FOREIGN KEY (group_id) REFERENCES Groups(group_id)
    )`)



})

db.close((err) => {
    if(err){
        console.log(err.message)
    }
    console.log('Closed connection database')
})