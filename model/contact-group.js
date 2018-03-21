var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('address_book_database.db');

class ContactGroup{
  static addContactToGroup(memberId, groupId, cb) {
    let query = `INSERT INTO contact_groups (id, member_id, group_id) VALUES (NULL, '${memberId}', '${groupId}')`
    db.run(query, function(err) {
      if(err) {
        cb(err)
      } else {
        cb('added new contact to group')
      }
    })
  }

  static deleteGroup(groupId, cb) {
    let query = `DELETE FROM contact_groups WHERE group_id = '${groupId}'`
    db.run(query, function(err) {
      if(err) {
        cb(err)
      } else {
        cb('delete group from contact group')
      }
    })
  }
}

module.exports = ContactGroup
