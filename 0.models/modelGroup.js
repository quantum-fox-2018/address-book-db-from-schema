const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

class Group {

    static readfile (fileName) {
        return new Promise ((resolve,reject) => {
            fs.readFile(fileName,'utf8',(err,data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    static insertall() {
        const db = new sqlite3.Database('./groupX.db');
        
        db.serialize(function() {
            let pathFileName = '../address-book-db-from-schema/0.seed-data/groups.csv';
            
            let read_data = Group.readfile(pathFileName)

            read_data.then(data => {
                let raw_data = data.trim().split('\r\n');

                let table_data = [];
                for (let i = 1; i < raw_data.length; i++) {
                    table_data.push(raw_data[i].split(','));
                }
        
                let maxColumn = [];
                for (let i = 0; i < table_data[0].length; i++) {
                    maxColumn.push('?');
                }
                let joinMaxColumn = maxColumn.join(',');
    
                var stmt = db.prepare(`INSERT INTO Groups VALUES (null,${joinMaxColumn})`);
                
                for (var i = 0; i < table_data.length; i++) {
                    stmt.run(table_data[i]);
                }
                stmt.finalize();
               
                db.close();
            })
            .catch(err => {
                console.log(err);
            })
        })
    }

    static update(data) {
        const db = new sqlite3.Database('./groupX.db');
        
        db.serialize(function() {
            let columnToUpdate = data[0];
            let updateData = data[1];
            let id = data[2];

            db.run(`UPDATE Groups SET ${columnToUpdate} = '${updateData}' WHERE Groups.groupId = ${id}`)
           
            db.close();
        })
    }

    static delete(id) {
        const db = new sqlite3.Database('./groupX.db');
        
        db.serialize(function() {     
            db.run(`DELETE FROM ContactGroups WHERE ContactGroups.groupId = ${id}`)
            db.run(`DELETE FROM Groups WHERE Groups.groupId = ${id}`)
            db.close();
        })
    }


    static show(cb) {
        const db = new sqlite3.Database('./groupX.db');
        
        db.serialize(function() {     
            let query = `SELECT Groups.groupId, Groups.name AS GroupName, Contacts.first_name || " "|| Contacts.last_name AS FullName
            FROM Groups
            LEFT JOIN ContactGroups ON Groups.groupId = ContactGroups.groupId
            LEFT JOIN Contacts ON ContactGroups.contactId = Contacts.contactId;`;
            
            db.all(query, function(err, arrObjContacs) {

                let result = []
                for (let i = 0; i < arrObjContacs.length-1; i++) {
                    if (arrObjContacs[i].groupId != arrObjContacs[i+1].groupId && (i+1) != arrObjContacs.length-1) {
                        let inner = {
                            groupId: arrObjContacs[i].groupId,
                            GroupName: arrObjContacs[i].GroupName,
                            groupMember: []
                        }
                        result.push(inner);
                    } else if (arrObjContacs[i].groupId != arrObjContacs[i+1].groupId || (i+1) == arrObjContacs.length-1) {
                    let inner = {
                            groupId: arrObjContacs[i+1].groupId,
                            GroupName: arrObjContacs[i+1].GroupName,
                            groupMember: []
                        }
                        result.push(inner)
                    } 
                }

                for (let i = 0; i < result.length; i++) {
                    for (let j = 0; j < arrObjContacs.length; j++) {
                        if (result[i].groupId == arrObjContacs[j].groupId && arrObjContacs[j].GroupName != null) {
                            result[i].groupMember.push(arrObjContacs[j].FullName)
                        }
                    }
                }
                
                cb(result)
            });

            db.close();
        })
    }


    static insertone(data) {
        const db = new sqlite3.Database('./groupX.db');
        db.serialize(function() {     
            let name = data[0];
      
            db.run(`INSERT INTO Groups VALUES (null,'${name}')`)
    
            db.close();
        })
    }

}







module.exports = Group;