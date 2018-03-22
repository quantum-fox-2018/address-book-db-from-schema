const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db');

class Contact {
  static listContact(cb){
    db.all("SELECT * FROM contacts", (err, rows) => {
      if(err){
        cb(err)
      }else{
        cb(rows)
      }
    });
    // cb(rows);
  }

  static save(dataContact, cb){
    let createContact = `INSERT INTO contacts (id, name, company, phone, email) VALUES (Null, ?, ?, ?, ?);`
    db.run(createContact, [dataContact[0], dataContact[1], dataContact[2], dataContact[3]], (err) =>{
      cb(err);
    });
    db.close()

  }

  static edit(updContact,cb){
    // let updateData = `UPDATE contacts SET name = ?, company = ?, phone = ?, email = ? WHERE id = ?`;
    // db.run(updateData, [updContact[0], updContact[1], updContact[2], updContact[3], updContact[4]], (err)=>{
    //     cb(err)
    // });

    let editData = `UPDATE contacts SET ${updContact[0]} = ? WHERE id = ?`;
    db.run(editData, [updContact[1], updContact[2]], (err) => {
        cb(err);
    });
  }

  static delete(idContact, cb){
    let deletedata = "DELETE FROM contacts WHERE id = ?;";
    db.run(deletedata, idContact, (err) => {
      cb(err)
    })
  }

}

module.exports = Contact;



// Contact.save({name :"Lina", company:"MIA", phone: "087808810278", email: "linaiyaya"})
// Contact.update({name :"Lina", company:"MUA", phone: "0859296968040", email: "linaiyaya", id:3})
// Contact.delete(5)
