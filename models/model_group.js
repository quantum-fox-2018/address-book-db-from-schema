const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contacts.db')

class Group{
    constructor() {
        
    }

    static showGroup(callback){
        db.serialize((err) => {
            if(err){
                console.log(err.message)
            }
            db.all(`SELECT * FROM Groups`, (err, data) => {
                callback(data)
            })

        })

        db.close((err) => {
            if(err){
                console.log(err.message)
            }
            console.log('Closed connection database')
        })
    }

    static addGroup(groupname, showData){
        db.serialize((err) => {
            if(err){
                console.log(err.message)
            }
            db.run(`INSERT INTO Groups (group_name) VALUES($group_name)`, {
                $group_name: groupname
            })
            console.log(`Create Data Group Name : "${groupname}" , has been success`)
            showData()
        })

        db.close((err) => {
            if(err){
                console.log(err.message)
            }
            console.log('Closed connection database')
        })
    }


}

module.exports = Group