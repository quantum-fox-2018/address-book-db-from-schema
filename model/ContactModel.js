const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('address_book.db')

class ContactModel{
  static cekTambahKontakModel(contact_name, phoneNumber, cb, cb2){
    if(contact_name === undefined || phoneNumber === undefined){
      let text = `name atau phone number tidak boleh kosong...!`
      cb(text)
    }
    else if(phoneNumber.length > 11){
      let text = `maximum karakter phone number adalah 11 ...!`
      cb(text)
    }
    else {
      db.serialize(function(){
        let queryAdd = `INSERT INTO CONTACTS (contact_name, phoneNumber)
        VALUES (?,?);`
        db.run(queryAdd,[contact_name, phoneNumber],(err) => {
          if(err){
            console.log('cek di query Insert Contacts',err)
          }
          else {
            cb2(contact_name, phoneNumber)
          }
        })
      })
      db.close()
    }
  }

  static addContact(contact_name, phoneNumber, cb){
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


  static updateContact(contact_name,phoneNumber,id,cb){
    db.serialize(function(){
      let queryUpdate = `UPDATE CONTACTS SET contact_name = ?,
                                             phoneNumber = ?
                                       WHERE id = ?;`
      db.run(queryUpdate,[contact_name,phoneNumber,id],(err) => {
        if(err){
          console.log('cek di query Update Contact', err)
        }
      })

    })
    db.close()
    cb(id)
  }
}

module.exports = ContactModel
// comment biar bisa ke push
