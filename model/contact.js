const Setup = require('../setup.js');
let db = Setup.db();

class Contact {
  constructor(contactObj){
    this._id = contactObj.id || null;
    this._name = contactObj.name;
    this._phone_number = contactObj.phone_number;
    this._email = contactObj.email;
  }

  // set id(value){
  //   this._id = value;
  // }
  //
  // get id(){
  //   return console.log(this._id);
  // }

  //INSERT Data
  save(cbResult) {
    let queryAddContact = `INSERT INTO Contacts VALUES
                           (null, "${this._name}",
                           "${this._phone_number}",
                           "${this._email}");`
    db.run(queryAddContact, (err) => {
      if(err){
        cbResult(err);
        // console.log(err);
      }else{
        // let queryContactShow = `SELECT * FROM Contacts
        //                         WHERE name = "${this._name}"
        //                         AND phone_number = "${this._phone_number}"
        //                         AND email = "${this._email}"`
        // db.each(queryContactShow, (err, ContactResult) => {
        //     if(err){
        //         console.log(err);
        //     }else{
        //         this._id = ContactResult.id;
        //         // console.log(ContactResult.id);
        //     }
        // // console.log(queryContactShow);
        // })

        cbResult(`${this._name} Has been added to Contacts`);
        db.close();
        // console.log(`${this._name} Has been added to Contacts`);
      }
    })
  }

  //READ Data
  static show(cbResult){
    let queryContactShow = `SELECT * FROM Contacts`

    db.all(queryContactShow, (err, contactData) =>{
      if(err){
        cbResult(err);
      }else{
        cbResult(contactData);
      }
    })
  }

  showById(cbResult){
    let queryFindId = `SELECT * FROM Contacts WHERE id = ${this._id}`
    db.all(queryFindId, (err, ContactData) =>{
      if(err){
          cbResult(err);
      }else{
          if(ContactData.length === 0){
              cbResult(`Id is not in Table Contacts`)
          }else{
              cbResult(ContactData);
          }
      }
    })

  }

  //UPDATE DATA
  update(cbResult){
    this.showById((ContactResult) =>{

      let ContactName = ContactResult[0].name;
      let phone_number = ContactResult[0].phone_number;
      let email = ContactResult[0].email;

      if(this._name !== undefined && this._name !== ""){
        ContactName = this._name;
      }
      if(this._phone_number !== undefined && this._phone_number !== ""){
        phone_number = this._phone_number;
      }
      if(this._email !== undefined && this._email !== ""){
        email = this._email;
      }

      let queryUpdateContacts = `UPDATE Contacts
                                 SET name = "${ContactName}",
                                 phone_number = "${phone_number}",
                                 email = "${email}"
                                 WHERE id = ${this._id}`

      db.run(queryUpdateContacts, (err) => {
        if(err){
            cbResult(err);
        }else{
            cbResult(`Contacts Id ${this._id} successfully Updated`);
        }
      })

    });
  }
}

// let contact = new Contact({name: "Dana", phone_number: "082120858592", email:"danny12march@gmail.com"});
// console.log(contact);
// contact.save();
// contact.id;

module.exports = Contact;
