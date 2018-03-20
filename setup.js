const fs = require('fs');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('address_book.db')

class Setup{
  static createTable(){
    // CREATE TABLE IF NOT EXISTS HELPS (id INTEGER PRIMARY KEY AUTOINCREMENT, command VARCHAR, information VARCHAR);
    let queryTableContact = `CREATE TABLE IF NOT EXISTS CONTACTS
                              ( id INTEGER PRIMARY KEY AUTOINCREMENT,
                                contact_name VARCHAR,
                                phoneNumber VARCHAR);`
    let queryTableGroup = `CREATE TABLE IF NOT EXISTS GROUPS
                              ( id INTEGER PRIMARY KEY AUTOINCREMENT,
                                group_name VARCHAR);`

    let queryTableGroupContact = `CREATE TABLE IF NOT EXISTS GROUP_CONTACTS
                                    ( id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      contact_id INTEGER REFERENCES CONTACTS(id),
                                      group_id INTEGER REFERENCES GROUPS(id));`
    db.run(queryTableContact, (err, data) => {
      console.log(err)
    })

    db.run(queryTableGroup, (err, data) => {
      console.log(err)
    })

    db.run(queryTableGroupContact, (err, data) => {
      console.log(err)
    })

    db.close()
  }

  static uploadTable(){
    // ======================================= upload contacts
    fs.readFile('./contacts.csv','utf8',(err, dataContact) => {
      if(err){
        console.log(err)
      }
      else{
        let contacts = dataContact.split('\n')
        let arrContact = []
        for(let i=0; i<contacts.length-1; i++){
          arrContact.push(contacts[i].split(','))
        }
        // console.log(arrContact)

        for(let j=1; j<arrContact.length; j++){
          db.serialize(function(){
            let arrKontak = arrContact[j]
            let queryInsertContact = `INSERT INTO CONTACTS( contact_name, phoneNumber)
            VALUES( ?,?);`
            db.run(queryInsertContact,[`${arrKontak[0]}`,`${arrKontak[1]}`],(err) => {
              if(err){
                console.log(err)
              }
            })

          })

        }

      }

    })

    // ======================================= upload groups
    fs.readFile('./groups.csv','utf8',(err, dataGroups) => {
      if(err){
        console.log(err)
      }
      else{
        let Groups = dataGroups.split('\n')
        let arrGroups = []
        for(let i=0; i<Groups.length-1; i++){
          arrGroups.push(Groups[i].split(','))
        }
        // console.log(arrGroups)

        for(let j=1; j<arrGroups.length; j++){
          db.serialize(function(){
            let arrGrup = arrGroups[j]
            let queryInsertGroup = `INSERT INTO GROUPS(group_name)
                                      VALUES(?);`
            db.run(queryInsertGroup,[`${arrGrup[0]}`],(err) => {
              if(err){
                console.log(err)
              }
            })

          })

        }

      }

    })

  }

}

module.exports = Setup
