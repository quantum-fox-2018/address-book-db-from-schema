const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('address_book.db')

class GroupContact {
  constructor(contactId,groupId) {
    this.contactId = contactId
    this.groupId = groupId
  }

  save(){
    db.run(`INSERT INTO GroupContacts (contactId,groupId) VALUES ($contactId,$groupId)`,{
        $contactId:this.contactId,
        $groupId:this.groupId
      },function(err){
        if (err) console.log(err.message)
      })
  }

  static update(input){
    db.run(`UPDATE GroupContacts SET ${input[2]} = ? WHERE id = ?`,input[3],input[1])
  }

  static delete(input){
    db.run(`DELETE FROM GroupContacts WHERE id = ${input[1]}`)
  }
}

module.exports = GroupContact
