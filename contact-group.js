const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('addressBook.db')

class ContactGroups {
  constructor() {

  }

  static showData(id){

    if (!id) {

      db.all(`SELECT * FROM contactGroups`, function (err, rows) {

        return console.log(rows);

      })

    } else {

      db.get(`SELECT * FROM contactGroups WHERE id = '${id}'`, function (err, row) {

        return console.log(row);

      })

    }

  }

  static insertToGroup(group){

    if (!group.contactId || !group.groupId) {

      return console.log(`Please insert {'contactId' = ?, 'groupId' = ?}`);

    } else {

      db.run(`INSERT INTO contactGroups(contactId, groupId) VALUES('${group.contactId}', '${group.groupId}')`, function (err, row) {

        return console.log(`Done !`);

      })

    }

  }

  static updateContactGroups(update){

    if (!update || !update.contactId || !update.groupId) {

      return console.log(`Please insert {'id' = ?, 'contactId' = ?, 'groupId' = ?}`);

    } else {

      db.get(`UPDATE contactGroups SET contactId = '${update.contactId}', groupId = '${update.groupId}' WHERE id = '${update.id}'`, function (err, row) {

        return console.log(`contactGroups ${update.id} is updated`);

      })

    }

  }

  static deleteContactGroups(id){

    if (!id) {

      return console.log(`Please insert id of contactGroups`);

    } else {

      db.run(`DELETE FROM contactGroups WHERE id = '${id}'`, function (err) {

        return console.log(`ContactGroups is deleted`);

      })

    }

  }

}

// ContactGroups.showData()
// ContactGroups.insertToGroup({'contactId' : 3, 'groupId' : 3})
// ContactGroups.updateContactGroups({'id' : 2, 'contactId' : 6, 'groupId' : 8})
// ContactGroups.deleteContactGroups(3)
