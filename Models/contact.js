let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data/address_book.db');

class Contact {
  constructor(object){
    this.id = null
    this.name = object.name
    this.phoneNumber = object.phoneNumber
  }

  static validatePhone(str){

    for (var i = 0; i < str.length; i++) {
      if ('0123456789'.indexOf(str[i])  === -1) {
        return false
      }
    }

    if (str.toString().length < 13 && str.toString().length > 5){

      return true
    }else{
      return false
    }
  }

  addContact(callback){
    if (Contact.validatePhone(this.phoneNumber)) {
      let query = `INSERT INTO contacts VALUES(null, ?, ?)`
      db.run(query, [this.name, this.phoneNumber], function(err) {
        if(err){
          callback(err)
        }else{
          callback(`Add Contact Success, Contact ID : ${this.lastID}`)
        }
      })
    }else{
      callback(`phone number is not valid`)
    }

  }

  static update(id, column, value, callback){
    if (column === 'phone_number') {
      if (Contact.validatePhone(value)) {
        let query = `UPDATE contacts SET ${column} = '${value}' WHERE id = ${id}`
        db.run(query, function(err){
          if (err) {
            callback(err)
          }else{
            callback(`update success ${column} into ${value}`)
          }
        })
      }else{
        callback(`phone number is not valid`)
      }
    }else{
      let query = `UPDATE contacts SET ${column} = '${value}' WHERE id = ${id}`
      db.run(query, function(err){
        if (err) {
          callback(err)
        }else{
          callback(`update success ${column} into ${value}`)
        }
      })
    }
  }

  static delete(id, callback){
    let query = `DELETE FROM contacts WHERE id = ${id}`
    let query2 = `DELETE FROM contact_groups where id_contact = ${id}`
    db.run(query2)
    db.run(query, function(err){
      if (err) {
        callback(err)
      }else{
        callback(`success : ID : ${id} deleted`)
      }
    })
  }

  static read(callback){
    let query = `SELECT * FROM contacts`
    db.all(query, function(err, rows){
      if (err) {
        callback(err)
      }else{
        callback(rows)
      }
    })
  }
}

module.exports = Contact
