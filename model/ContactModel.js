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
      // let querySelect = `SELECT * FROM CONTACTS`
      let querySelect = `SELECT contacts.id, contact_name, phoneNumber, gabung.group_name
                         FROM contacts
                         LEFT JOIN ( SELECT * FROM groups
                                     JOIN group_contacts
                                     ON groups.id = group_contacts.group_id
                                   ) as gabung
                         ON contacts.id = gabung.contact_id;`
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

  static selectGroup(cb){
    db.serialize(function(){
      let querySelect = `SELECT * FROM GROUPS;`
      db.all(querySelect,(err,dataGroup) => {
        if(err){
          console.log('cek di query Select Group', dataGroup)
        }
        else {
          cb(dataGroup)
        }
      })
    })
    db.close()
  }

  static insertContactGroups(ContactName,GroupName, cb){
    // console.log(`${ContactName} ${GroupName}`)
    // db.serialize(function(){
      let querySelectContact = `SELECT id FROM CONTACTS WHERE contact_name = ?`
      let querySelectGroup = `SELECT id FROM GROUPS WHERE group_name = ?`

      db.all(querySelectContact,ContactName,(err,idContact) => {
        if(err){
          console.log('cek di query Select id Contacts', err)
        }
        else {

          db.all(querySelectGroup,GroupName,function(err,idGroup){
            if(err){
              console.log('cek di query Select id Group', err)
            }
            else {
              // console.log(`ini mudah - ${idContact[0].id}  ${idGroup[0].id}`)
              let queryInsert = `INSERT INTO GROUP_CONTACTS VALUES(null,?,?);`
              db.run(queryInsert,[idContact[0].id,idGroup[0].id],(err) => {
                if(err){
                  console.log(err)
                }
                else {
                  let text = `data kontak:${ContactName} sudah berhasil ditambahkan ke group:${GroupName}`
                  cb(text)
                }
              })
            }
          })
        }

      })


    // })
    db.close()
  }
}

module.exports = ContactModel
// comment biar bisa ke push
