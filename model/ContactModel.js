const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('address_book.db')

class ContactModel{
  static addContact(contact_name, phoneNumber, cb){
    db.serialize(function(){
      let queryAdd = `INSERT INTO CONTACTS (contact_name, phoneNumber)
                        VALUES (?,?);`
      db.run(queryAdd,[contact_name, phoneNumber],(err) => {
        if(err){
          console.log('cek di query Insert Contacts',err)
        }
      })
    })
    db.close()
    cb(contact_name, phoneNumber)
  }

  static deleteContact(contact_name, cb){
    db.serialize(function(){
      let queryDelete = `DELETE FROM CONTACTS WHERE contact_name = ?;`
      db.run(queryDelete,[contact_name],(err) => {
        if(err){
          console.log('cek di query Delete Contacts', err)
        }
      })
    })
    db.close()
    cb(contact_name)
  }

  static selectContact(cb){
    db.serialize(function(){
      let querySelect = `SELECT * FROM CONTACTS`
      db.all(querySelect,(err, dataContact) => {
        if(err){
          console.log('cek di query Select Contact', err)
        }
        else {
          cb(dataContact)
        }
      })
    })
    db.close()
  }


  static updateContact(){

  }
}

module.exports = ContactModel
