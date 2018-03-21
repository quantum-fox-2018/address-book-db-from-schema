const Setup = require('../setup.js');
const Contact = require('./contact.js');
let db = Setup.db();

class Group {
  constructor(groupObj) {
    this.id = groupObj.id || null;
    this.name = groupObj.name;
  }

  //add Contact To Group
  addContact(Contacts, cbResult){
    //cek ada ga contactId nya
    if(Contacts !== undefined){

        //cek apakah Contact Id sudah masuk d dalam Current Group juga belum
        //cek apakah group Id ada
        this._showById((GroupResult) =>{
          if(GroupResult[0].name != undefined){
            Contact.searchId(Contacts._id, (ContactResult) => {
              if(ContactResult[0].name != undefined){
                  let queryAddContact = `INSERT INTO GroupContacts VALUES
                                         (null, ${Contacts._id}, ${this.id})`;
                  db.run(queryAddContact, (err) => {
                    if(err){
                      cbResult(err);
                    }else{
                      cbResult(`${ContactResult[0].name} successfully Added to Group ${GroupResult[0].name}`);
                    }
                  })
              }else{
                cbResult(`Contacts Id ${Contacts._id} is not in Contact`);
              }
            })
          }else{
            cbResult(`Groups Id ${this.id} is not in Groups Data`);
          }
        })

    }else{
        cbResult(`Contact id tidak ada / harus di isi`)
    }
  }

  //Delete Contact From Group
  deleteContact(Contacts, cbResult){
    //cek ada ga contactId nya
    if(Contacts !== undefined){
        //cek apakah Contact Id sudah masuk d dalam Current Group juga belum
        //cek apakah group Id ada
        this._showById((GroupResult) =>{
          if(GroupResult[0].name != undefined){
            Contact.searchId(Contacts._id, (ContactResult) => {
              if(ContactResult[0].name != undefined){
                  let queryDelContact = `DELETE FROM GroupContacts
                                         WHERE contact_id = ${Contacts._id}
                                         AND group_id = ${this.id}`;

                  db.run(queryDelContact, (err) => {
                    if(err){
                      cbResult(err);
                    }else{
                      cbResult(`${ContactResult[0].name} successfully Remove from Group ${GroupResult[0].name}`);
                    }
                  })
              }else{
                cbResult(`Contacts Id ${Contacts._id} is not in Contact`);
              }
            })
          }else{
            cbResult(`Groups Id ${this.id} is not in Groups Data`);
          }
        })

    }else{
        cbResult(`Contact id tidak ada / harus di isi`)
    }
  }

  //Show Group Contact
  showContact(cbResult){
    this._showById((GroupResults) => {
      if(GroupResults[0].name != undefined){
        let queryShowContact = `SELECT Groups.*, Contacts.* FROM Groups JOIN GroupContacts
                                ON GroupContacts.group_id = Groups.id
                                JOIN Contacts
                                ON Contacts.id = GroupContacts.contact_id
                                WHERE Groups.id = ${this.id}`
        db.all(queryShowContact, (err, contactResults) => {
          if(err){
            cbResult(err);
          }else{
            let results = `Group ${GroupResults[0].name} \n`+JSON.stringify(contactResults, null, 2)
            cbResult(results);
          }
        })
      }else{
        cbResult(`Groups Id ${this.id} is not in Groups Data`)
      }
    })
  }

  //INSERT Data
  save(cbResult) {
    let queryAddGroup = `INSERT INTO Groups VALUES
                           (null, "${this.name}");`
    db.run(queryAddGroup, (err) => {
      if(err){
        cbResult(err);

      }else{
        cbResult(`${this.name} Has been Created`);
      }
      db.close();
    })
  }

  //READ Data
  static show(cbResult){
    let queryGroupShow = `SELECT * FROM Groups`

    db.all(queryGroupShow, (err, contactData) =>{
      if(err){
        cbResult(err);
      }else{
        cbResult(contactData);
      }
    })
  }

  _showById(cbResult){
    let queryFindId = `SELECT * FROM Groups WHERE id = ${this.id}`
    db.all(queryFindId, (err, ContactData) =>{
      if(err){
          cbResult(err);
      }else{
          if(ContactData.length === 0){
              cbResult(`Id is not in Table Groups`)
          }else{
              cbResult(ContactData);

          }
      }
    })

  }

  //UPDATE DATA
  update(cbResult){
    this._showById((ContactResult) =>{

      let ContactName = ContactResult[0].name;

      if(this.name !== undefined && this.name !== ""){
        ContactName = this.name;
      }

      let queryUpdateGroup = `UPDATE Groups
                                 SET name = "${ContactName}"
                                 WHERE id = ${this.id}`

      db.run(queryUpdateGroup, (err) => {
        if(err){
            cbResult(err);
        }else{
            cbResult(`Group Id ${this.id} successfully Updated`);
        }
      })

    });
  }

  delete(cbResult){
    //nanti grous di dalam contact Group juga ilang
    this._showById((ContactResult) => {

      if(ContactResult[0].id != undefined){
        let GroupName = ContactResult[0].name;
        let queryDelContact = `DELETE FROM Groups WHERE id = ${this.id}`

        db.run(queryDelContact, (err) => {
            if(err){
              cbResult(err);
            }else{
              let queryDelGroupInContactGroup = `DELETE FROM GroupContacts WHERE group_id = ${this.id}`

              db.run(queryDelGroupInContactGroup, (err) => {
                if(err){
                  cbResult(err);
                }else{
                  cbResult(`${GroupName} has been deleted From Groups..`)
                }
              });
            }
        });
      }else{
        cbResult(`Id ${this.id} is not in Table Groups`)
      }

    })
  }
}

module.exports = Group;
