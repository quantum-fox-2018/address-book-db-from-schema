const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

class Contact {

    static readfile(fileName) {
        return new Promise((resolve,reject) => {
            fs.readFile(fileName, 'utf8',(err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }

    static insertall() {
        const db = new sqlite3.Database('./groupX.db');
        
        db.serialize(function() {
            let pathFileName = '../address-book-db-from-schema/0.seed-data/contacts.csv';     
            let read_data = Contact.readfile(pathFileName);

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
    
                var stmt = db.prepare(`INSERT INTO Contacts VALUES (null,${joinMaxColumn})`);
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

            db.run(`UPDATE Contacts SET ${columnToUpdate} = '${updateData}' WHERE Contacts.contactId = ${id}`)
           
            db.close();
        })
    }

    static delete(id) {
        const db = new sqlite3.Database('./groupX.db');
        
        db.serialize(function() {     
            db.run(`DELETE FROM ContactGroups WHERE ContactGroups.contactId = ${id}`)
            db.run(`DELETE FROM Contacts WHERE Contacts.contactId = ${id}`)
            db.close();
        })
    }

    static show(cb) {
        const db = new sqlite3.Database('./groupX.db');
        
        db.serialize(function() {     
            let query = `SELECT Contacts.contactId, Contacts.first_name || " "|| Contacts.last_name AS FullName, Contacts.company, Contacts.phone, Contacts.email, Groups.name AS GroupName
            FROM Contacts
            LEFT JOIN ContactGroups ON Contacts.contactId = ContactGroups.contactId
            LEFT JOIN Groups ON ContactGroups.groupId = Groups.groupId
            ORDER BY Contacts.contactId;`;
            
            db.all(query, function(err, arrObjContacs) {
                
                let result = []
                for (let i = 0; i < arrObjContacs.length-1; i++) {
                    if (arrObjContacs[i].contactId != arrObjContacs[i+1].contactId && (i+1) != arrObjContacs.length-1) {
                        let inner = {
                            contactId: arrObjContacs[i].contactId,
                            fullname: arrObjContacs[i].FullName,
                            company: arrObjContacs[i].company,
                            email: arrObjContacs[i].email,
                            groups: []
                        }
                        result.push(inner);
 
                    } else if (arrObjContacs[i].contactId != arrObjContacs[i+1].contactId && (i+1) == arrObjContacs.length-1) {
                    
                        let inner0 = {
                            contactId: arrObjContacs[i].contactId,
                            fullname: arrObjContacs[i].FullName,
                            company: arrObjContacs[i].company,
                            email: arrObjContacs[i].email,
                            groups: []
                        }
                        result.push(inner0)

                        let inner = {
                            contactId: arrObjContacs[i+1].contactId,
                            fullname: arrObjContacs[i+1].FullName,
                            company: arrObjContacs[i+1].company,
                            email: arrObjContacs[i+1].email,
                            groups: []
                        }
                        result.push(inner)
                    } 
                }

                for (let i = 0; i < result.length; i++) {
                    for (let j = 0; j < arrObjContacs.length; j++) {
                        if (result[i].contactId == arrObjContacs[j].contactId && arrObjContacs[j].GroupName != null) {
                            result[i].groups.push(arrObjContacs[j].GroupName)
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
            let first_name = data[0];
            let last_name = data[1];
            let company = data[2];
            let phone = data[3];
            let email = data[4];
    
            db.run(`INSERT INTO Contacts VALUES (null,'${first_name}','${last_name}','${company}','${phone}','${email}')`)
    
            db.close();
        })
    }
}


module.exports = Contact;