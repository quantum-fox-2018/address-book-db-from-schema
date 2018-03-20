let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data/address_book.db');

class ContactGroup {
  constructor(object){
    this.id = null
    this.id_contact = object.idContact
    this.id_group = object.idGroup
  }

  addMember(callback){
    let query = `INSERT INTO contact_groups VALUES(null, ?, ?)`
    db.run(query, this.id_contact, this.id_group, function(err) {
      if(err) {
        callback(err)
      }else{
        callback(`Add Contact Group Success, track ID : ${this.lastID}`)
      }
    })
  }

  static readMember(id, callback){
    let query =`SELECT id_contact, contacts.name, contacts.phone_number FROM contact_groups JOIN contacts on contact_groups.id_contact = contacts.id where id_group = ?;`
    db.all(query, id, function(err, rows){
      if (err) {
        callback(err)
      }else{
        callback(rows)
      }
    })
  }

  static deleteMember(idGroup, idContact, callback){
    let query = "DELETE FROM contact_groups WHERE id_group = ? AND id_contact = ?"
    db.run(query, idGroup, idContact , function(err){
      if (err) {
        callback(err)
      }else{
        callback(`delete member ${idContact} from group ${idGroup} success`)
      }
    })
  }
}
module.exports = ContactGroup
