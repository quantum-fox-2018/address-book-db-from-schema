const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('address_book.db')


class HelpModel{
  static help(cb){
    db.serialize(function(){
      let queryShowHelp = `SELECT * FROM HELPS;`
      db.all(queryShowHelp,(err, dataHelps) => {
        if(err){
          console.log('cek query Select Helps',err)
        }
        else {
          cb(dataHelps)
          // console.log(dataHelps)
        }
      })
    })
    db.close()
  }
}

module.exports = HelpModel
