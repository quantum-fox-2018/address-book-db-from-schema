const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('addressBook.db')

class Groups {
  constructor() {

  }

  static showData(id){

    if (!id) {

      db.all(`SELECT * FROM groups`, function (err, rows) {

        if (rows.length == 0) {

          return console.log(`Groups is not exists !`);

        } else {

          return console.log(rows);

        }

      })

    } else {

      db.get(`SELECT * FROM groups WHERE id = '${id}'`, function (err, row) {

        if (!row) {

          return console.log(`Group is not exists`);

        } else {

          return console.log(row);

        }

      })

    }

  }

  static addNewGroup(group){

    if (!group) {

      return console.log(`please insert the group name`);

    } else {

      db.run(`INSERT INTO groups(groupName) VALUES('${group}')`, function () {

        return console.log(`Done !`);

      })

    }

  }

  static updateGroup(update){

    db.get(`UPDATE groups SET groupName = '${update.updateTo}' WHERE id = '${update.id}'`, function (err, row) {

      return console.log(row);

    })

  }

  static deleteGroup(id){

    if (!id) {

      return console.log(`Please insert id of groups !`);

    } else {

      db.get(`DELETE FROM groups WHERE id = '${id}'`, function (err) {

        console.log(`${id} group is deleted`);

      })

    }

  }

}

// Groups.showData(1)

// Groups.addNewGroup('Dota')

// Groups.updateGroup({'id' : 2, 'updateTo' : 'MObil'})

// Groups.deleteGroup()
