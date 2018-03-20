let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data/address_book.db');

class Group {
  constructor(name){
    this.id = null
    this.name = name
  }

  addGroup(callback){
    let query = `INSERT INTO groups VALUES(null, ?)`
    db.run(query, this.name, function(err) {
      if(err) {
        callback(err)
      }else{
        callback(`Add Group Success, Group ID : ${this.lastID}`)
      }
    })
  }

  static update(id, value, callback){
    let query = `UPDATE groups SET name = '${value}' WHERE id = ${id}`
    db.run(query, function(err){
      if (err) {
        calback(err)
      }else{
        callback(`update success, name into ${value}`)
      }
    })
  }

  static delete(id, callback){
    let query = `DELETE FROM groups WHERE id = ${id}`
    let query2 = `DELETE FROM contact_groups where id_group = ${id}`
    db.run(query2)
    db.run(query, function(err){
      if (err) {
        callback(err)
      }else{
        callback(`success, ID : ${id} deleted`)
      }
    })
  }

  static read(callback){
    let query = `SELECT * FROM groups`
    db.all(query, function(err, rows){
      if (err) {
        callback(err)
      }else{
        callback(rows)
      }
    })
  }
}

module.exports = Group
