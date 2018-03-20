const sqlite3 = require('sqlite3').verbose();

class Database{
  constructor(database_name){
    this.database_name = database_name;
    this.db = this.db();
    this.createDatabase();
  }

  db(){
    return (new sqlite3.Database('./database.db'));
  }

  createDatabase(){
    //unique di group_name, contact_name, sama contact_phone_number
    
    const queryCreateGroup = 'CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), CONSTRAINT group_name_unique UNIQUE (name))';
    const queryCreateContact = 'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), address VARCHAR(100), phone_number INTEGER, email VARCHAR(50), CONSTRAINT phone_email_unique UNIQUE (phone_number, email))';
    const queryCreateContactGroup = 'CREATE TABLE IF NOT EXISTS contact_group (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id REFERENCES groups(id), contact_id REFERENCES contacts(id))';

    this.db.serialize(()=>{
      this.db.run(queryCreateGroup, (err)=>{
        if(err) console.log(err);
      });

      this.db.run(queryCreateContact, (err)=>{
        if(err) console.log(err);
      });

      this.db.run(queryCreateContactGroup, (err)=>{
        if(err) console.log(err);
      });
    });
  }
}

module.exports = Database;
