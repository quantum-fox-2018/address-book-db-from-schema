const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('addressBook.db')

class Contacts {
  constructor() {

  }

  static showData(input, callback){

    if (input == '') {

      db.all(`SELECT contactGroups.id, name, phone, email, address, groupName FROM contacts
        JOIN contactGroups ON contactGroups.contactId = contacts.id
        JOIN groups ON contactGroups.groupId = groups.id`, function (err, rows) {

        callback(rows)

      })

    } else {

      db.get(`SELECT * FROM contacts WHERE id = '${input}'`, function (err, rows) {

        callback(rows)

      })

    }

  }

  static addContact(input, callback){

    if (input == '') {

      callback(`Please insert contact with format | node index.js addContact 'name' 'phone' 'email' 'address' |`)

    } else {

      db.run(`INSERT INTO contacts(name, phone, email, address) VALUES('${input[0]}', '${input[1]}', '${input[2]}', '${input[3]}')`, function(err, row){

        callback(`done insert ${input[0]} !`)

      })

    }

  }

  static updateData(input, callback){

    if (input == '') {

      callback(`Please insert value with format | node index.js updateContact 'contact id' 'columnName' 'updateTo'| `)

    } else {

      db.get(`UPDATE contacts SET '${input[1]}' = '${input.slice(2).join(' ')}' WHERE id = '${input[0]}'`, function (err) {

        if (err) {

          callback(`ex: | node index.js updateContact 'contact id' 'columnName' 'updateTo'|`)

        } else {

          callback(`${input[0]}'s ${input[1]} is updated to ${input.slice(2).join(' ')}`)

        }

      })

    }

  }

  static deleteData(input, callback){

    if (input == '') {
      callback(`Please insert value with format | node index.js deleteContact 'id'| `)
    } else {

      db.get(`DELETE FROM contacts WHERE id = ${input}`, function (err) {

        callback(`${input} is deleted !`)

      })

    }

  }

}


class ContactGroups {
  constructor() {

  }

  static showDataGroups(input, callback){

    if (input == '') {

      db.all(`SELECT * FROM contactGroups`, function (err, rows) {

        callback(rows)

      })

    } else {

      db.get(`SELECT * FROM contactGroups WHERE id = '${input}'`, function (err, row) {

        callback(row)

      })

    }

  }

  static insertToGroup(input, callback){

    if (input == '' || input.length < 2) {

      callback(`Please insert value with format | node index.js insertToGroup 'contactId' 'groupId'| `)

    } else {

      db.run(`INSERT INTO contactGroups(contactId, groupId) VALUES('${input[0]}', '${input[1]}')`, function (err, row) {

        callback(`Done !`)

      })

    }

  }

  static updateContactGroups(input, callback){

    if (input == '' || input.length < 2) {

      callback(`Please insert value with format | node index.js updateContactGroups 'id' 'contactId' 'groupId'| `)

    } else {

      db.get(`UPDATE contactGroups SET contactId = '${input[1]}', groupId = '${input[2]}' WHERE id = '${input[0]}'`, function (err, row) {

        callback(`contactGroups ${input[0]} is updated`)

      })

    }

  }

  static deleteContactGroups(input, callback){

    if (input == '') {

      callback(`Please insert value with format | node index.js deleteContactGroups 'id'| `)

    } else {

      db.run(`DELETE FROM contactGroups WHERE id = '${input}'`, function (err) {

        callback(`ContactGroup with id ${input} is deleted`)

      })

    }

  }

}

class Groups {
  constructor() {

  }

  static showGroups(input, callback){

    if (input == '') {

      db.all(`SELECT * FROM groups`, function (err, rows) {

        if (rows.length == 0) {

          callback(`Groups is not exists !`)

        } else {

          callback(rows)

        }

      })

    } else {

      db.get(`SELECT * FROM groups WHERE id = '${input}'`, function (err, row) {

        if (!row) {

          callback(`Group is not exists`)

        } else {

          callback(row)

        }

      })

    }

  }

  static addNewGroup(input, callback){

    if (input == '') {

      callback(`Please insert value with format | node index.js addNewGroup 'GroupName'| `)

    } else {

      db.run(`INSERT INTO groups(groupName) VALUES('${input}')`, function () {

        callback(`Done insert ${input}`)

      })

    }

  }

  static updateGroup(input, callback){

    if (input == '') {

      callback(`Please insert value with format | node index.js updateGroup 'id' 'updateTo'|`)

    } else {

      db.get(`UPDATE groups SET groupName = '${input[1]}' WHERE id = '${input[0]}'`, function (err, row) {

        callback(`Groups ${input[0]} is updated`)

      })

    }

  }

  static deleteGroup(input, callback){

    if (input == '') {

      callback(`Please insert value with format | node index.js deleteGroup 'id'| `)

    } else {

      db.all(`DELETE FROM contactGroups WHERE groupId = '${input}'`, function (err){

        if (err) {

          callback(`1 === delete group error !!`)

        }

        db.get(`DELETE FROM groups WHERE id = '${input}'`, function (err) {

          if (err) {

            callback(`2 === delete group error !!`)

          } else {

            callback(`${input} group is deleted`)

          }

        })

      })

    }

  }

}

module.exports = {Contacts, ContactGroups, Groups};
