const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

class ContactGroup {

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
            let pathFileName = '../address-book-db-from-schema/0.seed-data/contact-group.csv';            
            let read_data = ContactGroup.readfile(pathFileName)

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
    
                var stmt = db.prepare(`INSERT INTO ContactGroups VALUES (null,${joinMaxColumn})`);
                
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

            db.run(`UPDATE ContactGroups SET ${columnToUpdate} = '${updateData}' WHERE ContactGroups.CGId = ${id}`)
           
            db.close();
        })
    }
    
    static delete(id) {
        const db = new sqlite3.Database('./groupX.db');
        
        db.serialize(function() {     
            db.run(`DELETE FROM ContactGroups WHERE ContactGroups.CGId = ${id}`)
            db.close();
        })
    }

    static insertone(data) {
        const db = new sqlite3.Database('./groupX.db');
        db.serialize(function() {     
            let contactId = data[0];
            let groupId = data[1];
    
            db.run(`INSERT INTO ContactGroups VALUES (null,'${contactId}','${groupId}')`)
    
            db.close();
        })
    }

}




module.exports = ContactGroup;