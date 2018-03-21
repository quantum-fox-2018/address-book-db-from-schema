const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('address_book.db')
const fs = require('fs')

const contacts = fs.readFileSync('contacts.csv','utf8').split('\n')
const groups = fs.readFileSync('groups.csv','utf8').split('\n')

db.serialize(function(){
  let seedContacts = db.prepare(`INSERT INTO Contacts (name,address,phoneNumber,email) VALUES
    (?,?,?,?)`)
  for(let i=1; i<contacts.length-1; i++){
    let contact = contacts[i].split(',')
    let name = contact[0]
    let address = contact[1]
    let phoneNumber = contact[2]
    let email = contact[3]
    seedContacts.run(name,address,phoneNumber,email)
  }
  seedContacts.finalize()

  let seedGroups = db.prepare(`INSERT INTO Groups (name) VALUES
    (?)`)
  for(let i=1; i<groups.length-1; i++){
    seedGroups.run(groups[i])
  }
  seedGroups.finalize()
})

db.close()
