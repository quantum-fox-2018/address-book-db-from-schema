const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./phoneBook.db');

db.serialize(function(){

    db.run(
        `CREATE TABLE IF NOT EXISTS contacts 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), 
        address VARCHAR(50), phone VARCHAR(12))`
        )
    
    db.run(
        `CREATE TABLE IF NOT EXISTS contactGroups 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        FOREIGN KEY (id) REFERENCES contacts(id), 
        FOREIGN KEY (id) REFERENCES groups(id))`
        )
    
    
    db.run(
        `CREATE TABLE IF NOT EXISTS groups 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(15))`
        )
        
})

db.close();