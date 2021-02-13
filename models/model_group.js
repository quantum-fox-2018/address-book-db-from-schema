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

    static updateGroup(id, name, showData){
        db.serialize((err) => {
            if(err){
                console.log(err.message)
            }
            db.run(`UPDATE Groups SET group_name = $group_name  WHERE group_id = $group_id` , {
                $group_id: id,
                $group_name: name
            })
            console.log(`Update Data Group : "${name}" , has been success`)
            showData()

        })

        db.close((err) => {
            if(err){
                console.log(err.message)
            }
            console.log('Closed connection database')
        })
    }

    static deleteGroup(group_id){
        db.serialize((err) => {
            if(err){
                console.log(err.message)
            }
            db.run(`DELETE FROM ContactGroups WHERE group_id = $group_id`, {
                $group_id: group_id
            })
            db.run(`DELETE FROM Groups WHERE group_id = $group_id`, {
                $group_id:group_id
            })
            console.log(`Delete Data Group with ID : "${group_id}" , has been success`)

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