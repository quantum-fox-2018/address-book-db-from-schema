const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('address_book.db')

class GroupContact {
  constructor(contactId,groupId) {
    this.contactId = contactId
    this.groupId = groupId
  }

  static delete(input){
    db.run(`DELETE FROM GroupContacts WHERE id = ${input[1]}`)
  }

  static assign(input){
    db.get(`SELECT id AS contactId FROM Contacts WHERE name = '${input[0]}'`,function(err,contactData){
      db.get(`SELECT id AS groupId FROM Groups WHERE name = '${input[2]}'`,function(err,groupData){
        db.get(`SELECT id FROM GroupContacts WHERE groupId = ${groupData.groupId} AND contactId = ${contactData.contactId}`,function(err,data){
          if(data==undefined){
            db.run(`INSERT INTO GroupContacts (contactId,groupId) VALUES ($contactId,$groupId)`,{
                $contactId:contactData.contactId,
                $groupId:groupData.groupId
              },function(err){
                if (err) console.log(err.message)
              })
          }
        })
      })
    })
  }
}

module.exports = GroupContact
