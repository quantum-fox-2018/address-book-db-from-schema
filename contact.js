const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('addressBook.db')


class Contacts {
  constructor() {
    this.id = 0
  }

  static addContact(input){

    db.run(`INSERT INTO contacts(name, phone, email, address) VALUES('${input.name}', '${input.phone}', '${input.email}', '${input.address}')`, function(err, row){

      console.log(
        `done insert ${input.name} !`
      );

    })

  }

  static updateData(update){

    db.get(`UPDATE contacts SET '${update.columnName}' = '${update.updateTo}' WHERE id = '${update.id}'`, function (err) {

      console.log(
        `${update.id} updated`
      );

    })

  }

  static deleteData(id){

    db.get(`DELETE FROM contacts WHERE id = ${id}`, function (err) {

      console.log(
        `${id} is deleted !`
      );

    })

  }

}

// Contacts.addContact({'name' : 'Taufik', 'phone' : 25487583, 'email' : 'zzzzzzzz', 'address' : 'zzzzzzzz'})

// Contacts.updateData({'id' : 1, 'columnName' : 'name', 'updateTo' :'elmisa'})

Contacts.deleteData(4)
