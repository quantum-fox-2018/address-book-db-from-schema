const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('address_book.db')

class Contact {
  constructor(name,address,phoneNumber,email) {
    this.name = name
    this.address = address
    this.phoneNumber = phoneNumber
    this.email = email
  }

  save(){
    db.run(`INSERT INTO Contacts (name,address,phoneNumber,email)
      VALUES ($name,$address,$phoneNumber,$email)`,{
        $name:this.name,
        $address:this.address,
        $phoneNumber:this.phoneNumber,
        $email:this.email
      },function(err){
        if (err) console.log(err.message)
      })
  }

  static update(input){
    db.run(`UPDATE Contacts SET ${input[2]} = ? WHERE id = ?`,input[3],input[1])
  }

  static delete(input){
    db.run(`DELETE FROM GroupContacts WHERE id = ${input[1]}`)
  }
}

module.exports = Contact
