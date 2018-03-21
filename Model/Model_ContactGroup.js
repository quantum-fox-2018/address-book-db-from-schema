const {db} = require('../Config/Setup.js');

class ContactGroup {
  constructor(groupID, contactID) {
    this.id         = null;
    this.group_id   = groupID;
    this.contact_id = contactID;
  }

  static add(prop, callback) {
    let query = `INSERT INTO ContactGroups VALUES (NULL, ?, ?)`;

    db.run(query, [prop.group_id, prop.contact_id], function(err) {
      if (err) {
        console.log(`${err}`);
      } else {
        prop.id = this.lastID;
        callback(prop);
      }
    });
  }

  static delete(id, callback) {
    ContactGroup.checkID(id, checkResult => {
      if (checkResult == true) {
        let query = `DELETE FROM ContactGroups WHERE id = ?`;
        db.run(query, [id], (err) => {
          if (err) {
            console.log(`${err}`);
          } else {
            callback('Delete data successfull!');
          }
        });
      } else {
        callback(`ID doesn't exist!`)
      }
    })
  }

  static checkID(id, callback) {
    let result = false;
    let query = `SELECT id FROM ContactGroups WHERE id = ?`;
    db.all(query, [id], (err, data) => {
      if (err) {
        console.log(`${err}`);;
      } else if (data.length > 0) {
        result = true;
      }
      callback(result);
    })
  }

  static show(callback) {
    let query = `SELECT c.name, c.address, c.email, c.phone, g.name AS groupName
      FROM ContactGroups AS cg
      JOIN Groups AS g
      	ON cg.groupId = g.id
      JOIN Contacts AS c
      	ON cg.contactId = c.id`;
    db.all(query, (err, data) => {
      if (err) {
        console.log(`${err}`);
      } else {
        callback(data);
      }
    });
  }
}

module.exports = ContactGroup
