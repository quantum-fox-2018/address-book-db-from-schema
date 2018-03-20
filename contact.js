const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./phoneBook.db');
var argv = process.argv

class Contact{

  static add(name, address, phone){
    db.run(`INSERT INTO contacts (name, address, phone) VALUES ("${name}", "${address}","${phone}")`);
  }

  static delete(name){
    db.run(`DELETE FROM contacts WHERE name = "${name}"`);
  }

  static update(name, param, newValue){
    db.run(`UPDATE contacts SET ${param} = "${newValue}" WHERE name = "${name}"`);
  }
}

Contact.add(argv[2], argv[3], argv[4]);


module.exports = Contact;