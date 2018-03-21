var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('address_book_database.db');
var ContactGroup = require('./contact-group.js')

class Group{
  static viewListGroup(cb) {
    let query = 'SELECT * FROM groups'
    db.all(query, function(err, rows) {
      if(err) {
        cb(err);
      } else {
        cb(rows)
      }
    })
  }

  static addGroup(groupName, cb) {
    let query  = `INSERT INTO groups (id, groupName) VALUES (NULL, '${groupName}')`
    db.run(query, function(err) {
      if(err) {
        cb(err);
      } else {
        cb('new group created')
      }
    })
  }

  static updateGroup(set, setData, where, whereData, cb) {
    let query = `UPDATE groups SET ${set} = ? WHERE ${where} = ?`
    db.run(query, setData, whereData, function(err) {
      if(err) {
        cb(err)
      } else {
        cb("group info has been updated");
      }
    })
  }

  static deleteGroup(groupId, cb) {
    let query = `DELETE FROM groups WHERE id = '${groupId}'`
    db.run(query, function(err) {
      if(err) {
        cb(err)
      } else {
        cb('deleted from group');
      }
    })
  }
}

module.exports = Group
