const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

class Contact{
  static save(name, address, phone){
    db.run(`INSERT INTO Contacts (name, address, phone) VALUES ("${name}", "${address}","${phone}")`);
  }

  static delete(name){
    db.run(`DELETE FROM Contacts WHERE name = "${name}"`);
  }

  static update(name, param, newValue){
    db.run(`UPDATE Contacts SET ${param} = "${newValue}" WHERE name = "${name}"`);
  }
}

// Contact.save('fajri', 'bandung', '081966936957');
Contact.update('udin', 'address', 'jakarta selatan');


module.exports = Contact;
