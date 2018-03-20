const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('address_book.db')

class Group {
  constructor(name) {
    this.name = name
  }

  save(){
    db.run(`INSERT INTO Groups (name) VALUES ($name)`,{
        $name:this.name
      },function(err){
        if (err) console.log(err.message)
      })
  }

  static update(input){
    db.run(`UPDATE Groups SET ${input[2]} = ? WHERE id = ?`,input[3],input[1])
  }

  static delete(input){
    db.run(`DELETE FROM GroupContacts WHERE id = ${input[1]}`)
  }
}

module.exports = Group
